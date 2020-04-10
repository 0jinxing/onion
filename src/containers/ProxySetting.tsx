import { connect } from "react-redux";
import ProxySetting from "@/components/ProxySetting";
import { updateProxyUrl } from "@/actions/proxy";

import { Dispatch } from "redux";
import { State } from "@/store/query-store";

const mapStateToProps = (state: State) => {
  return {
    proxyUrl: state.proxy.proxyUrl,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProxyUrl: (proxyUrl: string) => {
      dispatch(updateProxyUrl(proxyUrl));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProxySetting);
