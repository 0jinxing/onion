import { connect } from "react-redux";
import ProxySetting from "@/components/ProxySetting";
import { updateProxyUrl } from "@/actions/proxy";

import { Dispatch } from "redux";
import { RootState } from "@/store/query-store";
import { createChange, saveChange } from "@/actions/change";

const mapStateToProps = (state: RootState) => {
  return {
    proxyUrl: state.proxy.proxyUrl
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProxyUrl: (proxyUrl: string) => {
      dispatch(updateProxyUrl(proxyUrl));
    },

    createChange: () => {
      dispatch(createChange());
    },

    saveChange: () => {
      dispatch(saveChange());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProxySetting);
