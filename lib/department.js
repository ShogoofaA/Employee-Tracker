const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const { promptUser} = require('../server');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employees'
});

connection.connect(err => {
    if(err) throw err;
})

showDepts = () => {
    connection.query("SELECT * FROM department", function (err, results) {
        if(err) {
            console.log(err.message)
        }
        console.table(results);
        promptUser()
    });
};

addDepts = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please input the name of your new Department.'
        }
    ])
    .then((deptName) => {
        connection.query("INSERT INTO department(department_name) Values ()"),
        [deptName.departmentName],
        function (err, results) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log('Success! Your new department was added.')
            promptUser();
        }
    })
}

module.exports = { connection, showDepts, addDepts};