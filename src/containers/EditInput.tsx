import { connect } from "react-redux";
import { allow } from "@/actions/rule";
import { Dispatch } from "redux";
import { State } from "@/store";
import { queryFilter } from "@/utils";
import { BlockingFilter } from "@/lib/adblockplus";
import EditInput from "@/components/EditInput";

const mapStateToProps = (state: State) => {
  const { rule, report } = state;
  const urls = report.val.map(r => r.href);
  const patterns = rule.val.map(r => r.pattern);
  const filterArr = queryFilter(urls, patterns);

  const _report = state.report.val.filter((_, ind) => {
    return !(filterArr[ind] instanceof BlockingFilter);
  });
  return { rule: state.rule.val, report: _report };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addRule: (hostname: string, delInd?: number) =>
      dispatch(allow(hostname, delInd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInput);
