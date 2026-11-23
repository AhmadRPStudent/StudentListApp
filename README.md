Student List App

A simple web-based Student List Management System built using Node.js, Express.js, EJS, and MySQL. This application allows users to manage student records, including personal information, date of birth, contact details, and profile images.

Application Preview

The application displays student records in a clean table layout, allowing users to view, add, edit, and delete student information.

Features
View Students – Display all student records from the MySQL database.
Add Students – Add new students with their name, date of birth, contact number, and profile image.
View Student Details – View individual student information.
Edit Students – Update existing student records and profile images.
Delete Students – Remove student records from the database.
Image Upload – Upload and display student profile pictures.
Database Integration – Store and retrieve student information using MySQL.
Technologies Used
Technology	Purpose
Node.js	JavaScript runtime environment
Express.js	Backend web framework
MySQL	Relational database
MySQL2	MySQL database connection
EJS	Dynamic HTML page rendering
Multer	File upload handling
HTML5	Web page structure
CSS3 / Bootstrap	Styling and responsive layout
Project Structure
text
StudentListApp/
│
├── public/
│   └── images/          # Uploaded student images
│
├── views/
│   ├── index.ejs        # Student list page
│   ├── addStudent.ejs   # Add student page
│   ├── editStudent.ejs  # Edit student page
│   └── student.ejs      # Student details page
│
├── app.js               # Main Express application
├── package.json         # Project dependencies
├── package-lock.json    # Dependency lock file
└── README.md            # Project documentation

Installation and Setup

Follow these steps to run the application locally.

1. Clone the Repository
bash
git clone https://github.com/AhmadRPStudent/StudentListApp.git

2. Navigate to the Project Folder
bash
cd StudentListApp

3. Install Dependencies
bash
npm install


Install Multer if it is not already included:

bash
npm install multer

4. Set Up MySQL Database

Open MySQL Workbench or your preferred MySQL client.

Create the database:

sql
CREATE DATABASE c237_studentlistapp;


Select the database:

sql
USE c237_studentlistapp;


Create the students table:

sql
CREATE TABLE students (
    studentid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    contact VARCHAR(20),
    image VARCHAR(255)
);

5. Configure Database Connection

Configure your MySQL connection in app.js using your own database credentials.

For security, use environment variables instead of storing database passwords directly in your source code.

6. Configure Image Uploads

Ensure Multer is initialized using the configured storage:

javascript
const upload = multer({ storage });


This allows the application to process uploaded student images.

7. Start the Application
bash
node app.js


The application uses port 3000 by default.

Open your browser and visit:

http://localhost:3000

Application Routes
HTTP Method	Route	Description
GET	/	Display all students
GET	/student/:id	View student details
GET	/addStudent	Display the add student page
POST	/addStudent	Add a new student
GET	/editStudent/:id	Display the edit student page
POST	/editStudent/:id	Update student information
GET	/deleteStudent/:id	Delete a student
Database Information

The application uses a MySQL database named c237_studentlistapp.

The students table contains the following fields:

Field	Description
studentid	Unique student ID
name	Student's full name
dob	Student's date of birth
contact	Student's contact number
image	Student profile image filename
Future Improvements
Add student search functionality.
Implement pagination for large student lists.
Add input validation.
Improve error handling.
Add authentication and user management.
Improve mobile responsiveness.
Author

Ahmad

GitHub: @AhmadRPStudent

License

This project is licensed under the ISC License, as specified in package.json.