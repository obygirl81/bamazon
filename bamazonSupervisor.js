
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// creating a connection for Mysql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connecting to Mysql server or database
connection.connect(function(err) {
  if (err) throw err;
  menuOptions(); 
});

function menuOptions() {
    connection.query("SELECT * FROM departments", function(err) {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
          name: "options",
          type: "list",
          choices: ["View Product Sales by Department", "Create New Department"], 
          message: "What would you like to do?"
          },
        ])
        .then(function(answer) {
          switch(answer.options) {
            case 'View Product Sales by Department':
              viewProductSales();
              break;

            case 'Create New Department':
              createDepartment();
              break; 
          }
        })
    })
  }

function viewProductSales() {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit " 
    query += "FROM bamazon_db.departments "
    query += "INNER JOIN products ON departments.department_name = products.department_name "
    query += "GROUP BY department_id";
    
     connection.query(query, function(err, res) {
        if (err) throw err;
        var tableTwo = new Table({
            head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
            colWidths: [25, 40, 30, 15, 10]
        });
          for (var i = 0; i < res.length; i++) {
              tableTwo.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
          }
          console.log(tableTwo.toString());
          connection.end();
    });
}

function createDepartment() {
  inquirer
  .prompt([
    {
    name: "newDepartmentName",
    type: "input",
    message: "Enter the name of new department you would like to add:"
    },
    {
    name: "newDepartmentOverhead",
    type: "number",
    message: "What is the total overhead cost for the new department?"
    },
  ])
  .then(function(answer) {
    connection.query(
      "INSERT INTO departments SET ?",
        {
          department_name: answer.newDepartmentName,
          over_head_costs: answer.newDepartmentOverhead
        },
      function(err) {
        if (err) throw err;
        connection.end();
      }
    );
    console.log(answer.newDepartmentName + " sucessfully added to the database!");
  })
}