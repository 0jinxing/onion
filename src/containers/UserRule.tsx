import { connect } from "react-redux";
import UserRule from "../components/UserRule";

import { Rule } from "../reducers/rule";
import { State } from "../store";

const mapStateToProps = (state: State) => {
  return {
    rule: state.rule.val
  };
};

export default connect(mapStateToProps)(UserRule);
