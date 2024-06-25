import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin_login from './Admin/Admin_login';
import Dashboard from './Admin/Dashboard';
import { Employee_provider } from './Context/employee_context';
function App() {
  return (
    <Employee_provider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Admin_login />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </div>
      </Router>
    </Employee_provider>
  );
}

export default App;
