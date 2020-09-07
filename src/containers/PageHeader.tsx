import { connect } from "react-redux";
import PageHeader from "@/components/PageHeader";

import { State } from "@/store/query-store";

const mapStateToProps = (state: State) => {
  return {
    change: state.change,
    proxyUrl: state.proxy.proxyUrl,
    gfwMode: state.proxy.gfwMode
  };
};

export default connect(mapStateToProps)(PageHeader);
