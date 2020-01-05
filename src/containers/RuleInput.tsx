import { connect } from "react-redux";
import { toAllow, toDisallow } from "@/actions/rule";
import { Dispatch } from "redux";
import { State } from "@/store";
import { queryFilter } from "@/utils";
import { BlockingFilter } from "@/lib/adblockplus";
import RuleInput from "@/components/RuleInput";

const mapStateToProps = (state: State) => {
  const { rule, report } = state;
  const urls = report.map(r => r.href);
  const patterns = rule.map(r => r.pattern);
  const filterArr = queryFilter(urls, patterns);

  const _report = state.report.filter((_, ind) => {
    return !(filterArr[ind] instanceof BlockingFilter);
  });
  return { rule: state.rule, report: _report };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    allow: (hostname: string, delInd?: number) =>
      dispatch(toAllow(hostname, delInd)),
      
    disallow: (hostname: string, delInd?: number) =>
      dispatch(toDisallow(hostname, delInd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleInput);
