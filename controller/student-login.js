const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLoginPage = (req, res) => {
    res.render('student-login');
};

exports.postStudentLogin = (req, res) => {
    const { studentID, studentUserName, studentPassword } = req.body;

    const sql = `
        SELECT s.studentID, s.firstname, s.middlename, s.lastname, s.sectionname
        FROM studentlogins AS sl
        INNER JOIN students AS s ON sl.studentID = s.studentID
        WHERE sl.studentID = ? AND sl.studentUserName = ? AND sl.studentPassword = ?
    `;

    const values = [studentID, studentUserName, studentPassword];

    const connection = mysql.createConnection(conn);
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                // Login successful
                // Render the student dashboard EJS template with user data
                res.render('student-dashboard', {
                    firstname: results[0].firstname,
                    middlename: results[0].middlename,
                    lastname: results[0].lastname
                });
            } else {
                // Login failed
                res.send('Login failed');
            }
        }
    });
};



