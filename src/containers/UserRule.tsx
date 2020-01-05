import { connect } from "react-redux";
import UserRule from "@/components/UserRule";

import { State } from "@/store";
import { Dispatch } from "redux";
import { del } from "@/actions/rule";

const mapStateToProps = (state: State) => ({ rule: state.rule });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  del: (patterns: string[]) => dispatch(del(patterns))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRule);
