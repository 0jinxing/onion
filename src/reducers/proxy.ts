import { ProxyAction, ProxyTypeEnum, GFWMode } from "@/actions/proxy";

export type ProxyState = {
  proxyUrl: string;
  gfwUrl: string;
  gfwMode: GFWMode;
  gfwList: string[];
  updateAt: number;
};

const defaultState: ProxyState = {
  proxyUrl: "",
  gfwUrl: "https://blog-ghoo-cc.oss-cn-shenzhen.aliyuncs.com/gfwlist.txt",
  gfwMode: GFWMode.BLOCKING,
  gfwList: [],
  updateAt: 0
};

function proxyReducer(state: ProxyState = defaultState, action: ProxyAction): ProxyState {
  if (action.type === ProxyTypeEnum.UPDATE_PROXY_URL) {
    return { ...state, proxyUrl: action.payload.proxyUrl };
  } else if (action.type === ProxyTypeEnum.UPDATE_GFW_URL) {
    return { ...state, gfwUrl: action.payload.gfwUrl };
  } else if (action.type === ProxyTypeEnum.UPDATE_GFW_MODE) {
    return { ...state, gfwMode: action.payload.gfwMode };
  } else if (action.type === ProxyTypeEnum.UPDATE_GFW_LIST) {
    return {
      ...state,
      gfwList: action.payload.gfwList,
      updateAt: Date.now()
    };
  }
  return state;
}

export default proxyReducer;
