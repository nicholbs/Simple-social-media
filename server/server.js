"use strict";

import express from 'express';
import path from 'path';
import mysql from 'mysql';
import cors from 'cors'; //bypass authentisering på post request
import multer from 'multer'; //For form data til post express API
import fs from 'fs'; //brukes til filhåndtering
import {person} from './src/components/userClass.js'; //Import av brukerKlassen
const app = express();
const PORT = 8081;

app.listen(PORT, () => {
  console.log('Running...');
})

app.use(express.static(path.resolve() + '/server'));
app.use(express.urlencoded());  //parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());  //parse JSON bodies (as sent by API clients)
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
})); //Odd Bypass sikkerhetsmekanismer for post YOLO


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



var upload=multer();


//registrering av ny bruker
const multerDecode = multer(); //For å mota formData til post request
app.post('/registerUser',multerDecode.none(),function(req,res){
  const formData = req.body; //Lagrer unna formdata objekt
  console.log('form data', formData.email); //Skriver ut formdata objekt
  var regPers = new person(formData); //lager en ny person temp

  var userReg =  "INSERT INTO users (email, password, userType) VALUES ('"+regPers.email+"','"+regPers.password+"','user')"; //registrer en bruker
  //var dbSjekk = "SELECT COUNT(email) AS numberOfMatch FROM users WHERE email = 'zcrona@example.net'"
  var dbSjekk = "SELECT COUNT(email) AS numberOfMatch FROM users WHERE email = '"+regPers.email+"'"
 
  //Hvis inpud data frontend matcher
  if(regPers.matcingInfo()){

   db.query(dbSjekk, function (err, result) {
      if (err) 
        throw err;
        console.log(result[0].numberOfMatch); 
        //Hvis det er ingen oppforinger i db
       if(result[0].numberOfMatch ==0) {
         console.log("ingenMatch")
         db.query(userReg); //registrer bruker
         res.send("ok"); //send ok frontend
       }
       else {
         res.send("emailFinnes"); //hvis bruker finnes, send melding frontend
       }
      }); 
      
  }
  else{
    res.send("missMatch"); //hvis inpund data ikke matcher 
  }
  
  //TODO passord encryption
  

})


/*******************************************************************************
 * Function creates new "entry" inn MySql database
 * 
 * Values for entry is retrievew from the body of http request
 * body contains "formData" and its values is found with:
 * req.body."keyName"
 * The values from request are put into "sql" string with "query" format
 * Lastly the generated query is sent to database which creates the entry
 * 
 * @var upload - Decoder for formdata, necessary if request comes with formdata
 * @var sql - SQL string, in practice PHP, sent to database
 * @var db - connection to database
 * @var result - result from database query
 * @author Nicholas Bodvin Sellevaag
 ******************************************************************************/
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
 * Values for entry is retrieved from the body of http request
 * body contains "formData" and its values is found with:
 * req.body."keyName"
 * The values from request are put into "sql" string with "query" format
 * Lastly the generated query is sent to database which creates the entry
 * 
 * Notewhorty! Content-Type is specified to be of application/json, this
 * information can be seen in the response header while inside
 * browser->networking->requestName
 * 
 * 
 * @var sql - SQL string, in practice PHP, sent to database
 * @var db - connection to database
 * @var res - response sent to front end. Head of respone can contain
 * status codes, 400 for error, 200 for OK...
 * @author Nicholas Bodvin Sellevaag
 ************************************************************************/
app.get('/retrievePosts', function(req, res) {
console.log('Dette er app.post for /retrievePosts på server.js')   //log message available from docker extension->nodejs, right click and "View Logs"

var sql = 'SELECT * FROM posts';

db.query(sql, function (err, result) {
    if (err) {
    res.status(400).send('Error in database operation.');
    } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    }
  });
});


/************************************************************************
 * 
 * Notewhorty! Content-Type is specified to be of application/json, this
 * information can be seen in the response header while inside
 * browser->networking->requestName
 ***********************************************************************/
app.get('/getUsers', function (req, res) {

  db.query('SELECT * FROM users', function (err, result) {
    if (err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
});

//Heter properties for gitt forum
app.get('/f/:forum', function (req, res) {
  var forum = req.params.forum;
  db.query('SELECT * FROM forums WHERE name=\'' + forum + '\'', function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
});

//Henter alle posts for ett gitt forum
app.get('/p/:forum', function (req, res) {
  var forum = req.params.forum;
  db.query(`SELECT title, image, users.email FROM posts
            INNER JOIN users ON posts.uid = users.uid WHERE posts.forum = '${forum}'`, function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
  `SELECT title, image, users.email
FROM posts
INNER JOIN users
ON posts.uid = users.uid
WHERE posts.forum = '${forum}'`
});


var test;


app.post('/registerUserOLD',upload.none(),function(req,res){
  
  const formData = req.body; //Lagrer unna formdata objekt
  console.log('form data', formData.email); //Skriver ut formdata objekt
  test = new person;
  dbstring = ''
  //Flyttes inn i constructor
  test.email = formData.email;
  test.repeatEmail =formData.repeatEmail;
  test.password = formData.password;
  test.repeatPassword = formData.repeatPassword;
  //
  
  test.matcingInfo();
  
  
  
  res.send("MotattReq"); //sender respons til fetch api
})

/*
*Filopplastning
**/
/**
var uploadImage = multer(
  {dest: './src/images/userProfile'}
)
var type = uploadImage.single('file')

app.post('/profilePicUpload',type, function(req,res){
  console.log("hei");

})

*/
/**
var uploadImage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './src/images/userProfile');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var type = multer({storage:uploadImage}).single('file')

app.post('/profilePicUpload',type, function(req,res){
  console.log("hei");

})
**/
var imageName = 'test';
var navn;
var uploadImage = multer.diskStorage({
destination: './src/images/userProfile', //Hvor filen skal lagres
filename: function(req,file,cb){
  cb(null,imageName + path.extname(file.originalname));
  navn = imageName + path.extname(file.originalname);
  console.log(navn);
}


})
var type = multer({storage:uploadImage}).single('file')

app.post('/profilePicUpload',type, function(req,res){
  console.log("hei");

})