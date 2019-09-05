import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setProxy } from "../actions/proxy";
import { createModify } from "../actions/modify";
import ProxySetting from "../components/ProxySetting";

const mapStateToProps = (state: { proxy: { val: string } }) => {
  return {
    proxy: state.proxy.val
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProxy: (proxy: string) => {
    return dispatch(setProxy(proxy));
  },
  createModify: () => {
    return dispatch(createModify());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProxySetting);
