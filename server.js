const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory student array
let students = [];

// Basic route
app.get('/', (req, res) => {
res.send('Student Management Server is running!');
});

// TASK 2: POST - Add a new student
app.post('/students', (req, res) => {

const { name, id, email, course, age } = req.body;

// Validate mandatory fields
if (!name || !id || !email || !course || age === undefined || age === null) {
    return res.status(400).json({
        message: 'All fields are mandatory'
    });
}

// Check duplicate ID
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
```

});

// TASK 3: GET - Retrieve all students
app.get('/api/students', (req, res) => {

```
res.status(200).json({
    message: 'Students retrieved successfully',
    students: students
});
```

});

// TASK 3: GET - Retrieve a specific student by ID
app.get('/api/students/:id', (req, res) => {

```
const studentId = req.params.id;

const student = students.find(s => String(s.id) === studentId);

if (!student) {
    return res.status(404).json({
        message: 'Student not found'
    });
}

res.status(200).json({
    message: 'Student retrieved successfully',
    student: student
});

});

// TASK 4: PUT - Update student details
app.put('/api/students/:id', (req, res) => {

const studentId = req.params.id;

// Find student by ID
const index = students.findIndex(s => String(s.id) === studentId);

if (index === -1) {
    return res.status(404).json({
        message: 'Student not found'
    });
}

const { name, email, course, age } = req.body;

// Validate mandatory fields
if (!name || !email || !course || age === undefined || age === null) {
    return res.status(400).json({
        message: 'All fields are mandatory'
    });
}

// Update student details
students[index] = {
    id: students[index].id,
    name,
    email,
    course,
    age
};

res.status(200).json({
    message: 'Student updated successfully',
    student: students[index]
});

});

// TASK 5: DELETE - Delete student record
app.delete('/api/students/:id', (req, res) => {

const studentId = req.params.id;

// Find student by ID
const index = students.findIndex(s => String(s.id) === studentId);

if (index === -1) {
    return res.status(404).json({
        message: 'Student not found'
    });
}

// Delete student from array
students.splice(index, 1);

res.status(200).json({
    message: 'Student deleted successfully'
});

});

// Start server
const PORT = 3000;
app.get('/test', (req, res) => {
    res.send('Latest server.js is running!');
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
