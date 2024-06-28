import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_login from "./Admin/Admin_login";
import Dashboard from "./Admin/Dashboard";
import { Employee_provider } from "./Context/employee_context";
import { Dishes_provider } from "./Context/Dishes_context";
import { Table_registration_provider } from "./Context/Table_registration";
import { Table_schedule_provider } from "./Context/Table_schedule_context";
import Order from "./customer/Order.js";
import Cart from "./customer/Cart.js";
const base = "http://localhost:8000";

function App() {
  return (
    <Dishes_provider>
      <Table_registration_provider>
        <Table_schedule_provider>
          <Employee_provider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Admin_login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/cart"element={<Cart />} />
                  </Routes>
                </div>
              </Router>
          </Employee_provider>
        </Table_schedule_provider>
      </Table_registration_provider>
    </Dishes_provider>
  );
}

export default App;
