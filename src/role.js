const inquirer = require("inquirer");
const connectDb = require("../db/connection");
require("console.table");

async function createRole() {
  //
  const connection = await connectDb();

  return inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the new role Title",
        name: "newTitle",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "newSalary",
      },
      {
        type: "input",
        message: "Please enter a valid department id",
        name: "newDepartmentId",
      },
    ])

    .then((answer) => {
      console.log(answer);
      connection
        .query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [
            answer.newTitle,
            parseInt(answer.newSalary),
            parseInt(answer.newDepartmentId),
          ],
          (req, res) => {
            console.log("ID " + answer.newTitle + " has been added");
          }
        )
        .catch((err) => {
          throw err;
        });
    });
}

async function getRoles() {
  const connection = await connectDb();

  const roles = await connection.execute("SELECT * from role;");

  return roles[0];
}

module.exports = {
  createRole,
  getRoles,
};
