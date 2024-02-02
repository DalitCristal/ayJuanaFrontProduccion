import Header from "../../components/Header/Header.jsx";
import AdminLoggers from "../../components/AdminDashboard/AdminLoggers.jsx";
import { LoggerContext } from "../../components/AdminDashboard/LoggerContext.jsx";
import { useContext } from "react";

const LogViewer = () => {
  const { logs } = useContext(LoggerContext);

  return (
    <>
      <Header />
      <AdminLoggers logs={logs} />
    </>
  );
};

export default LogViewer;
