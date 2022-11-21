const { Client } = require('pg');
var connectionString = "postgresql://aidanakalimbekova@localhost:5432/database";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.list = function (req, res) {

    client.query('SELECT * FROM users', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('users/list', { title: "Users", data: result.rows });
    });

};

exports.add = function (req, res) {
    res.render('users/add', { title: "Add User"  });
};

exports.edit = function (req, res) {

    var email = req.params.email;

    client.query('SELECT * FROM users WHERE email=$1', [email], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('users/edit', { title: "Edit User", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.email, req.body.name, req.body.surname, req.body.salary,req.body.phone, req.body.cname ];

    client.query('INSERT INTO users(email, name, surname, salary, phone, cname) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/users');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.email, req.body.name, req.body.surname, req.body.salary,req.body.phone, req.body.cname];

    client.query('UPDATE users SET name=$2, surname=$3, salary=$4, phone=$5, cname=$6 WHERE email=$1', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/users');
    });

};

exports.delete = function (req, res) {

    var email = req.params.email;

    client.query("DELETE FROM users WHERE email=$1", [email], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/users');
    });

};
