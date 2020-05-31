import { connect } from "react-redux";
import {
  updateGFWMode,
  updateGFWUrl,
  GFWMode,
  emitFetchGFWList,
  ProxyTypeEnum
} from "@/actions/proxy";
import { genErrorNamespace, catchError } from "@/actions/error";
import { genLoadingNamespace } from "@/actions/loading";
import GFWListSetting from "@/components/GFWListSetting";
import { Dispatch } from "redux";
import { State } from "@/store/query-store";

const mapStateToProps = (state: State) => {
  return {
    gfwUrl: state.proxy.gfwUrl,
    gfwMode: state.proxy.gfwMode,
    gfwList: state.proxy.gfwList,
    loading: state.loading[genLoadingNamespace(ProxyTypeEnum.EMIT_FETCH_GFW_LIST)],
    error: state.error[genErrorNamespace(ProxyTypeEnum.EMIT_FETCH_GFW_LIST)]
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateGFWUrl: (url: string) => {
      dispatch(updateGFWUrl(url));
      dispatch(emitFetchGFWList());
    },
    updateGFWMode: (mode: GFWMode) => {
      dispatch(updateGFWMode(mode));
    },
    catchError: (err: Error) => {
      dispatch(catchError(err));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GFWListSetting);
