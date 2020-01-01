import { connect } from "react-redux";
import TitleHeader from "@/components/TitleHeader";

const mapStateToProps = (state: { modify: { val: boolean } }) => {
  return {
    modify: state.modify.val
  };
};

export default connect(mapStateToProps)(TitleHeader);
