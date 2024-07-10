import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_login from "./Admin/Admin_login";
import Dashboard from "./Admin/Dashboard";
import { Employee_provider } from "./Context/employee_context";
import { Dishes_provider } from "./Context/Dishes_context";
import { Table_registration_provider } from "./Context/Table_registration";
import { Table_schedule_provider } from "./Context/Table_schedule_context";
import Order from "./Customer/Order.js";
import Cart from "./Customer/Cart.js";
import LoginPage from "./Customer/LoginPage.js";
import ItemDetails from "./Customer/ItemDetails.js";
import { TokenVerificationProvider } from "./Context/customer_verification.js";
const base = "http://localhost:8000";

function App() {
  return (
    <Dishes_provider>
      <Table_registration_provider>
        <Table_schedule_provider>
          <Employee_provider>
            <TokenVerificationProvider>
              <Router>
                <div className="App">
                  <button
                    className="p-2 my-2 bg-blue-600 rounded-md text-lg text-white"
                    onClick={() => {
                      localStorage.removeItem("c_token");
                      localStorage.removeItem("token");
                      localStorage.removeItem("cart");
                      window.location.href = "/login";
                      localStorage.removeItem("doneOrders");
                    }}
                  >
                    logout
                  </button>
                  <Routes>
                    <Route path="/" element={<Admin_login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/item/:id" element={<ItemDetails />} />
                  </Routes>
                </div>
              </Router>
            </TokenVerificationProvider>
          </Employee_provider>
        </Table_schedule_provider>
      </Table_registration_provider>
    </Dishes_provider>
  );
}

export default App;
