// CRUD
const inquirer = require("inquirer");
const connectDb = require("../db/connection");
require("console.table");

/**
 * Create a new Role in db
 * @param {String} Title
 * @param {String} salary
 * @param {number} roleId
 */
async function createRole() {
  //
  const connection = await connectDb();

  inquirer
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

/**
 * getting all Roles from db
 */

async function getRoles() {
  const connection = await connectDb();

  const roles = await connection.execute("SELECT * from role;");

  return roles[0];
}

// future
// function updateRole(id, payload) {
//
// }

module.exports = {
  createRole,
  getRoles,
};
