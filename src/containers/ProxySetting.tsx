import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setProxy } from "../actions/proxy";
import { createModify, saveModify } from "../actions/modify";
import ProxySetting from "../components/ProxySetting";

const mapStateToProps = (state: {
  proxy: { val: string };
  modify: { val: boolean };
}) => {
  return {
    proxy: state.proxy.val,
    modify: state.modify.val
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProxy: (proxy: string) => {
    return dispatch(setProxy(proxy));
  },
  createModify: () => {
    return dispatch(createModify());
  },
  saveModify: () => {
    return dispatch(saveModify());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProxySetting);
