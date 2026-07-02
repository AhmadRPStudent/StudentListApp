const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '56742389',
    database: 'c237_studentlistapp'
})

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
app.use(express.urlencoded({ extended: false }));

// Define routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM students', (error, results) => {
        if (error) throw error;
        res.render('index', { students: results }); // Render HTML page with data
    });
});

app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM students WHERE id = ?";
    connection.query(sql, [studentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving student by ID');
        }
        if (results.length > 0){
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
    const { name, dob, contact,image } = req.body;
    const sql = "INSERT INTO students (name, dob, contact, image) VALUES (?, ?, ?, ?)";
    // Insert the new student into the database
    connection.query( sql , [name, dob, contact, image], (error, results) => {        
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));