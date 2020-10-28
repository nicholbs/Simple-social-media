"use strict";

import express from 'express';
import path from 'path';
import mysql from 'mysql';
<<<<<<< HEAD

=======
import cors from 'cors'; //bypass authentisering på post request
import multer from 'multer'; //For form data til post express API
>>>>>>> 88b72e1f7b5061d75373610ea9db71f8128dcb59
const app = express();
const PORT = 8081;

app.listen(PORT, () => {
  console.log('Running...');
})

app.use(express.static(path.resolve() + '/server'));
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

//Henter alle posts for ett gitt forum
app.get('/f/:forum', function (req, res) {
  var forum = req.params.forum;
  db.query('SELECT * FROM posts WHERE forum=\'' + forum + '\'', function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(result));
    }
  });
});

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


//registrering av ny bruker
const upload = multer(); //For å mota formData til post request
app.post('/registerUser',upload.none(),function(req,res){
  
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
