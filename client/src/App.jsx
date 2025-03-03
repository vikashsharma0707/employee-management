import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDasboard';
import HRDashboard from './components/HrDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import './styles/app.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
          <Route path="/hr" element={<HRDashboard user={user} />} />
          <Route path="/employee" element={<EmployeeDashboard user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;