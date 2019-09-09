
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// creating a connection for Mysql database
const connection = mysql.createConnection({
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
    connection.query("SELECT * FROM products", function(err) {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
          name: "options",
          type: "list",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"], 
          message: "What would you like to do?"
          },
        ])
        .then(function(answer) {
          switch(answer.options) {
            case 'View Products for Sale':
              viewProducts();
              break;

            case 'View Low Inventory':
              viewLowInventory();
              break; 

            case 'Add to Inventory':
              addInventory(); 
              break;

            case 'Add New Product':
              addNewProduct();
              break;
          }
        })
    })
  }

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'In Stock', 'Product Sales'],
      colWidths: [20, 50, 25, 10, 10, 25]
    });
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
      }
      console.log(table.toString());
      connection.end();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      var table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'In Stock', 'Product Sales'],
        colWidths: [20, 50, 25, 10, 10, 25]
      });
      for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity < 5) {
          table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
        }
      }
      console.log(table.toString());
      connection.end();
    });
}

function addInventory() {
  connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      inquirer
      .prompt([
        {
        name: "addMoreID",
        type: "number",
        message: "Enter the ID for the product you would like to add more quantity:"
        },
        {
        name: "addMoreAmount",
        type: "number",
        message: "How many would you like to add?"
        },
      ])
      .then(function(answer) {
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === answer.addMoreID) {
            chosenProduct = results[i];
          }
        }
        updatedStockQuantity = chosenProduct.stock_quantity + answer.addMoreAmount;
    
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: updatedStockQuantity 
            },
            {
              product_name: chosenProduct.product_name
            }
          ],
          function(err) {
            if (err) throw err;
            connection.end();
          }
        );
        console.log(chosenProduct.product_name + " stock quantity has been changed to " + updatedStockQuantity);
      })
    })
}

function addNewProduct() {
  inquirer
          .prompt([
            {
            name: "newProductName",
            type: "input",
            message: "Enter the name of new product you would like to add:"
            },
            {
            name: "newProductDept",
            type: "input",
            message: "Enter the name of new product's department:"
            },
            {
            name: "newProductPrice",
            type: "number",
            message: "How much does the new product cost?"
            },
            {
            name: "newProductQuantity",
            type: "number",
            message: "How many units of the new product will be available?"
            },
          ])
          .then(function(answer) {
            connection.query(
              "INSERT INTO products SET ?",
                {
                  product_name: answer.newProductName,
                  department_name: answer.newProductDept,
                  price: answer.newProductPrice,
                  stock_quantity: answer.newProductQuantity
                },
              function(err) {
                if (err) throw err;
                connection.end();
              }
            );
            console.log(answer.newProductName + " sucessfully added to the database!");
          })
}
