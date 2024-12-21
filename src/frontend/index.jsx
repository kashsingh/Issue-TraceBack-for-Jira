import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text } from "@forge/react";
import { invoke } from "@forge/bridge";
import { DynamicTable } from "@forge/react";
import { createRows, head } from "./config";
const App = () => {
  const [auditLogs, setAuditLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    invoke("getAllLogs").then((response) => {
      const rows = createRows(response.results);
      setAuditLogs(rows);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <DynamicTable
        isLoading={isLoading}
        rowsPerPage={10}
        head={head}
        rows={auditLogs}
        emptyView="No data to display"
      />
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
