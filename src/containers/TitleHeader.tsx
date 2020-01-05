import { connect } from "react-redux";
import TitleHeader from "@/components/TitleHeader";
import { State } from "@/store";

const mapStateToProps = (state: State) => ({
  modify: state.modify,
  proxy: state.proxy
});

export default connect(mapStateToProps)(TitleHeader);
