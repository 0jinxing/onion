import { connect } from "react-redux";
import PageHeader from "@/components/PageHeader";

import { State } from "@/store";

const mapStateToProps = (state: State) => {
  return {
    change: state.change,
    proxyUrl: state.proxy.proxyUrl,
  };
};

export default connect(mapStateToProps)(PageHeader);
