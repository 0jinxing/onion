import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "@/store/query-store";
import { deleteRule } from "@/actions/rule";
import RuleTable from "@/components/RuleTable";

const mapStateToProps = (state: State) => {
  return { rules: state.rule };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteRule: (pattern: string) => dispatch(deleteRule(pattern)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleTable);
