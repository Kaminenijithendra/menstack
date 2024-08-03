import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeList from './pages/EmployeeList'; 
import EmployeeEdit from './pages/EmployeeEdit';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="/employeeList" element={<EmployeeList />} /> 
        <Route path="/employee-edit/:id" element={<EmployeeEdit />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
