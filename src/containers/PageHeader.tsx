import { connect } from "react-redux";
import PageHeader from "@/components/PageHeader";

import { RootState } from "@/store/query-store";

const mapStateToProps = (state: RootState) => {
  return {
    change: state.change,
    proxyUrl: state.proxy.proxyUrl,
    gfwMode: state.proxy.gfwMode
  };
};

export default connect(mapStateToProps)(PageHeader);
