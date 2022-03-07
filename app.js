// Get inquirer dependency
const inquirer = require("inquirer");
// Pull functions from department.js file
const { getDepartments, createDepartment } = require("./src/department");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
} = require("./src/employee");
const { getRoles, createRole } = require("./src/role");

function askUser() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please choose an option.",
        choices: [
          "View All Departments",
          "View All Employees",
          "View All Roles",
          "Add Department",
          "Add Employee",
          "Add Role",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])

    .then(async (answers) => {
      if (answers.option === "Exit") {
        process.exit(0);
      }

      if (answers.option === "View All Departments") {
        await getDepartments();
      }

      if (answers.option === "View All Employees") {
        console.table(await getEmployees());
      }

      if (answers.option === "View All Roles") {
        console.table(await getRoles());
      }

      if (answers.option === "Add Department") {
        await createDepartment();
      }

      if (answers.option === "Add Role") {
        await createRole();
      }
      if (answers.option === "Add Employee") {
        await createEmployee();
      }
      if (answers.option === "Update Employee Role") {
        await updateEmployee();
      }
      askUser();
    });
}

askUser();
