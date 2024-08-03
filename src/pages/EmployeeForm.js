import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../Styles/EmployeeForm.css';

function EmployeeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: [],
        img: null,
    });

    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            async function fetchEmployee() {
                try {
                    const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                    const employee = response.data;
                    setFormData({
                        name: employee.name,
                        email: employee.email,
                        mobileNo: employee.mobileNo,
                        designation: employee.designation,
                        gender: employee.gender,
                        courses: employee.courses,
                        img: employee.img
                    });
                } catch (error) {
                    console.error('Error fetching employee:', error);
                }
            }

            fetchEmployee();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                courses: checked 
                    ? [...prevData.courses, value] 
                    : prevData.courses.filter(course => course !== value)
            }));
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
            if (id) {
                await axios.put(`http://localhost:5000/api/employees/${id}`, form);
            } else {
                await axios.post('http://localhost:5000/api/employees', form);
            }
            alert('Employee saved successfully');
            navigate('/employeeList');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Navbar userName="User Name" />
            <div className="employee-form">
                <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
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
                    <div>
                        <label>Gender</label>
                        <div className="gender-options">
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
                    </div>
                    <div>
                        <label>Course</label>
                        <div className="course-options">
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default EmployeeForm;
