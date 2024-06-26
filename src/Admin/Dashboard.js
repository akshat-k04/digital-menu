import React, { useState } from "react";
import AdminNav from "./AdminNav";
import TableRegisteration from "./TableRegisteration";
import Table from "./Table";
import Employee from "./Employee";
import Dishes from "./Dishes";

export default function Dashboard() {
  const [mode, setMode] = useState("tableregistration");
  return (
    <div className="h-lvh overflow-auto w-full">
      <AdminNav setMode={setMode} />
      {mode == "tableregistration" && <TableRegisteration />}
      {mode == "table" && <Table />}
      {mode == "employee" && <Employee />}
      {mode == "dishes" && <Dishes />}
    </div>
  );
}
