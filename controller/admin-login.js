const mysql = require("mysql");

const conn = {
    host: 'localhost',
    database: 'finalcapstone',
    user: 'root',
    password: ''
};

exports.getAdminLogin = (req, res) => {
    res.render('admin-login');
};

exports.postAdminLogin = (req, res) => {
    const connection = mysql.createConnection(conn);

    const {admin_id, username, userpassword } = req.body;

    console.log(req.body);
    // Use placeholders in the SQL query
    const sql = 'SELECT admin_id, username, userpassword FROM adminlogins WHERE admin_id = ? AND username = ?';

    connection.query(sql, [admin_id, username], (err, results) => {
        if (err) {
            console.error('Cannot Log In:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                const storedPassword = results[0].userpassword;
                // Compare the stored password with the provided password (you should use a secure password hashing library)
                if (userpassword === storedPassword) {
                    // Login successful
                    res.redirect('/admin/dashboard');
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