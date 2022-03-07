// CRUD
const inquirer = require("inquirer");
const connectDb = require("../db/connection");
require("console.table");

async function createDepartment() {
  const connection = await connectDb();

  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the new department name",
        name: "newName",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection
        .query(
          "INSERT INTO department (name) VALUES (?)",
          [answer.newName],
          (req, res) => {
            console.log("ID " + answer.newName + " has been added");
            connection.end();
          }
        )
        .catch((err) => {
          throw err;
        });
    });
}

async function getDepartments() {
  const connection = await connectDb();

  const departments = await connection.execute("SELECT * from department;");

  console.table(departments[0]);

  connection.end();
}

// future
// function updateDepartment(id, payload) {
//
// }

async function deleteAllDepartments() {
  const db = await connectDb();
  await db.query("SET FOREIGN_KEY_CHECKS=0");
  const results = await db.execute("TRUNCATE `departments`");
  await db.execute("SET FOREIGN_KEY_CHECKS=1;");
  return results;
}

module.exports = {
  createDepartment,
  getDepartments,
  deleteAllDepartments,
};
