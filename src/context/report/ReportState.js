/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useReducer } from "react";
import PropTypes from "prop-types";
import ReportContext from "./reportContext";
import reportReducer from "./reportReducer";
import { LOAD_REPORTS, LOAD_REPORTS_FAIL } from "../types";

const ReportState = props => {
  const initialState = {
    // null
    reports: [
      {
        id: 0,
        name: "Example",
        customerName: "ExampleCustomer",
        date: "7/7/7777",
        age: 0
      }
    ]
  };
  // Deconstruct from Use reducer
  const [state, dispatch] = useReducer(reportReducer, initialState);

  // Dispatch with type here
  const loadReports = async formData => {
    console.log("loadReport!!");
    // destructure array and fetch
    console.log(formData);
    const { userInfo, headers } = formData;
    const { authorizedReport } = userInfo[0];
    try {
      const reportData = [];

      authorizedReport.forEach(async id => {
        let res = await fetch(`/reports?id=${id}`, {
          method: "GET",
          headers: { ...headers }
        });
        res = await res.json();
        // console.log(res);
        reportData.push(res[0]);
      });
      /* for (const report of authorizedReport) {
        const response = await fetch(`/reports?id=${report}`, {
          method: "GET",
          headers: { ...headers }
        });
        const data = await response.json();
        reportData.push(data[0]);
      } */
      console.log(reportData);
      dispatch({
        type: LOAD_REPORTS,
        payload: reportData
      });
    } catch (err) {
      console.log("report error", err);
      /* dispatch({
        type: LOAD_REPORTS_FAIL,
        payload: res
      }); */
    }
  };
  const { children } = props;
  return (
    <ReportContext.Provider
      value={{
        reports: state.reports,
        loadReports
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

ReportState.propTypes = {
  children: PropTypes.node.isRequired
};
export default ReportState;
