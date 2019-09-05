import { CombinedMatcher, Filter } from "../lib/adblockplus";
import defaultPacRules from "./default-pac-rules";
import createPacScript from "./create-pac-script";
import {
  chromeProxySettingsSet,
  chromeStorageLocalSet,
  chromeStorageLocalGet
} from "./chrome-promisify";

async function createState() {
  const resultArr = await chromeStorageLocalGet(["proxy", "userRulesSerial"]);
  const data = resultArr[0];
  const userRulesSerial = data.userRulesSerial || "";
  let _proxy = data.proxy;
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
  
  if (!_proxy) {
    _proxy = data.proxy;
    setProxy("PROXY 127.0.0.1:1080;");
  }

  async function setUserRules(val) {
    if (val === _userRules) return;

    _userRules = val;
    _userRulesMatcher = new CombinedMatcher();
    _userRules.forEach(rule => {
      _userRulesMatcher.add(Filter.fromText(rule));
    });
    chromeStorageLocalSet({
      proxy: _proxy,
      userRulesSerial: _userRules.join(";"),
    });

    let config = { mode: "system" };
    const pacScript = createPacScript(_proxy, _userRules);
    config = {
      mode: "pac_script",
      pacScript: { data: pacScript }
    };
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  }
  function getUserRules() {
    return _userRules;
  }

  async function setProxy(val) {
    if (val === _proxy) return;
    _proxy = val;
    await chromeStorageLocalSet({
      proxy: _proxy,
      userRulesSerial: _userRules.join(";")
    });

    let config = { mode: "system" };
    const pacScript = createPacScript(_proxy, _userRules);
    config = {
      mode: "pac_script",
      pacScript: { data: pacScript }
    };
    await chromeProxySettingsSet({ value: config, scope: "regular" });
  }
  function getProxy() {
    return _proxy;
  }

  function getUserRulesMatcher() {
    return _userRulesMatcher;
  }
  function getDefaultMatcher() {
    return defaultMatcher;
  }

  return {
    setUserRules,
    getUserRules,
    setProxy,
    getProxy,
    getUserRulesMatcher,
    getDefaultMatcher
  };
}

export default createState;
