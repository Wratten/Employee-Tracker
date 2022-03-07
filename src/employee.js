// Get dependencies
const inquirer = require("inquirer");
const connectDb = require("../db/connection");
const { getRoles } = require("./role");
require("console.table");

async function createEmployee() {
  // connect to db
  const connection = await connectDb();
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the first name of the new employee",
        name: "newFirstName",
      },
      {
        type: "input",
        message: "Please enter the last name of the new employee",
        name: "newLastName",
      },
      {
        type: "input",
        message: "Please enter a new valid role Id",
        name: "newRoleId",
      },
      {
        type: "input",
        message: "Please enter a new valid Manager Id",
        name: "newManagerId",
      },
    ])

    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.newFirstName,
          answer.newLastName,
          parseInt(answer.newRoleId),
          parseInt(answer.newManagerId),
        ],
        (req, res) => {
          console.log("ID " + answer.newFirstName + "has been added");
          connection.end();
          return res;
        }
      );
    });
}

async function getEmployees() {
  const connection = await connectDb();

  const employees = await connection.execute("SELECT * from employee;");

  return employees[0];
}

async function updateEmployee() {
  const connection = await connectDb();
  const employees = await getEmployees();
  const roles = await getRoles();
  const inquirerChoicesRoles = roles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  const inquirerChoicesId = employees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });

  return inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmployeeId",
        message: "Which employee do you want to update?",
        choices: inquirerChoicesId,
      },
      {
        type: "list",
        name: "updateEmployeeRole",
        message: "Which role do you want to update to?",
        choices: inquirerChoicesRoles,
      },
    ])
    .then((answer) => {
      console.log(answer);
      return connection.query(
        "UPDATE `employees_db`.`employee` SET `role_id` = '?' WHERE (`id` = '?');",
        [answer.updateEmployeeRole, answer.updateEmployeeId]
      );
    });
}

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
};
