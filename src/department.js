// Get dependencies
const inquirer = require("inquirer");
const connectDb = require("../db/connection");
require("console.table");

// function to create departments
async function createDepartment() {
  // get connection to database
  const connection = await connectDb();

  // get inquirer to ask question
  return (
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter the new department name",
          name: "newName",
        },
      ])
      // then
      .then((answer) => {
        console.log(answer);
        // sent a query to database
        connection
          .query(
            // put the created department into the table
            "INSERT INTO department (name) VALUES (?)",
            [answer.newName],
            (req, res) => {
              console.log("ID " + answer.newName + " has been added");
            }
          )
          // if theres an error, show it
          .catch((err) => {
            throw err;
          });
      })
  );
}

// display departments table
async function getDepartments() {
  // connect to db
  const connection = await connectDb();

  // when connected select all from department table
  const departments = await connection.execute("SELECT * from department;");

  // display the data in the console
  return departments[0];
}

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
