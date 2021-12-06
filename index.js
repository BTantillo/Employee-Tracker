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
                    'Add a Role', 'Add an Employee','Update Employee Role', 'Exit']
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
        console.table(data)
        prompt()
    })
}

function viewAllRoles() {
    matrix.query('SELECT * FROM role', (err, data) =>{
        console.table(data)
        prompt()
    })
}

function viewAllEmployees() {
    matrix.query('SELECT * FROM employee', (err, data) =>{
        console.table(data)
        prompt()
    })
}

function viewEmployeeManagers() {
    matrix.query('SELECT first_name, last_name, manager_id FROM employee',
     (err, data) =>{
         console.table(data)
        
        prompt()
    })
}

function viewEmployeeDepartment() {
    matrix.query('SELECT name, id FROM department', (err, data) =>{
        const employeeDepart = data.map((department) =>{
            return {name: department.name, value: department.id}
        })
        inquirer.prompt([{
            type: 'list',
            name: 'employeeDepartment',
            message: 'Which department would you like to see?',
            choices: employeeDepart
        }])
        .then(function (data) {
            matrix.query("SELECT employee.first_name, employee.last_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;",
            data.employeeDepartment, (err, data) => {
                console.table(data)
                prompt()
            })
        })
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
        matrix.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);', [data.titlename, data.salarynumber, data.departmentid, 1])
        prompt()
    })
    })

}
  
function updateEmployeeRole () {
    //find all employees
    matrix.query('SELECT * FROM employee', (err, data) =>{
        console.table(data)
        inquirer.prompt([{
            type: 'list',
            name: 'whichEmployee',
            message: "What employee's role would you like to update?",
            choices: data.map(employee => {

            }),
          }])
    .then(answer => {
    //which new role do you want to assign
    matrix.query('SELECT * FROM role', (err, data) =>{
        console.table(data)
        inquirer.prompt([{
            type: 'list',
            name: 'updateEmRole',
            message: "which new role do you want to assign?",
            choices: data.map(role => {

            })
          }])
          .then(secondAnswer => {
            // Here is where you use "answer" and "secondAnswer" to update the employee role in the database
         })
        
    })
  


})}
)}


prompt();