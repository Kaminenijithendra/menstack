import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../Styles/EmployeeList.css';
import { Link } from 'react-router-dom'; 


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        fetchEmployees();
    }, []);

    useEffect(() => {
        const results = employees.filter(employee =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEmployees(results);
    }, [searchQuery, employees]);

    const handleEdit = (id) => {
        navigate(`/employee-edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            setEmployees(employees.filter(employee => employee._id !== id));
            setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <Navbar userName="name" />
            <h2>Employee List</h2>
            <Link to="/employee-form">Employee Form</Link>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobileNo}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.courses.join(', ')}</td>
                            <td>
                                {employee.img && (
                                    <img 
                                        src={`http://localhost:5000/uploads/${employee.img}`} 
                                        alt={employee.name} 
                                        style={{ width: '100px', height: 'auto' }} 
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(employee._id)} className="edit">Edit</button>
                                <button onClick={() => handleDelete(employee._id)} className="delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
