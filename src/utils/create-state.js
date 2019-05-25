/**
 * 主要的业务逻辑实现
 */

import { sync } from "./storage";
import { CombinedMatcher, Filter } from "./pac-match";
import defaultPacRules from "./default-pac-rules";
import createPacScript from "./create-pac-script";

const chrome = window.chrome;
const syncFrequency = sync.MAX_WRITE_OPERATIONS_PER_HOUR
  ? (60 * 60 * 1000) / sync.MAX_WRITE_OPERATIONS_PER_HOUR
  : 0;

/**
 * https://developer.chrome.com/extensions/storage
 * 采用 chrome.storage.sync	同步数据，可能会因为下面的限制，引发错误
 * QUOTA_BYTES 同步存储区中每个项目的最大大小：8,192 字节
 * QUOTA_BYTES_PER_ITEM 可以在同步存储区储存的数据量大小：102,400 字节
 * MAX_ITEMS 可以储存在同步存储区中的最大项目数目：512
 * MAX_WRITE_OPERATIONS_PER_HOUR 一小时内可以进行的 set（设置）、remove（移除）或clear（清除）操作的最大次数：1,000
 * MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE 在连续的 10 分钟内每分钟可以进行的 set（设置）、remove（移除）或clear（清除）操作的最大次数：10
 */
const createState = async () => {
  const data = await sync.get(["enable", "proxy", "userRulesSerial"]);
  const userRulesSerial = data.userRulesSerial || "";
  let {
    enable: _enable = false,
    proxy: _proxy = "PROXY 127.0.0.1:1080;"
  } = data;
  let _userRules = userRulesSerial.split(";").filter(rule => !!rule);

  let _userRulesMatcher = new CombinedMatcher();
  _userRules.forEach(rule => {
    _userRulesMatcher.add(Filter.fromText(rule));
  });

  // 初始化代理设置
  // const pacScript = 

  const defaultMatcher = new CombinedMatcher();
  defaultPacRules.forEach(rule => defaultMatcher.add(Filter.fromText(rule)));

  let lastSyncTimestamp = Date.now();
  const state = { defaultMatcher };

  Object.defineProperties(state, "enable", {
    get: () => {
      return _enable;
    },
    set: val => {
      if (val === _enable) return;

      _enable = !!val;
      const timestamp = Date.now();
      if (timestamp - lastSyncTimestamp > syncFrequency) {
        sync
          .set({
            enable: _enable,
            proxy: state.proxy,
            userRulesSerial: state.userRules.join(";")
          })
          .then(() => {
            lastSyncTimestamp = timestamp;
          });
      }

      if (!_enable) {
        chrome.proxy.settings.set({
          value: { mode: "system" },
          scope: "regular"
        });
      } else {
        const pacScript = createPacScript(state.proxy, state.userRules);
        chrome.proxy.settings.set({
          value: {
            mode: "pac_script",
            pacScript: {
              data: pacScript
            }
          },
          scope: "regular"
        });
      }

      chrome.runtime.sendMessage({ type: "ENABLE_SET", value: _enable });
    }
  });

  Object.defineProperty(state, "userRules", {
    get: () => {
      return _userRules;
    },
    set: val => {
      if (val === _userRules) return;

      _userRules = val;
      state.userRulesMatcher = new CombinedMatcher();
      _userRules.forEach(rule => {
        state.userRulesMatcher.add(Filter.fromText(rule));
      });
      const timestamp = Date.now();
      if (timestamp - lastSyncTimestamp > syncFrequency) {
        sync
          .set({
            userRulesSerial: _userRules.join(";"),
            enable: state.enable,
            proxy: state.proxy
          })
          .then(() => {
            lastSyncTimestamp = timestamp;
          });
      }

      if (state.enable) {
        const pacScript = createPacScript(state.proxy, _userRules);
        const config = {
          mode: "pac_script",
          pacScript: { data: pacScript }
        };
        chrome.proxy.settings.set({ value: config, scope: "regular" });
      }

      chrome.runtime.sendMessage({ type: "USER_RULES_SET", value: _userRules });
    }
  });

  Object.defineProperty(state, "userRulesMatcher", {
    get: () => {
      return _userRulesMatcher;
    },
    set: val => {
      _userRulesMatcher = val;
    }
  });

  Object.defineProperty(state, "proxy", {
    get: () => {
      return _proxy;
    },
    set: val => {
      if (val === _proxy) return;

      _proxy = val;
      const timestamp = Date.now();
      if (timestamp - lastSyncTimestamp > sync) {
        sync
          .set({
            proxy: _proxy,
            enable: state.enable,
            userRulesSerial: state.userRules.join(";")
          })
          .then(() => {
            lastSyncTimestamp = timestamp;
          });
      }
      if (state.enable) {
        const pacScript = createPacScript(_proxy, state.userRules);
        const config = {
          mode: "pac_script",
          pacScript: { data: pacScript }
        };
        chrome.proxy.settings.set({ value: config, scope: "regular" });
      }

      chrome.runtime.sendMessage({ type: "PROXY_SET", value: _proxy });
    }
  });
};

export default createState;
