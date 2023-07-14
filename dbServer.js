const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
var path = require('path');

require("dotenv").config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
   connectionLimit : 1000,
   connectTimeout  : 60 * 60 * 1000,
   acquireTimeout  : 60 * 60 * 1000,
   timeout         : 60 * 60 * 1000,

   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})


db.getConnection(function(err, connection) {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
});

const port = process.env.PORT;
//console.log(port);

app.listen(port, function(){
   console.log(`Server is running on http://localhost:${port}`)
});


const bcrypt = require("bcrypt");

app.use(express.json());
//middleware to read req.body.<params>

app.set('view engine', 'ejs');

/*app.get("/", (req, res) => {
   res.sendFile(__dirname + "/register.html");
}); */

app.get("/", (req, res) => {
   res.render('pages/dashboard');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("docs"));


//CREATE USER
app.post("/createUser", async (req,res) => {

   const restName = req.body.restaurantName;
   const user = req.body.usernamereg;
   const password = req.body.password;
   console.log(password);
   const hashedPassword = await bcrypt.hash(password, 10);
   console.log(hashedPassword);

   db.getConnection( async (err, connection) => {

      if (err) throw (err)

      const sqlSearch = "SELECT * FROM usertable WHERE username = ?"
      const search_query = mysql.format(sqlSearch,[user])

      const sqlInsert = "INSERT INTO usertable VALUES (0,?,?,?,?)"
      const insert_query = mysql.format(sqlInsert,[restName, user, hashedPassword, hashedPassword])
      // ? will be replaced by values
      // ?? will be replaced by string

      await connection.query (search_query, async (err, result) => {

         if (err) throw (err)
         console.log("------> Search Results")
         console.log(result.length)

         if (result.length != 0) {
            connection.release()
            console.log("------> User already exists")
            res.sendStatus(409) 
         } 
         else {
            await connection.query (insert_query, (err, result)=> {
            connection.release()
            if (err) throw (err)
            console.log ("--------> Created new User")
            console.log(result.insertId)
            //res.sendStatus(201)
            var data = {
               restName: restName,
               exists: true,
            }
            res.render('pages/dashboard', {data: data});
            });
         }
      }); //end of connection.query()
   }); //end of db.getConnection()
}); //end of app.post()

//LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res)=> {
   const user = req.body.username;
   const password = req.body.getPassword;
   console.log(password);
   db.getConnection(async (err, connection)=> {
      if (err) throw (err);
      const sqlSearch = "Select * from usertable where username = ?";
      const search_query = mysql.format(sqlSearch,[user]);
      await connection.query (search_query, async (err, result) => {
         connection.release();
         if (err) throw (err);
         if (result.length == 0) {
            console.log("--------> User does not exist");
            res.sendStatus(404);
         } else {
            const hashedPassword = result[0].password;
            //get the hashedPassword from result
            if (await bcrypt.compare(password, hashedPassword)) {
               console.log("---------> Login Successful");
               //res.send(`${user} is logged in!`);
               var data = {
                  restName: result[0].restaurantname,
                  exists: true,
               }
               console.log(data);
               res.render('pages/dashboard', {data: data});
            } 
            else {
               console.log("---------> Password Incorrect");
               res.send("Password incorrect!");
            } //end of bcrypt.compare()
         }//end of User exists i.e. results.length==0
      }); //end of connection.query()
   }); //end of db.connection()
}); //end of app.post()