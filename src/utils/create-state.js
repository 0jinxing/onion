/**
 * 主要的业务逻辑实现
 */

import { sync } from "./storage";
import { CombinedMatcher, Filter } from "./pac-match";
import defaultPacRules from "./default-pac-rules";
import createPacScript from "./create-pac-script";
import { chromeProxySettingsSet } from "./chrome-promisify";

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
  if (_enable) {
    const pacScript = createPacScript(_proxy, _userRules);
    const config = {
      mode: "pac_script",
      pacScript: { data: pacScript }
    };
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  }

  const defaultMatcher = new CombinedMatcher();
  defaultPacRules.forEach(rule => defaultMatcher.add(Filter.fromText(rule)));

  let lastSyncTimestamp = Date.now();

  // 推送同步数据
  const pushState = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        sync
          .set({
            userRulesSerial: _userRules.join(";"),
            enable: _enable,
            proxy: _proxy
          })
          .then(() => {
            const timestamp = Date.now();
            lastSyncTimestamp = timestamp;
            resolve(timestamp);
          });
      }, syncFrequency - (Date.now() - lastSyncTimestamp));
    });
  };

  const setEnable = async val => {
    if (val === _enable) return;

    _enable = !!val;
    const timestamp = Date.now();
    if (timestamp - lastSyncTimestamp > syncFrequency) {
      sync
        .set({
          enable: _enable,
          proxy: state.getProxy(),
          userRulesSerial: state.getUserRules().join(";")
        })
        .then(() => {
          lastSyncTimestamp = timestamp;
        });
    }

    let config;
    if (!_enable) {
      config = { mode: "system" };
    } else {
      const pacScript = createPacScript(state.getProxy(), state.getUserRules());
      config = {
        mode: "pac_script",
        pacScript: {
          data: pacScript
        }
      };
    }
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  };
  const getEnable = () => _enable;

  const setUserRules = async val => {
    if (val === _userRules) return;

    _userRules = val;
    _userRulesMatcher = new CombinedMatcher();
    _userRules.forEach(rule => {
      _userRulesMatcher.add(Filter.fromText(rule));
    });
    const timestamp = Date.now();
    if (timestamp - lastSyncTimestamp > syncFrequency) {
      sync
        .set({
          userRulesSerial: _userRules.join(";"),
          enable: state.getEnable(),
          proxy: state.getProxy()
        })
        .then(() => {
          lastSyncTimestamp = timestamp;
        });
    }

    let config = { mode: "system" };
    if (state.getEnable()) {
      const pacScript = createPacScript(state.getProxy(), _userRules);
      config = {
        mode: "pac_script",
        pacScript: { data: pacScript }
      };
    }
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  };
  const getUserRules = () => _userRules;

  const setProxy = async () => {
    if (val === _proxy) return;

    _proxy = val;
    const timestamp = Date.now();
    if (timestamp - lastSyncTimestamp > sync) {
      sync
        .set({
          proxy: _proxy,
          enable: state.getEnable(),
          userRulesSerial: state.getUserRules().join(";")
        })
        .then(() => {
          lastSyncTimestamp = timestamp;
        });
    }

    let config = { mode: "system" };
    if (state.getEnable()) {
      const pacScript = createPacScript(_proxy, state.getUserRules());
      config = {
        mode: "pac_script",
        pacScript: { data: pacScript }
      };
    }
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  };
  const getProxy = () => _proxy;

  const getUserRulesMatcher = () => {
    return _userRulesMatcher;
  };
  const getDefaultMatcher = () => {
    return defaultMatcher;
  };

  const state = {
    setEnable,
    getEnable,
    setUserRules,
    getUserRules,
    setProxy,
    getProxy,
    getUserRulesMatcher,
    getDefaultMatcher,
    pushState
  };
  return state;
};

export default createState;
