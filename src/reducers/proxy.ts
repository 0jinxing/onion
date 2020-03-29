import { ProxyAction, ProxyTypeEnum } from "@/actions/proxy";

export type ProxyState = {
  proxy: string;
  gfwUrl: string;
  gfwList: string[];
};

const proxyReducer = (state: ProxyState, action: ProxyAction) => {
  const { type, payload } = action;

  switch (type) {
    case ProxyTypeEnum.SET_PROXY:
      return {
        ...state,
        proxy: payload.proxy
      };
    case ProxyTypeEnum.UPDATE_GFW_LIST:
      return {
        ...state,
        gfwUrl: payload.gfwUrl,
        gfwList: payload.gfwList
      };
    default:
      return state;
  }
};

export default proxyReducer;
