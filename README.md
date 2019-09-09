# bamazon
Bamazon
This is a command-line web application for an Amazon-like storefront. It uses Node.js & MySQL to take in orders from customers and deplete stock from the store's inventory. This app will update inventory, it will track the individual product sales, and the total profits for each department. User at the manager level can check the low inventory, add to inventories, and add new products. Userrs at the supervisor level can view the products, the overhead costs, and the total profits for each department. Users can also create a new department.

Technologies utilized in this application are:
Git
GitHub
JavaScript
MySQL Workbench
Node.js
Node packages: inquirer, mysql, and cli-table

How to Use this Application:

Intiial Setup
User must ensure that Node.js and MySQL are installed on their machine or computer.
User must have the MySQL client ie MySQL Workbench installed on their computer. This will allow user to access and create the database.
Instruction:

Open the MySQL Workbench (or any MySQL client you use on your computer) and run the bamazon_db.sql code to create the database, createa the "products" and "departments" tables.
The open the Command Line Interpreter (CLI) and navigate to the folder/directory where you would like to save this file so that you can run this application.
Run git clone git@github.com:obygirl81/bamazon.git
Navigate to the directory of the file you cloned thus (cd bamazon).
Open the bamazon folder your code editor and add your MySQL password. This will allow user to link to the database (line 17 on each file).
User must run npm install to download all of the required node modules.
Run node bamazonCustomer.js in your CLI/Terminal and follow the prompts.
Run node bamazonManager.js in your CLI/Terminal and follow the prompts.
Run node bamazonSupervisor.js in your CLI/Terminal and follow the prompts.
Here is the link to check out this application: 