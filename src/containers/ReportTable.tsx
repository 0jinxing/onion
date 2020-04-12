import React from "react";
import { connect } from "react-redux";
import ReportTable from "@/components/ReportTable";
import { State } from "@/store/query-store";
import { Dispatch } from "redux";
import { deleteReport } from "@/actions/report";
import { addRule } from "@/actions/rule";

function mapStateToProps(state: State) {
  return {
    reports: state.report,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    deleteReport: (hostname: string) => dispatch(deleteReport(hostname)),
    addRule: (pattern: string) => dispatch(addRule(pattern)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
