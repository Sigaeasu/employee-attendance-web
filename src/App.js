import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeList from "./components/EmployeeList";
import Login from "./components/Login";
import AttendanceRecord from "./components/AttendanceRecord";

function App() {
  const [loginData, setLoginData] = useState([])

  if(loginData.length === 0) {
    return <Login onLogin={setLoginData} />
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/employees"} className="nav-link">
              Employees
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path='/' element={<EmployeeList/>} />
          <Route path='/employees' element={<EmployeeList/>} />
          <Route path='/add' element={<AddEmployee/>} />
          <Route path='/edit' element={<EditEmployee/>} />
          <Route path='/attendance-record' element={<AttendanceRecord/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;