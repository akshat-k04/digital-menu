import React, { useState, useEffect, useContext } from "react";
import AdminNav from "./AdminNav";
import TableRegisteration from "./TableRegisteration";
import Table from "./Table";
import Employee from "./Employee";
import Dishes from "./Dishes";
import { Dishes_context } from "../Context/Dishes_context";
import { Table_schedule_context } from "../Context/Table_schedule_context";
import { Employee_context } from "../Context/employee_context";
import { Table_registration_context } from "../Context/Table_registration";
const base = "http://localhost:8000";

export default function Dashboard({ checkToken }) {
  const [mode, setMode] = useState("tableregistration");
  const { get_Dishes } = useContext(Dishes_context);
  const { get_table_schedule } = useContext(Table_schedule_context);
  const { get_employee } = useContext(Employee_context);
  const { get_Table_registration } = useContext(Table_registration_context);
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token
        // redirect to login page
        window.location.href = "/";
        console.log("No token");
      }

      try {
        const response = await fetch(`${base}/admin/employee/verifyToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          window.location.href = "/";
          throw new Error("Token verification failed");
        }

        // Token is valid, proceed with the component logic
        const data = await response.json();

        await get_employee();
        await get_Dishes();
        await get_table_schedule();
        await get_Table_registration();
      } catch (error) {
        console.error("Error:", error);
        // re direct to login page
      }
    };
    checkToken();
  }, []);
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
