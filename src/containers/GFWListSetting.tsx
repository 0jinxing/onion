import { connect } from "react-redux";
import {
  updateGFWMode,
  updateGFWUrl,
  GFWMode,
  emitFetchGFWList,
} from "@/actions/proxy";
import GFWListSetting from "@/components/GFWListSetting";
import { Dispatch } from "redux";
import { State } from "@/store";

const mapStateToProps = (state: State) => {
  return {
    gfwUrl: state.proxy.gfwUrl,
    gfwMode: state.proxy.gfwMode,
    loading: state.loading["@@loading/EMIT_FETCH_GFW_LIST"],
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GFWListSetting);
