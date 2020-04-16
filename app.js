const inquirer = require("inquirer");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "Taheahtzi7",
    database: "EmployeeTrackerDB"
});

connection.connect((err) =>{
    if (err) throw err;
    inqFunc()
})
const dre = ['Department', 'Role', 'Employee'];

const question = [{
    type: 'list',
    name: 'crud',
    message: 'What what would you like to do?',
    choices: ['Add', 'View', 'Update', 'Delete']
}];

const inputDep = [
    {
        type: 'input',
        name: 'depName',
        message: 'Enter Department Name:',
    },
];

const inputRole = [
    {
        type: 'input',
        name: 'title',
        message:'Enter Title:',
    },

    {
        type: 'number',
        name: 'salary',
        message: 'Enter starting salary:',
    },

    {
        type: 'input',
        name: 'depID',
        message: "Enter Department's ID:",
    },
];

const inputEmp = [
    {
        type: 'input',
        name: 'firstName',
        message: "Enter Employee's First Name:"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter Employee's Last Name:"
    },
    {
        type: 'number',
        name: 'roleID',
        message: "Enter Employee's Role ID:"
    },
    {
        type: 'input',
        name: 'managerID',
        message: "Enter Employee's Manager's ID:"
    },

];



function inqFunc(){
    inquirer.prompt(question).then((answer) => {
        let crudAns = answer.crud
        questionCrud(crudAns);
})
};
function another(crudAns, cb){
    inquirer.prompt({
        type: 'confirm',
        name: "Another",
        message:`${crudAns} another?`
    }).then((answer) =>{
        if(!(answer.Another)){
            inquirer.prompt({
                type: 'confirm',
                name: "returntoMM",
                message:`Would you like to return to the main menu?`
            }).then(ans => {
                if(!(ans.returntoMM)){
                console.log('Thank you for using Employee Tracker!')
                connection.end();
                }else{inqFunc();}
            })
        }else{cb(crudAns);}
    })
};

function questionCrud(crudAns) {
    inquirer.prompt({
        type:'list',
        name: 'addDre',
        message: `What would would you like to ${crudAns}?`,
        choices:    [...dre]
    }).then(res => {
        console.log(`${res.addDre} was chosen`);
        switch (crudAns){
            case "Add":
                    addToTable(crudAns ,res.addDre);
                break;
            case "View":
                break;
            case "Update":
                break;
            case "Delete":
                break;
        }
    })
};

function addToTable(crudAns, table){
    switch (table){
        case 'Department':
            inquirer.prompt(inputDep).then(res => {
                connection.query(`INSERT INTO ${table}(name) VALUES ("${res.depName}")`, (err, results) => {
                    if(err) throw err;
                    console.log(`${results.affectedRows} items inserted!`);
                    another(crudAns, questionCrud);

                });

            });

            break;
        case 'Role':
            inquirer.prompt(inputRole).then(res => {
            connection.query(`INSERT INTO ${table}(Title, Salary, Department_ID) VALUES ("${res.title}", ${res.salary}, ${res.depID})`, (err, results) => {
                if(err) throw err;
                console.log(`${results.affectedRows} items inserted!`);
                another(crudAns, questionCrud);

            });
            });
            break;
        case 'Employee':
            inquirer.prompt(inputEmp).then(res => {
            connection.query(`INSERT INTO ${table}(First_Name, Last_Name, Role_ID, Manager_ID) VALUES ("${res.firstName}", "${res.lastName}", ${res.roleID}, ${res.managerID || null})`, (err, results) => {
                if(err) throw err;
                console.log(`${results.affectedRows} items inserted!`);
                another(crudAns, questionCrud);

            })
            });
            break;
    }
}
/*
scratch area



*/
