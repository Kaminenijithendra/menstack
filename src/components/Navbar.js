import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName'); 

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('userName'); 
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="navbar-items">
                <Link to="/Home">Home</Link>
                <Link to="/employeeList">Employee List</Link>
                {userName && <span className="user-name">User: {userName}</span>}
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
