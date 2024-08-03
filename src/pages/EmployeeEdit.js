import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import '../Styles/EmployeeEdit.css'; 

function EmployeeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: [], 
        img: null,
    });

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setFormData({
                    ...response.data,
                    courses: response.data.courses.join(','), 
                });
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        }

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'courses') {
            
            setFormData(prevData => {
                const courses = prevData.courses.split(',');
                if (checked) {
                    
                    return {
                        ...prevData,
                        courses: [...new Set([...courses, value])]
                    };
                } else {
                    
                    return {
                        ...prevData,
                        courses: courses.filter(course => course !== value)
                    };
                }
            });
        } else if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                img: files[0]
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('mobileNo', formData.mobileNo);
        form.append('designation', formData.designation);
        form.append('gender', formData.gender);
        form.append('courses', formData.courses.join(',')); 
        if (formData.img) form.append('img', formData.img);

        try {
            const response = await axios.put(`http://localhost:5000/api/employees/${id}`, form);
            if (response.status === 200) {
                alert('Employee updated successfully');
                navigate('/employeeList');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="employee-edit">
            <Navbar userName="User Name" /> {/* Replace "User Name" with actual user name */}
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mobile No</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Designation</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            checked={formData.gender === 'M'}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={formData.gender === 'F'}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </div>
                <div className="form-group">
                    <label>Course</label>
                    <label>
                        <input
                            type="checkbox"
                            name="courses"
                            value="MCA"
                            checked={formData.courses.includes('MCA')}
                            onChange={handleChange}
                        />
                        MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="courses"
                            value="BCA"
                            checked={formData.courses.includes('BCA')}
                            onChange={handleChange}
                        />
                        BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="courses"
                            value="BSC"
                            checked={formData.courses.includes('BSC')}
                            onChange={handleChange}
                        />
                        BSC
                    </label>
                </div>
                <div className="form-group">
                    <label>Img Upload</label>
                    <input
                        type="file"
                        name="img"
                        onChange={handleChange}
                        accept=".jpg,.png"
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EmployeeEdit;
