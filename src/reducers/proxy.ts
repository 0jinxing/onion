import { ProxyAction, ProxyTypeEnum, GFWMode } from "@/actions/proxy";

export type ProxyState = {
  proxyUrl: string;
  gfwUrl: string;
  gfwMode: GFWMode;
  gfwList: string[];
  updateAt: number;
};

const {
  UPDATE_PROXY_URL,
  UPDATE_GFW_URL,
  UPDATE_GFW_MODE,
  UPDATE_GFW_LIST,
} = ProxyTypeEnum;

const defaultState: ProxyState = {
  proxyUrl: "",
  gfwUrl: "https://repo.or.cz/gfwlist.git/blob_plain/HEAD:/gfwlist.txt",
  gfwMode: GFWMode.BLOCKING,
  gfwList: [],
  updateAt: 0,
};

function proxyReducer(
  state: ProxyState = defaultState,
  action: ProxyAction
): ProxyState {
  const { type, payload } = action;

  if (type === UPDATE_PROXY_URL && payload.proxyUrl) {
    return { ...state, proxyUrl: payload.proxyUrl };
  } else if (type === UPDATE_GFW_URL && payload.gfwUrl) {
    return { ...state, gfwUrl: payload.gfwUrl };
  } else if (type === UPDATE_GFW_MODE && payload.gfwMode) {
    return { ...state, gfwMode: payload.gfwMode };
  } else if (type === UPDATE_GFW_LIST && payload.gfwList) {
    return {
      ...state,
      gfwList: payload.gfwList || state.gfwList,
      updateAt: Date.now(),
    };
  }
  return state;
}

export default proxyReducer;
