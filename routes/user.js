const express = require('express');
const connection = require('../config/config');
const router = express.Router();

router.post('/register_user', function (req, res) {
    var sql_body = [req.body.name, req.body.email, req.body.phoneNumber, req.body.address,req.body.dateOfBirth,req.body.password]
    var sql = `insert into user(Name,Email,PhoneNumber,Address,DateOfBirth,Password)
                values(?,?,?,?,?,?)`
    connection.query(sql, sql_body, (err, results) => {
        if (err) {
            console.log(err)
            return;
        }
        // console.log(results);
        if (results.affectedRows != 0) {
            res.send({ success: true, message: "Successfully registered" })
        }
        else {
            res.send({ success: false, message: "Unable to register" })
        }
    })
})

router.post('/login', (req, res) => {
    connection.query(`select * from user where email = '${req.body.email}'`, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (results.length > 0) {
            if (results[0].password === req.body.password) {
                res.send({ message: "successfully logged", success: true, results })
            }
            else {
                res.send({ message: "wrong userrname or password", success: false })
            }
        }
        else {
            res.send({ message: "wrong userrname or password", success: false })
        }
    })
})

router.get('/all_users', (req, res) => {
    connection.query(`SELECT email, firstname, lastname, salary, e.id
                        FROM users u, employee e
                        WHERE u.id = e.userId`, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.length > 0) {
            res.send({ message: "retreived all users", success: true, results })
        }
        else {
            res.send({ message: "no users found", success: false })
        }
    })
})

router.get('/employee_by_id/:userId', (req, res) => {
    connection.query(`SELECT email, firstname, lastname, salary
        FROM users u, employee e
        WHERE u.id = e.userId
        AND e.userId = ?`, req.params.userId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.length > 0) {
            res.send({ message: "retreived all users", success: true, results })
        }
        else {
            res.send({ message: "no users found", success: false })
        }
    })
})

router.put('/update_employee/:empId', (req, res) => {
    var sql = `update employee
                set lastname = '${req.body.lastname}',
                firstname = '${req.body.firstname}',
                salary = '${req.body.salary}'
                Where id = ${req.params.empId} `

    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            return;
        }
        if (results.affectedRows != 0) {
            res.send({ success: true, message: "Successfully updated employee" })
        }
        else {
            res.send({ success: false, message: "Unable to updated employee" })
        }
    })
})

router.delete('/delete_employee/:empId', (req, res) => {
    connection.query('delete from employee where id = ' + req.params.empId, (err, results) => {
        if (err) {
            console.log(err)
            return;
        }
        if (results.affectedRows != 0) {
            res.send({ success: true, message: "Successfully deleted employee" })
        }
        else {
            res.send({ success: false, message: "Unable to delete employee" })
        }
    });

})


module.exports = router;