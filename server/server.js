"use strict";

import express from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';
import cors from 'cors'; //bypass authentisering på post request
import multer from 'multer'; //For form data til post express API
import fs from 'fs'; //brukes til filhåndtering
import randomstring from 'randomstring'; //Randomgennerering filnavn
import {person} from './src/components/userClass.js'; //Import av brukerKlassen
import { stringify } from 'querystring';
import bcrypt from 'bcryptjs';
import { rejects } from 'assert';
import session from 'express-session';
// import { send } from 'process';

// import pkg from 'bcryptjs';

// const { hash } = pkg;


const app = express();
const PORT = 8081;
const multerDecode = multer(); //For å mota formData til post request

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

app.use(session({
  name: 'sid',    //custom name 'sid'
  resave: false,  //dont store sessions if they where never modified during request
  saveUninitialized: false,   //dont save new sessions that have no data
  secret: 'ssh!quiet,it\'asecret!',    //dummy string, i believe inside the coockie or whatever is shown in the browser
  
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, //How long the coockie is valid
    sameSite: true,   //Believe this says changes or anything regarding the coockie has to come from the same domain
    
  }

}))

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



const users = []; //Slett meg
app.post('/registerHashedUser',multerDecode.none(), async (req,res) => {
 console.log("Hei du er i registrerHashedUser")
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
    const formData = req.body; //Lagrer unna formdata objekt
    console.log('form data', formData.email); //Skriver ut formdata objekt
    var regPers = new person(formData); //lager en ny person temp

  
  var userReg =  "INSERT INTO users (email, password, userType) VALUES ('"+regPers.email+"','"+ hashedPassword +"','user')"; //registrer en bruker
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

  }
  catch {
    res.status(500).send()
  }
  

})





//Rekkefølgen blir helt feil, prøv å bruke middleware til app.post istedenfor å kalle på firstFunction og så secondFunction
app.post('/lolol',multerDecode.none(), function (req, res, next) {
  
  db.query('SELECT * FROM users', function (err, result) {
    if (err) {      //If the Sql query fails
      console.log("Det var en error i query")
      res.send("SQL did not work")    //Should put a warning in the response instead
    }
    else {

      JSON.stringify(result);
      console.log("------------------------Nytt Sok------------------------")

      var allUsers = Object.values(result);
      const found = allUsers.find(element => element.email == req.body.email); 
      

        if (found == null) {
          console.log("Cannot find user");
          console.log(req.body.email)

          res.send("Cannot find user " + req.body.email)
        }
        else {
          // console.log("Du er i post sin andre else");
          console.log("Funnet bruker: " + found.email)
          // console.log("Found user " + found.password);
          console.log("bruker hentet fra database: " + found.email)
          res.locals.foundPassword = found.password;
          res.locals.uid = found.uid;
          console.log("coockie id fra databasen er brukeren sin uid: " + found.uid);
          next()
        }

    }
  })
}, async function (req, res) {

  var passwordValid = false;
  console.log("Du er i async function ")
  await bcrypt.compare(req.body.password, res.locals.foundPassword).then(function(result) {
    if (result == true) {
      passwordValid = true
    }

  }).then(function() {

    if (res.locals.foundPassword != null) {
      if (passwordValid == true) {
        console.log("Success på matching av hash");
        console.log("Her er foundUserPass i if setningen" + res.locals.foundPassword);
        req.session.userId = res.locals.uid;
        res.session.cookie.uid = "testingMe";
        res.cookie("myCoockie", "testing", {maxAge:3600});
        res.send("Success på matching av hash");
      }
      else {
        console.log("Failed på matching av hash");
        res.send("Failed på matching av hash")
        

      }
    }
    else {
      console.log("foundUserPassword var tom");
      res.send("Failed, passordet var tomt");
    }

  })
  
  

})



 


//registrering av ny bruker

app.post('/registerUser',multerDecode.none(),function(req,res){

  const formData = req.body; //Lagrer unna formdata objekt
  console.log('form data', formData.email); //Skriver ut formdata objekt
  var regPers = new person(formData); //lager en ny person temp

  var userReg =  "INSERT INTO users (email, password, userType) VALUES ('"+regPers.email+"','"+ regPers.password +"','user')"; //registrer en bruker
  //var dbSjekk = "SELECT COUNT(email) AS numberOfMatch FROM users WHERE email = 'zcrona@example.net'"
  var dbSjekk = "SELECT COUNT(email) AS numberOfMatch FROM users WHERE email = '"+regPers.email+"'"
 
  //Hvis inpud data frontend matcher
  if(regPers.matcingInfo() && regPers.validateInput()){
    regPers.validateInput();

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
            INNER JOIN users ON posts.uid = users.uid 
            WHERE posts.forum = '${forum}'`, function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
});

//Henter alle posts som matcher søkekriteriet
app.get('/s/:keyword', function (req, res) {
  var keyword = req.params.keyword;
  db.query(`SELECT title, image, users.email FROM posts
            INNER JOIN users ON posts.uid = users.uid 
            WHERE title LIKE '%${keyword}%' OR content LIKE '%${keyword}%'`, function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
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




/**
 * Uploading of pictures
 */

var imageName;
var uploadImage = multer.diskStorage({
destination: './src/images/userProfile', //Hvor filen skal lagres
filename: function(req,file,cb){
  let navnTemp; //brueks til a lagre randomstring
  navnTemp =randomstring.generate(); //Generer et random stringNavn
  imageName = navnTemp + path.extname(file.originalname); //Appender filextention
 cb(null,imageName); //Setter filnavnet
}

})

const fileFilter2 = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
    req.fileValidationError = "Forbidden extension";
    return cb(null, false, req.fileValidationError);
  }
}


app.post('/profilePicUpload', (req, res) => {
  //DymmyData for test, når coockes er implementert må det endres litt
  
  //Definerer hva multer skal gjøre 
  let upload = multer({ storage: uploadImage, fileFilter:fileFilter2}).single('file');

  upload(req, res, function(err) {
    console.log( "under oplaod" + imageName);
    //Errorhandling logic from multer: https://github.com/expressjs/multer
    //specific error in multer
    if(err instanceof multer.MulterError){
      res.send("errorMulter")
      console.log( "under feil" + imageName);
    }
    //unspecific error
    else if(err){
      res.send("errorUnspecifed")
      console.log( "under andre feil" + imageName);
    }
    else if(req.fileValidationError){
      console.log("Ikke gyldig fil");
      //res.send("errorFileExt");
    }
    //thing okay with multer then 
    else{
      //Her skal data legges i DB
      console.log( "riktig     " + imageName);
     /* Hvis BLOB
      var nam = fs.readFileSync("./src/images/userProfile/test.png")
      db.query('UPDATE users SET picture=? WHERE uid = 24',nam), function(err,results){
        if(err){
          console.log(err);
        }
      }
      **/
      var imageurl = 'http://localhost:8081/images/'
     var imageNamehttp = imageurl.concat(imageName);
      //bruk imageName bare for navn og ikke sti

      /** */
      //Setter inn navn i db, UID må endres nor coocikes er implementert
     db.query('UPDATE users SET profilepic=? WHERE uid = 8',[imageNamehttp], function(err,results){
      if(err){
        console.log(err);
      } else{
        //res.send("ok");  //picture uploded sucefully
        console.log("fil registrert");
           res.send("ok");  //picture uploded sucefully

      }
    });
   // res.send("ok");
    }
  
});

});

/**
 * Get single picture
 */

app.get('/profilepic', function (req, res) {
  var uid2 = 20; //bare for test må erstates med authentisert uid
 var tempPath = '/server/src/images/userProfile/' //path to folder
  
 db.query('SELECT profilepic FROM users WHERE uid =?',[uid2], function (err, result) {
  if (err) 
    throw err;
    //Hvis det er ingen oppforinger i db
   else {
     tempPath = tempPath.concat(result[0].profilepic); //setter sammen bildetsti
    console.log(tempPath);
    res.sendFile(tempPath); //sender bildet frontend
   }
  }); 

});

/** 
 * Get hole pictureFolder
 * Bildepublisering lettest måte kan nås via http://localhost:8081/images/<navnPåBildet>.extention 
 * eks http://localhost:8081/images/test.png
 *  */

app.use('/images', express.static('/server/src/images/userProfile/'));
