import React, { useContext, useEffect } from "react";
import ReportContext from "../../context/report/reportContext";
import AuthContext from "../../context/auth/authContext";
import Report from "../report/Report";

const Home = () => {
  const reportContext = useContext(ReportContext);
  const { reports, loadReports } = reportContext;
  const authContext = useContext(AuthContext);
  const { loadUser, headers, userInfo, email } = authContext;

  useEffect(() => {
    console.log("useEffect!!");
    if (userInfo === null) loadUser({ email, headers });
    else loadReports({ userInfo, headers });
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <div className="grid-2">
      Home
      {reports.map(item => {
        console.log(item);
        return <Report key={item.id} name={item.name} />;
      })}
    </div>
  );
};

export default Home;
