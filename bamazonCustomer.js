// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// creating the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server
connection.connect(function(err) {
	if (err) throw err;
	// testing
	console.log("connected as id " + connection.threadId + "\n");

	// readProducts();
	// customerPurchase();
	customerStart();
});

// readProducts function will display entire products table from bamazon_db
function readProducts() {
	console.log("Showing all bamazon products...\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

		for (var i = 0; i<res.length; i++) {
			console.log("----------------------------");
			console.log("Item ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name
			 + "\nDepartment Name: " + res[i].department_name + "\nPrice: " + res[i].price
			 + "\nQuantity In Stock: " + res[i].stock_quantity);
		}
		customerStart();
		// connection.end();
	});
}

function customerStart() {
inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [BUY] an item or [VIEW] our inventory?",
      choices: ["BUY", "VIEW"]
    })
    .then(function(answer) {
    	
    	if (answer.postOrBid.toUpperCase() === "VIEW") {
    		readProducts();
    	}
    	else {
    		// console.log("test");
    		customerPurchase();
    	}
    });
}

// function which prompts the user for which product they'd like to purchase
function customerPurchase() {
	inquirer
		.prompt([
			{
				name: "item_id",
				type: "input",
				message: "What is the item id of the product you'd like to purchase?"
			},
			{
				name: "purchaseQty",
				type: "input",
				message: "How many would you like to purchase?",
				validate: function(value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		])
		.then(function(answer){
			// testing...
			// console.log(answer.item_id);
			// console.log(answer.purchaseQty);

			
			connection.query("SELECT * FROM products", function(err, results) {
				if (err) throw err;

				// this works and returns entire products table...
				// console.log(results);

				for (var i = 0; i<results.length; i++) {
					// this also works...
					// console.log(results[i].item_id);
					// console.log(answer.item_id);

					// number
					// console.log(typeof(results[i].item_id));
					// // string
					// console.log(typeof(answer.item_id));
					// // number
					// console.log(typeof(parseInt(answer.item_id)));

					if (results[i].item_id === parseInt(answer.item_id)) {
						console.log("You chose: " + results[i].product_name);

						// testing
						// console.log(results[i].stock_quantity);
						// console.log(answer.purchaseQty);

						// determine if store has sufficient quantity to complete the transaction...
						if (results[i].stock_quantity > answer.purchaseQty){
							var updatedQty = results[i].stock_quantity - answer.purchaseQty;
							var transactionCost = results[i].price * answer.purchaseQty;
							// console.log(transactionCost);

							// update the db
							connection.query(
								"UPDATE products SET ? WHERE ?",
								[
									{
										stock_quantity: updatedQty
									},
									{
										item_id: answer.item_id
									}
								],
								function(error) {
									if (error) throw err;
									console.log("Sufficient quantity in stock. That'll cost $" + transactionCost);
									customerStart();
								}
							);
						}
						else {
							console.log("Sorry, insufficient quantity in stock. We can't fulfill your order.");
							customerStart();
						}

					}
				}
			})
		});
}










