"use strict";

import express from 'express';
import path from 'path';
import mysql from 'mysql';
import cors from 'cors'; //bypass authentisering på post request
import multer from 'multer'; //For form data til post express API
import { resourceUsage } from 'process';
const app = express();
const PORT = 8081;

app.listen(PORT, () => {
  console.log('Running...');
})

app.use(express.static(path.resolve() + '/server'));
app.use(express.urlencoded());  //parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());  //parse JSON bodies (as sent by API clients)
app.use(cors()); //Odd Bypass sikkerhetsmekanismer for post YOLO


var db = mysql.createConnection({
  host: "db",
  user: "admin",
  password: "password",
  database: 'prog2053-proj'
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send("Hello world");
})



// Eksporteres til en annen fil etterhvert -odd
class person{
  constructor(){
    this.email;
    this.repeatEmail;
    this.password;
    this.repeatPassword;
  }
  matcingInfo(){
    //Sjekker at registeringscredentals matcher
    if((this.email === this.repeatEmail) && this.password === this.repeatPassword){
      console.log('Match');
      return true;
    }
    else {
      console.log('noMatch');
      return false;
    }
  }
}
var test;
var upload=multer();

//registrering av ny bruker
const multerDecode = multer(); //For å mota formData til post request
app.post('/registerUser',multerDecode.none(),function(req,res){
  const formData = req.body; //Lagrer unna formdata objekt
  console.log('form data', formData.email); //Skriver ut formdata objekt
  var regPers = new person;
  //Flyttes inn i constructor
  regPers.email = formData.email;
  regPers.repeatEmail =formData.repeatEmail;
  regPers.password = formData.password;
  regPers.repeatPassword = formData.repeatPassword;
  var userReg =  "INSERT INTO users (email, password, userType) VALUES ('"+regPers.email+"','"+regPers.password+"','user')"; //registrer en bruker
  //
  db.query(userReg);
  
  regPers.matcingInfo();
  
  
  
  res.send("MotattReq"); //sender respons til fetch api
})


/*************************************************************************
 * Function creates new "entry" inn MySql database
 * 
 * Values for entry is retrievew from the body of http request
 * body contains "formData" and its values is found with:
 * req.body."keyName"
 * The values from request are put into "sql" string with "query" format
 * Lastly the generated query is sent to database which creates the entry
 * 
 * @author Nicholas Bodvin Sellevaag
 ************************************************************************/
app.post('/createPost', upload.none(), function(req, res) {
console.log('Dette er app.post for /createPost på server.js')   //log message available from docker extension->nodejs, right click and "View Logs"

var sql = "INSERT INTO posts (user, title, content) VALUES ('2', '" + req.body.postName + "', '" + req.body.postContent + "')";

db.query(sql, function (err, result) {
    if (err) 
      throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });

res.send("Req ble mottat");   //response sent to front-end as pure html

})


/*************************************************************************
 * Function creates new "entry" inn MySql database
 * 
 * Values for entry is retrievew from the body of http request
 * body contains "formData" and its values is found with:
 * req.body."keyName"
 * The values from request are put into "sql" string with "query" format
 * Lastly the generated query is sent to database which creates the entry
 * 
 * @author Nicholas Bodvin Sellevaag
 ************************************************************************/
app.get('/retrievePosts', function(req, res) {
console.log('Dette er app.post for /retrievePosts på server.js')   //log message available from docker extension->nodejs, right click and "View Logs"

var sql = 'SELECT * FROM posts';

db.query(sql, function (err, result) {
    if (err) {
    // res.setHeader("Content-Type", "application/json");
    // res.writeHead(404);
   
   
   
    res.status(400).send('Error in database operation.');
    } else {
    // res.setHeader("Content-Type", "application/json");
    // res.writeHead(200);
    // res.end(JSON.stringify(result));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    // console.log("Result: " + res.body;
    }
  });
// res.send(result);
// res.send("Req ble mottat");   //response sent to front-end as pure html
});

app.get('/getUsers', function (req, res) {

  db.query('SELECT * FROM users', function (err, result) {
    if (err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      //console.log("Result: " + res);
    }
  });
});
