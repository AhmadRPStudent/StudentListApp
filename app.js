const express = require('express');
const mysql = require('mysql2');
const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '56742389',
    database: 'c237_studentlistapp'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');

// enable static files
app.use(express.static('public'));

// enable form processing
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    // Fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error Retrieving students');
        }
        // Render HTML page with data
        res.render('index', { students: results });
    });
});

app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'SELECT * FROM students WHERE studentid = ?'; // lowercase matches schema
    connection.query(sql, [studentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error Retrieving student by ID');
        }
        if (results.length > 0) {
            res.render('student', { student: results[0] });
        } else {
            res.send('Student not found');
        }
    });
});


app.get('/addStudent', (req, res) => {
    res.render('addStudent');
});

app.post('/addStudent', (req, res) => {
    // Extract student data from the request body
    const { name, dob, contact, image } = req.body;
    const sql = 'INSERT INTO students (name, dob, contact, image) VALUES (?, ?, ?, ?)';
    // Insert the new student into the database
    connection.query(sql, [name, dob, contact, image], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error adding student:", error);
            res.send('Error adding student');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

app.get('/editStudent/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT studentid, name, DATE_FORMAT(dob, '%Y-%m-%d') AS dob, contact, image FROM students WHERE studentid = ?";

    connection.query(sql, [studentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving student');
        }
        if (results.length > 0) {
            // dob will now be in YYYY-MM-DD format, perfect for <input type="date">
            res.render('editStudent', { student: results[0] });
        } else {
            res.send('Student not found');
        }
    });
});


app.post('/editStudent/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, dob, contact, image } = req.body;
    const sql = 'UPDATE students SET name = ?, dob = ?, contact = ?, image = ? WHERE studentid = ?';
    connection.query(sql, [name, dob, contact, image, studentId], (error, results) => {
        if (error) {
            console.error("Error updating student:", error);
            return res.send('Error updating student');
        }
        res.redirect('/');
    });
});


app.get('/deleteStudent/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE studentId = ?';
    connection.query(sql, [productId], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error deleting product:", error);
            res.send('Error deleting product');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));