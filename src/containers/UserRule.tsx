import { connect } from "react-redux";
import UserRule from "@/components/UserRule";

import { State } from "@/store";

const mapStateToProps = (state: State) => ({ rule: state.rule });

export default connect(mapStateToProps)(UserRule);
