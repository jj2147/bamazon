var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
});


function post(callback){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        // console.log(JSON.stringify(results));

        var t = new Table;

        results.forEach(function(i) {
            t.cell('item_id', i.item_id);
            t.cell('product_name', i.product_name);
            t.cell('department_name', i.department_name);
            t.cell('price', i.price);
            t.cell('stock_quantity', i.stock_quantity);

            t.newRow();
        });

        console.log(t.toString());
        callback();
    });
}


function inquire(){
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the item_id of your item.",
            validate: function(value) {
                if(isNaN(value)) return false;
                return true;            
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many?",
            validate: function(value) {
                if(isNaN(value)) return false;
                return true;            
            }
        }
    ]).then(function(answer){
        connection.query("SELECT * FROM products WHERE item_id = " + answer.item, function(err, results) {
            if (err) throw err;
            
            if(parseInt(answer.quantity) <= results[0].stock_quantity){
                connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                [answer.quantity, answer.item],
                function(err1, results1){
                    console.log("your total is $" + (results[0].price * parseInt(answer.quantity)));

                    again();                    
                });
            }else{
                console.log("not enough stock");
                inquire();
            }            
        });
    });
}



function again(){
    inquirer.prompt([
    {
        name: "again",
        type: "confirm",
        message: "Buy another?",
    }]).then(function(answer){
        if(answer.again){
            post(function(){ inquire(); });
        }else{
            process.exit(0);
        }    
    });
}


post(function(){
    inquire();
});
