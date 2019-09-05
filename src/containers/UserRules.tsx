import { connect } from "react-redux";
import UserRules from "../components/UserRules";

const mapStateToProps = (state: { rules: { val: string[] } }) => {
  return {
    rules: state.rules.val
  };
};

export default connect(mapStateToProps)(UserRules);
