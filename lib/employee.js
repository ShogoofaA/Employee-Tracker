const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const {connection} = require('./department');
const { promptUser } = require('../server');

connection.connect(err => {
    if (err) throw err;
})

showEmps = () => {
    connection.query(`SELECT employee.id, employee.first_name, 
    employee.last_name, 
    role_id AS role, role_salary AS salary,
    department_name AS department,
    manager_id AS manager
    FROM employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id`,
        function (err, results) {
            if (err) {
                console.log(err.message);
            }
            console.table(results);
            promptUser();
        })
}

addEmp = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is their role id?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is their managers id?'
            }
        ])
        .then((answers) => {
            connection.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`,
                [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
                function (err, results) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log('Success! Employee was added.');
                    promptUser();
                }
            )
        })

}
updateEmp = () => {
    connection.query(
        `SELECT first_name, last_name FROM employee`,
        function (err, results) {
            if (err) {
                console.log(err.message);
            }
            let empList = [];
            results.forEach(item => {
                empList.push(item.first_name);
                empList.push(item.last_name);
            })
            let fullNames = [];
            for (let i = 0; i < empList.length; i += 2) {
                fullNames.push(`${empList[i]} ${empList[i + 1]}`)
            }
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'emp',
                        message: 'Which employee would you like to edit?',
                        choices: fullNames
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: "What would you like the employees new role id to be?"
                    }
                ])
                .then((answers) => {
                    let nameSplit = answers.emp.split(" ");
                    let first = nameSplit[0];
                    let last = nameSplit[1];
                    connection.query(
                        `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`,
                        [answers.role_id, first, last],
                        function (err, results) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.log('Success! Their information has been updated.');
                            promptUser();
                        });
                })
        })
}

module.exports = { showEmps, addEmp, updateEmp };