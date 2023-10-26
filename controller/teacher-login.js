const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getLoginPage = (req, res) => {
    res.render('teacher-login');
};

exports.postTeacherLogin = (req, res) => {
    const connection = mysql.createConnection(conn);

    const { teacherid, userlogin, userpassword } = req.body;

    // Use placeholders in the SQL query
    const sql = 'SELECT teacherid, userlogin, userpassword FROM teacherlogins WHERE teacherid = ? AND userlogin = ?';
    console.log(teacherid);
    console.log(userlogin);
    console.log(userpassword);
    // Execute the SQL query with placeholders
    connection.query(sql, [teacherid, userlogin], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const storedPassword = results[0].userpassword;
                // Compare the stored password with the provided password (you should use a secure password hashing library)
                if (userpassword === storedPassword) {
                    // Login successful
                    res.redirect('/teacher/dashboard');
                } else {
                    // Incorrect password
                    res.send('Incorrect password');
                }
            } else {
                // No matching user found
                res.send('User not found');
            }
        }
        connection.end();
    });
};