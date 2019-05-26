import { CombinedMatcher, Filter } from "./pac-match";
import defaultPacRules from "./default-pac-rules";
import createPacScript from "./create-pac-script";
import {
  chromeProxySettingsSet,
  chromeStorageSyncGet,
  chromeStorageSyncSet
} from "./chrome-promisify";

const syncFrequency =
  (60 * 60 * 1000) / chrome.storage.sync.MAX_WRITE_OPERATIONS_PER_HOUR;

const createState = async () => {
  const resultArr = await chromeStorageSyncGet(["proxy", "userRulesSerial"]);
  const data = resultArr[0];
  const userRulesSerial = data.userRulesSerial || "";
  let _proxy = data.proxy || "PROXY 127.0.0.1:1080;";
  let _userRules = userRulesSerial.split(";").filter(rule => !!rule);
  let _userRulesMatcher = new CombinedMatcher();
  _userRules.forEach(rule => {
    _userRulesMatcher.add(Filter.fromText(rule));
  });

  const pacScript = createPacScript(_proxy, _userRules);
  const config = {
    mode: "pac_script",
    pacScript: { data: pacScript }
  };
  await chromeProxySettingsSet({ value: config, scope: "regular" });

  const defaultMatcher = new CombinedMatcher();
  defaultPacRules.forEach(rule => defaultMatcher.add(Filter.fromText(rule)));

  let lastSyncTimestamp = Date.now();

  const pushState = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        chromeStorageSyncSet({
          userRulesSerial: _userRules.join(";"),
          proxy: _proxy
        }).then(() => {
          const timestamp = Date.now();
          lastSyncTimestamp = timestamp;
          resolve(timestamp);
        });
      }, syncFrequency - (Date.now() - lastSyncTimestamp));
    });
  };

  const setUserRules = async val => {
    if (val === _userRules) return;

    _userRules = val;
    _userRulesMatcher = new CombinedMatcher();
    _userRules.forEach(rule => {
      _userRulesMatcher.add(Filter.fromText(rule));
    });
    const timestamp = Date.now();
    if (timestamp - lastSyncTimestamp > syncFrequency) {
      chromeStorageSyncSet({
        userRulesSerial: _userRules.join(";"),
        proxy: _proxy
      }).then(() => {
        lastSyncTimestamp = timestamp;
      });
    }

    let config = { mode: "system" };
    const pacScript = createPacScript(_proxy, _userRules);
    config = {
      mode: "pac_script",
      pacScript: { data: pacScript }
    };
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  };
  const getUserRules = () => _userRules;

  const setProxy = async val => {
    if (val === _proxy) return;
    _proxy = val;
    const timestamp = Date.now();
    if (timestamp - lastSyncTimestamp > syncFrequency) {
      await chromeStorageSyncSet({
        proxy: _proxy,
        userRulesSerial: _userRules.join(";")
      });
      lastSyncTimestamp = timestamp;
    }

    let config = { mode: "system" };
    const pacScript = createPacScript(_proxy, _userRules);
    config = {
      mode: "pac_script",
      pacScript: { data: pacScript }
    };
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  };
  const getProxy = () => _proxy;

  const getUserRulesMatcher = () => {
    return _userRulesMatcher;
  };
  const getDefaultMatcher = () => {
    return defaultMatcher;
  };

  return {
    setUserRules,
    getUserRules,
    setProxy,
    getProxy,
    getUserRulesMatcher,
    getDefaultMatcher,
    pushState
  };
};

export default createState;
