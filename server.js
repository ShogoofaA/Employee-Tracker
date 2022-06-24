const inquirer = require('inquirer');

const promptUser = () => {
    inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'Please select an option.',
        choices: ['View all departments',
         'View all roles',
         'View all employees',
         'Add a department',
         'Add a role',
         'Add an employee',
         'Update an employee role']
    })
    .then((select) => {
        switch(select['options']) {
            case 'View all departments':
                showDepts();
                break;
            case 'View all roles':
                showRoles();
                break;
            case 'View all employees':
                showEmps();
                break;
            case 'Add a department':
                addDepts();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;
            case 'Update an employee role':
                updateEmp();
                break;
        }
    })
}

module.exports =  {promptUser}
const {showDepts, addDepts} = require('./lib/department');
const { showRoles, addRole } = require('./lib/role')
const { showEmps, addEmp, updateEmp } = require('./lib/employee');
promptUser();