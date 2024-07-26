const express = require('express');
const router = express.Router();
const multer = require('multer');
const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Create a new employee
router.post('/', upload.single('img'), async (req, res) => {
    try {
        console.log("Request Body: ", req.body); // Debugging info
        console.log("Request File: ", req.file); // Debugging info
        
        const { name, email, mobileNo, designation, gender, courses } = req.body;
        const img = req.file ? req.file.path : null;

        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            designation,
            gender,
            courses: courses.split(','), // Convert string back to array
            img,
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        console.error('Error:', error); // Log error
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Optionally delete the image file
        if (employee.img) {
            fs.unlinkSync(path.join(__dirname, '..', employee.img));
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
