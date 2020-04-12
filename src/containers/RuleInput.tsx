import { connect } from "react-redux";
import { State } from "@/store/query-store";
import { Dispatch } from "redux";
import { addRule } from "@/actions/rule";
import RuleInput from "@/components/RuleInput";

function mapStateToProps(state: State) {
  return {
    rules: state.rule.map((i) => i.pattern),
    gfwList: state.proxy.gfwList,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addRule: (pattern: string) => dispatch(addRule(pattern)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleInput);
