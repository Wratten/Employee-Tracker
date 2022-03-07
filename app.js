// Get inquirer dependency
const inquirer = require("inquirer");

// Pull functions from department.js file
const { getDepartments, createDepartment } = require("./src/department");

// Pull functions from employee.js file
const {
  getEmployees,
  createEmployee,
  updateEmployee,
} = require("./src/employee");

// Pull functions from role.js file
const { getRoles, createRole } = require("./src/role");

// askUser function
function askUser() {
  // Get inquirer
  return (
    inquirer
      // Prompt user with list of questions on what they want to do
      .prompt([
        {
          type: "list",
          name: "option",
          message: "What would you like to do?",
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

      // Get answer
      .then(async (answers) => {
        if (answers.option === "Exit") {
          // exit the terminal
          process.exit(0);
        }

        if (answers.option === "View All Departments") {
          // use the imported getDepartments function to get and display the departments in a table, and don't continue until the data is ready and displayed
          console.table(await getDepartments());
        }

        if (answers.option === "View All Employees") {
          // use the imported getEmployees function to get and display the employees in a table, and don't continue until the data is ready and displayed
          console.table(await getEmployees());
        }

        if (answers.option === "View All Roles") {
          // use the imported getRoles function to get and display the roles in a table, and don't continue until the data is ready and displayed
          console.table(await getRoles());
        }

        if (answers.option === "Add Department") {
          // use the imported createDepartment function to prompt the user on what they'd like to add, then add it to the table, and don't continue until the data is ready and added
          await createDepartment();
        }

        if (answers.option === "Add Role") {
          // use the imported createRole function to prompt the user on what they'd like to add, then add it to the table, and don't continue until the data is ready and added
          await createRole();
        }

        if (answers.option === "Add Employee") {
          // use the imported createEmployee function to prompt the user on what they'd like to add, then add it to the table, and don't continue until the data is ready and added
          await createEmployee();
        }
        if (answers.option === "Update Employee Role") {
          // use the imported getDepartments function to ask the user on who's role they'd like to change and what to, and update the data in a table, and don't continue until the data is ready and displayed
          await updateEmployee();
        }

        // ask the question on what the user would like to do after an answer to any of the previous questions is selected
        askUser();
      })
  );
}

// ask the user the initial questions on running the app
askUser();
