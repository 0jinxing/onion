import { ProxyAction, ProxyTypeEnum, GFWMode } from "@/actions/proxy";

export type ProxyState = {
  proxyUrl: string;
  gfwUrl: string;
  gfwMode: GFWMode;
  gfwList: string[];
  loading: boolean;
  error: object | null;
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
  gfwMode: GFWMode.BLACKLIST,
  gfwList: [],
  error: null,
  loading: false,
};

const proxyReducer = (
  state: ProxyState = defaultState,
  action: ProxyAction
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROXY_URL:
      return {
        ...state,
        proxyUrl: payload.proxyUrl,
      };
    case UPDATE_GFW_URL:
      return {
        ...state,
        gfwUrl: payload.gfwUrl,
      };
    case UPDATE_GFW_MODE:
      return {
        ...state,
        gfwMode: payload.gfwMode,
      };
    case UPDATE_GFW_LIST:
      return {
        ...state,
        gfwList: payload.gfwList,
      };
    default:
      return state;
  }
};

export default proxyReducer;
