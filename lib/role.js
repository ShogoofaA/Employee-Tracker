const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const { connection } = require('./department');
const {promptUser} = require('../server');

connection.connect(err => {
    if(err) throw err;
})

showRoles = () => {
    connection.query('SELECT * FROM roles', 
    function(err, results) {
        if(err) {
            console.log(err.message);
        }
        console.table(results);
        promptUser();
    })
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'What is the amount of salary this role makes?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is their department ID number?'
        }
    ])
    .then((answers) => {
        connection.query('INSERT INTO roles(role_title, role_salary, department_id) VALUES ( , , )',
        [answers.role_title, answers.role_salary, answers.department_id],
        function(err, result) {
            if(err) {
                console.log(err.message)
                return;
            }
            console.log('Success! Your new role has been added.')
            promptUser();
        })
    })
}

module.exports = {showRoles, addRole};