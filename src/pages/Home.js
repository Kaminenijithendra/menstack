import React from 'react';
import '../Styles/Home.css'; 
import Navbar from '../components/Navbar'; 
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Navbar userName="name" />
            <div className="home">
                <h1>Welcome to the Home Page</h1>
                <p>This is the main page of your application.</p>

                <Link to="/employee-form">Employee Form</Link>
            </div>
        </div>
    );
}

export default Home;
