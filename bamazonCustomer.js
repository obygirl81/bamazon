
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
  showAllProducts(); 
});

function showAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    const table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'In Stock', 'Product Sales'],
      colWidths: [20, 50, 25, 10, 10, 25]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
    }
    console.log(table.toString());
  });
  whatToBuy();
}

function whatToBuy() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
        name: "productID",
        type: "number",
        message: "Enter the ID of the product you would like to buy:"
        },
        {
        name: "units",
        type: "number",
        message: "How many units would you like to buy?"
        }
      ])
      .then(function(answer) {
        var chosenProduct;
        var chosenProductPrice; 
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === answer.productID) {
            chosenProduct = results[i];
            chosenProductPrice = results[i].price;
          }
         
        }
        if (chosenProduct.stock_quantity < answer.units) {
          console.log("Insufficient quantity!");
        } else {
          console.log("Your order was placed sucessfully!");
          var updatedStockQuantity = chosenProduct.stock_quantity - answer.units;
          var updatedProductSales = answer.units * chosenProductPrice; 
        
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedStockQuantity, 
                product_sales: updatedProductSales.toFixed(2)
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
          var cost = answer.units * chosenProduct.price; 
          var shortenedCost = cost.toFixed(2);
          console.log("The total cost of your purcahse is: " + "$" + shortenedCost);
        }
      })
    })
}