const express = require('express');
const app = express();
app.use(express.json());
let students = [];
app.get('/', (req, res) => {
    res.send('Student Management Server is running!');
});
app.post('/students', (req, res) => {

   
    const { name, id, email, course, age } = req.body;


    if (!name || !id || !email || !course || age === undefined || age === null) {
        return res.status(400).json({
            message: 'All fields are mandatory'
        });
    }
    const existingStudent = students.find(student => student.id === id);

    if (existingStudent) {
        return res.status(409).json({
            message: 'Student ID already exists'
        });
    }

    // Create student record
    const newStudent = {
        name,
        id,
        email,
        course,
        age
    };

    // Store student in array
    students.push(newStudent);

    // Success response
    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});