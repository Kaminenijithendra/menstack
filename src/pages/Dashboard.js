import React from 'react';
import { Link } from 'react-router-dom'; 
import '../index.css';  
import Navbar from '../components/Navbar'; 

function Dashboard() {
    const userName = localStorage.getItem('userName'); 

    return (
        <div className="dashboard">
            <Navbar userName={userName} />
            <div className="dashboard-content">
                <h1>Welcome to the Admin Panel</h1>
                <p>Manage your application here.</p>
                <Link to="/employee-form">Employee Form</Link> 
            </div>
        </div>
    );
}

export default Dashboard;
