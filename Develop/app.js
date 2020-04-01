const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
inquirer.prompt({
    type: 'list',
    name: 'Role',
    message: 'Select employee\'s role',
    choices: ['Manager', 'Engineer', 'Intern']
}).then((answer) => {
    if(answer.Role === 'Manager'){
        inquirer.prompt(inputMan).then((ans) => {
            console.log('manager was chosen');
            const newManager = new Manager(ans.Name, ans.ID, ans.Email, ans.OfficeNumber)
            console.log(newManager);
        })
    }else if(answer.Role === 'Engineer'){
        inquirer.prompt(inputEng).then((ans) => {
            const newEngineer = new Engineer(ans.Name, ans.ID, ans.Email, ans.GitHub);
            console.log(newEngineer);
        })
    }else if(answer.Role === 'Intern'){
        inquirer.prompt(inputIntrn).then((ans) => {
            const newIntern = new Intern(ans.Name, ans.ID, ans.Email, ans.School)
            console.log(newIntern)
        })
    }
})
};
inqFunc()