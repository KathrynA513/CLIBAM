var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Your password goes below
  password: "",
  database: "bamazon"
});
startUp();
function startUp(){

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      var muhData = result[i];
      console.log("\n" + "Item ID: " + muhData.item_id +  "||" + " Item Name: "  + "||" + muhData.product_name + "||" +" Price: " + muhData.price);
    }
  });
})

inquirer.prompt([
{
  type: "input",
  message: "\n" + "Do you want to buy an item? Type Y to buy an item",
  name: "Question"
}
])
.then(function(PromptResponse){
  if (PromptResponse.Question.toUpperCase() === "Y") {
  	itemPurchase()
  } else {
  	console.log( "\n" + "No? Then, Goodbye.")
  	process.exit();
  }
})
} //end of start up function
function itemPurchase(){
  inquirer.prompt([
    {
       type: "input",
       message: "\n" + "What is the ID of the item you wish to buy?",
       name: "PrID"
    },
    {
       type: "input",
       message: "\n" + "How many of the item  do you wish to buy?",
       name: "PrQuan"
    }
  ])
  .then(function(result){
    var ID = result.PrID;
    var Quantity = result.PrQuan;
    //passing values to determine the purchase 
    determinePurchase(ID, Quantity)
  })
} //end of item purchase query function
function determinePurchase(ID, Quantity){
  connection.query("Select * FROM products WHERE ?", {item_id : ID}, function(err, values){
    if (err) {
      throw err;
    }
    else {
      if (values[0].stock_quantity < 1){
        console.log("Oops! We're all out of that product!")
      }
      else{
        var purchaseAmount = values[0].price * Quantity;
        var forUpdateQuanity = values[0].stock_quantity - Quantity;
        var SQLquery = "UPDATE products SET stock_quantity= "  + forUpdateQuanity + "WHERE item_id = " + ID;
        console.log("You've bought "+ Quantity + "item(s)"+ "Total is: " + purchaseAmount);
        console.log("\n" + "New Inventory amount is: " + forUpdateQuanity);
          inquirer.prompt([
            {
              type: "input",
              message: "\n" + "Do you want to confirm your purchase? Type Y to confirm",
              name: "Question2"
            }
          ])
          .then(function(PromptResponse){
            if (PromptResponse.Question2.toUpperCase() === "Y") {
              connection.query(SQLquery, function(Quantity){
                console.log(values[0].stock_quantity)
              })
            } 
          else {
            startUp();
          }
        })
      }
   }
})
}

