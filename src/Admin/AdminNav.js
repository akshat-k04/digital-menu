import React from "react";
import "../App.css";

function AdminNav({ setMode }) {
  return (
    <div className="flex w-full py-2 justify-evenly items-center text-xl cursor-pointer ">
      <span
        onClick={() => {
          setMode("tableregistration");
        }}
      >
        Table Registration
      </span>
      <span
        onClick={() => {
          setMode("dishes");
        }}
      >
        Dishes
      </span>
      <span
        onClick={() => {
          setMode("table");
        }}
      >
        Table
      </span>
      <span
        onClick={() => {
          setMode("employee");
        }}
      >
        Employee
      </span>
    </div>
  );
}

export default AdminNav;
