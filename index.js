const inquirer = require('inquirer');
const matrix = require('./db/connection')

function prompt () {
    console.log(`
    ======================
    Employee Tracker!
    ======================`)


//Prompt to options for main menu
inquirer.prompt([
    {
        type: 'list',
        name: 'mainmenu',
        message: 'Please choose one of the options:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Manager', 'View Employees by Deparment',
                    'Add a Role', 'Add an Employee','Update an Employee Role','Update Employee Manager', 'Exit']
    }
]).then(function (data) {
    switch (data.mainmenu) {
        case 'View All Departments': 
            viewAllDepartments()
            break;

        case 'View All Roles': 
        viewAllRoles()
        break;

        case 'View All Employees': 
        viewAllEmployees()
        break;

        case 'View Employees by Manager':
            viewEmployeeManagers();
            break;
        
        case 'View Employees by Deparment':
            viewEmployeeDepartment()
            break;

        case 'Add a Role':
            addRoles()
            break;
        
        case 'Add an Employee': 
        addEmployee()
        break;

        case 'Update Employee Role':
            updateEmployeeRole()
            break;

        case 'Update Employee Manager':
            updateEmployeeManager()
            break;
        
        case 'Exit': 
        process.exit()
        break;
    
        default:
            break;
    }
})

}

function viewAllDepartments() {
    matrix.query('SELECT name FROM department', (err, data) =>{
        console.log(data)
        prompt()
    })
}

function viewAllRoles() {
    matrix.query('SELECT * FROM role', (err, data) =>{
        console.log(data)
        prompt()
    })
}

function viewAllEmployees() {
    matrix.query('SELECT * FROM employee', (err, data) =>{
        console.log(data)
        prompt()
    })
}

function viewEmployeeManagers() {
    matrix.query('SELECT manager_id FROM employee', (err, data) =>{
        console.log(data)
        prompt()
    })
}

function addEmployee() {
    matrix.query('SELECT title, id FROM role', (err, data) =>{
        const rolesArray = data.map((role) =>{
            return {name: role.title, value: role.id}
        })
        inquirer.prompt([{
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name?"

        },
        {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'employeerole',
            message: 'What is the employees role?',
            choices: rolesArray
        },
        
    ]).then(function (data) {
        matrix.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);', [data.firstname, data.lastname, data.employeerole, 1])
        prompt()
    })
    })

}

function addRoles() {
    matrix.query('SELECT name, id FROM department', (err, data) =>{
        const deptArray = data.map((department)=>{
            return {name: department.name, value: department.id}
        })
        inquirer.prompt([{
            type: 'input',
            name: 'titlename',
            message: "What is the title of this role?"

        },
        {
            type: 'input',
            name: 'salarynumber',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'departmentid',
            message: 'What department is this role in?',
            choices: deptArray
        }
    ]).then(function (data) {
        matrix.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);', [data.titlename, data.salarynumber, data.departmentid, 1])
        prompt()
    })
    })

}
prompt();