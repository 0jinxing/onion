import { connect } from "react-redux";
import { State } from "@/store/query-store";
import { Dispatch } from "redux";
import { addRule, deleteRule } from "@/actions/rule";
import RuleInput from "@/components/RuleInput";

function mapStateToProps(state: State) {
  return {
    rules: state.rule.map(i => i.pattern),
    gfwList: state.proxy.gfwList
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addRule: (pattern: string) => dispatch(addRule(pattern)),
    deleteRule: (pattern: string) => dispatch(deleteRule(pattern))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleInput);
