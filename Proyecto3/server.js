require('dotenv').config()
const mysql = require('mysql');
const express = require("express");
const BodyParser =  require("body-parser");


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database: 'accounts',
    port: '3306'
});



const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post('/v1/user/signup',(req,res)=>{
    var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		connection.query('INSERT INTO accounts (email, password) VALUES(?,?)', [email, password], function(error, results, fields) {
            if(error){
				res.status(400).send('Error!');
				console.log(error);
            }
            else{
                res.status(200).send("User Account Created");
            }		
            res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.post('/v1/user/login',(req,res)=>{
    var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				res.status(200).send("User Logged In");
			} else {
				res.status(400).send('Incorrect Email and/or Password!');
			}			
            res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

const server = app.listen(process.env.PORT || 3000, () => {
   connection.connect(function(err) {
		if (err) throw err;  
		console.log("Connected!");  
		/* CREAR DATABASE
		 connection.query("CREATE DATABASE accounts", function (err, result) {  
		if (err) throw err;  
		console.log("Database created");
		});   */
		/* CREAR TABLA
		connection.query('CREATE TABLE accounts (email VARCHAR(255), password VARCHAR(255))', function (err, result) {
			if (err) throw err;
			console.log("Table created");
		  });*/
	});  
    console.log(`Listening on port ${server.address().port}`);
  });