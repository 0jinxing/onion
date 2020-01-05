import { connect } from "react-redux";
import UserRule from "@/components/UserRule";

import { State } from "@/store";
import { Dispatch } from "redux";
import { toDelete } from "@/actions/rule";

const mapStateToProps = (state: State) => ({ rule: state.rule });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  del: (patterns: string[]) => dispatch(toDelete(patterns))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRule);
