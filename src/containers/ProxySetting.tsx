import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setProxy } from "@/actions/proxy";
import { createModify, saveModify } from "@/actions/modify";
import ProxySetting from "@/components/ProxySetting";
import { State } from "@/store";

const mapStateToProps = (state: State) => {
  return { proxy: state.proxy.val, modify: state.modify.val };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProxy: (proxy: string) => dispatch(setProxy(proxy)),
  createModify: () => dispatch(createModify()),
  saveModify: () => dispatch(saveModify())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProxySetting);
