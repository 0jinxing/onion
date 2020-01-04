import { connect } from "react-redux";
import TitleHeader from "@/components/TitleHeader";
import { State } from "@/store";

const mapStateToProps = (state: State) => ({ modify: state.modify });

export default connect(mapStateToProps)(TitleHeader);
