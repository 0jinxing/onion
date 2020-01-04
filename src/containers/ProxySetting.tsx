import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setProxy } from "@/actions/proxy";
import { createModify, saveModify } from "@/actions/modify";
import ProxySetting from "@/components/ProxySetting";
import { State } from "@/store";

const mapStateToProps = (state: State) => ({
  proxy: state.proxy,
  modify: state.modify
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProxy: (proxy: string) => dispatch(setProxy(proxy)),
  createModify: () => dispatch(createModify()),
  saveModify: () => dispatch(saveModify())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProxySetting);
