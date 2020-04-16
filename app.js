const inquirer = require("inquirer");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "Taheahtzi7",
    database: "EmployeeTrackerDB"
});

const dre = ['Department', 'Role', 'Employee'];

const question = [{
    type: 'list',
    name: 'crud',
    message: 'What what would you like to do?',
    choices: ['Add', 'View', 'Update', 'Delete']
}];



const inputInfo = [
    {
        type: 'input',
        name: 'Name',
        message:'Enter First and Last name:',
    },

    {
        type: 'number',
        name: 'ID',
        message: 'Enter employee\'s ID:',
    },

    {
        type: 'input',
        name: 'Email',
        message: 'Enter employee\'s Email:',
    },
];

const inputMan = [
    ...inputInfo,
    {
        type: 'number',
        name: 'OfficeNumber',
        message: 'Enter Office Number:',
    },
];

const inputEng = [
    ...inputInfo,
    {
        type: 'input',
        name: 'GitHub',
        message: 'Enter GitHub username:',
    },
];

const inputIntrn = [
    ...inputInfo,
    {
        type: 'input',
        name: 'School',
        message: 'Enter Intern\'s school:',
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
        switch (res.addDre){
            case "Department":
                console.log('Department was chosen');
                another(crudAns, questionCrud);
                break;
            case "Role":
                console.log('Role was chosen')
                another(crudAns, questionCrud);
                break;
            case "Employee":
                console.log('Employee was chosen')
                another(crudAns, questionCrud);
                break;
        }
    })
};
/*function questionView() {
    inquirer.prompt({
        type:'list',
        name: 'addDre',
        message: 'What would would you like to add?',
        choices:    [...dre]
    }).then(res => {
        switch (res.addDre){
            case "Department":
                console.log('Department was chosen');
                another('Add', questionView);
                break;
            case "Role":
                console.log('Role was chosen')
                another('Add', questionView);
                break;
            case "Employee":
                console.log('Employee was chosen')
                another('Add', questionView);
                break;
        }
    })
};
function questionUpdate() {
    inquirer.prompt({
        type:'list',
        name: 'addDre',
        message: 'What would would you like to add?',
        choices:    [...dre]
    }).then(res => {
        switch (res.addDre){
            case "Department":
                console.log('Department was chosen');
                another('Add', questionUpdate);
                break;
            case "Role":
                console.log('Role was chosen')
                another('Add', questionUpdate);
                break;
            case "Employee":
                console.log('Employee was chosen')
                another('Add', questionUpdate);
                break;
        }
    })
};
function questionDelete() {
    inquirer.prompt({
        type:'list',
        name: 'addDre',
        message: 'What would would you like to add?',
        choices:    [...dre]
    }).then(res => {
        switch (res.addDre){
            case "Department":
                console.log('Department was chosen');
                another('Add', questionDelete);
                break;
            case "Role":
                console.log('Role was chosen')
                another('Add', questionDelete);
                break;
            case "Employee":
                console.log('Employee was chosen')
                another('Add', questionDelete);
                break;
        }
    })
};
*/
inqFunc();


