import { ProxyAction, ProxyTypeEnum } from "@/actions/proxy";

export type ProxyState = {
  proxy?: string;
  gfwUrl?: string;
  gfwList: string[];
  loading: boolean;
  error?: object;
};

const {
  SET_PROXY,
  UPDATE_GFW_URL,
  UPDATE_GFW_LIST,
  START_UPDATE_GFW_LIST,
  FINALLY_UPDATE_GFW_LIST,
  THROW_UPDATE_GFW_LIST,
  CATCH_UPDATE_GFW_LIST
} = ProxyTypeEnum;

const defaultState: ProxyState = {
  loading: false,
  gfwUrl: "https://repo.or.cz/gfwlist.git/blob_plain/HEAD:/gfwlist.txt",
  gfwList: []
};

const proxyReducer = (
  state: ProxyState = defaultState,
  action: ProxyAction
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROXY:
      return {
        ...state,
        proxy: payload.proxy
      };
    case UPDATE_GFW_URL:
      return {
        ...state,
        gfwUrl: action.payload.gfwUrl
      };
    case UPDATE_GFW_LIST:
      return {
        ...state,
        gfwList: payload.gfwList
      };

    case START_UPDATE_GFW_LIST:
      return {
        ...state,
        loading: true
      };
    case FINALLY_UPDATE_GFW_LIST:
      return {
        ...state,
        loading: false
      };
    case THROW_UPDATE_GFW_LIST:
      return {
        ...state,
        error: action.payload.error
      };
    case CATCH_UPDATE_GFW_LIST:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default proxyReducer;
