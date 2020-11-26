"use strict";

import express, { json } from 'express';
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
import cookieParser from 'cookie-parser';


const app = express();
const PORT = 8081;
const multerDecode = multer(); //For å mota formData til post request



app.listen(PORT, () => {
  console.log('Running...');
})

app.use(express.static(path.resolve() + '/server'));
app.use(express.urlencoded());  //parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());  //parse JSON bodies (as sent by API clients)
app.use(cookieParser('abcdef-12345'));
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
})); //Odd Bypass sikkerhetsmekanismer for post YOLO
// app.use(auth)      //Alle forespørsler til back-end må autentiseres
// app.use(session({
//   name:'session-id',
//   secret:'123456',
//   saveUninitialized: false,
//   resave: false
// }))

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
  console.log("Hei er dette back-end")
  res.send("Hello world");
})

var upload=multer();


/******************************************************** */
function auth(req, res, next) {
  if(!req.signedCookies.user) {

    var authHeader = req.headers.authorization;
    console.log("-----------Auth header " + authHeader)

    if (!authHeader) {
      console.log("------------------------Nå er du i !autheader")
      var err = new Error("--------You are not authenticated--------");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
    
    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
    var username = auth[0];
    var password = auth[1];
    
        db.query('SELECT * FROM users', function (err, result) {
          if (err) {      //If the Sql query fails
            console.log("Det var en error i query")
            res.send("SQL did not work")    //Should put a warning in the response instead
          } else {
            JSON.stringify(result);
            console.log("------------------------Nytt Sok------------------------")
      
            var allUsers = Object.values(result);
            const found = allUsers.find(element => element.username == username); 
            
            if (found == null) {
              console.log("Cannot find user with username " + username);
              res.setHeader("WWW-Authenticate", "Basic");
              // res.send("Cannot find user " + username)
              var err = new Error("-------You are not authenticated----------");
              err.status = 401;
              next(err);
            }
            else {
              //if (username == found.username && password == found.password) { 
              if (username == found.username && bcrypt.compareSync(password,found.password)) {
                console.log("------------------------Nå er du i if (username == found.username")
                res.cookie('user', '' + found.userType + ' ' + found.uid, {
                  signed:true,
                });
                res.locals.uid = found.uid;
                res.locals.userType = found.userType;
                next();
              } else {
                var err = new Error("-------You are not authenticated----------");
                
                res.setHeader("WWW-Authenticate", "Basic");
                err.status = 401;
                next(err);
              }    
            }
        }
      })


  } 
  else {        //Dersom du har en cookie fra før

    var valueFraCookie = req.signedCookies.user;
    console.log("----------Dette er valueFraCookie " + valueFraCookie)
    var array =  valueFraCookie.split(" ");
      var userType = array[0];
      var uid = array[1];
      console.log("du er inni siste else, her er userType " + userType)
      console.log("du er inni siste else, her er uid " + uid)
      res.locals.uid = uid;
      res.locals.userType = userType;
  next();
  }
}

app.get('/secret', auth, (req, res)=> {
  res.statusCode=200;
  res.send("ok")

})




app.post('/lolol',multerDecode.none(), validateCookie, function (req, res, next) {

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
          console.log("Funnet bruker: " + found.email)
          console.log("bruker hentet fra database: " + found.email)
          res.locals.foundPassword = found.password;
          console.log("found.uid: " + found.uid)
          console.log("found.userType: " + found.userType)
          res.locals.uid = found.uid;
          res.locals.userType = found.userType;
          // console.log("coockie id fra databasen er brukeren sin uid: " + found.uid);
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
        res.cookie("uid", res.locals.uid);
        res.cookie("userType", res.locals.userType);
        // res.status(200).json({ msg: 'Logged in.'});
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



/*****************************************************
 * For å sjekke om bruker er logget inn gjør følgende:
 * 
 * Gå inn på din nettleser og trykk på inspect->Application->cookies
 * Så trykker du to ganger på skjema og lager en cookie som heter
 * "uid" og "userType". Sett disse variablene sine Value til 
 * den brukeren du ønsker å være sin uid for eks 2
 * eller userType for eks Admin. 
 * 
 * Deretter i dine app.post funksjoner bruk denne funksjonen
 * som middleware. For eks app.post(.....,validateCookie, function {
 * 
 * })
 * 
 * Inne i din funksjon kan du ta sjekke med:
 * 
 * if (res.locals.uid)
 *    console.log(res.locals.uid) //for eks får du da '2'
 *    gjør noe...
 * if (res.locals.userType) 
 *    gjør noe....
 */
function validateCookie(req, res, next) {
  console.log("Du er i validateCookie")
  const { cookies } = req;

  // console.log("Her er req sin cookie: " + req.cookies)
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)
  if ('uid' in cookies) {
    console.log("----------------Du er i validate-------------");
    console.log("Session id exists");
    res.locals.uid = cookies.uid;
    console.log("dette er res.locals.uid" + res.locals.uid);
  } 
  if ('userType' in cookies) {
    console.log("----------------Du er i validate-------------");
    console.log("user type exists");
    res.locals.userType = cookies.userType;
    console.log("dette er res.locals.userType " + res.locals.userType);
  } 
  next();
}

app.post('/checkUserType', auth, function (req,res) {
  console.log("Du er inni checkUserType her er userType: " + res.locals.userType)
  console.log("------------------ her er ownerId: " + req.body.ownerId)
  res.writeHead(200, { 'Content-Type': 'application/json' });

  
  if(res.locals.userType == "moderator" || res.locals.userType == "admin"){
    console.log("Du er inni checkuser if")
    var answer = JSON.stringify({
      admin: true,
      user: true
    })
    res.send(answer);
  }
  else if (res.locals.userId == req.body.ownerId) {
    console.log("Du er inni checkuser if else")
    var answer = JSON.stringify({
      admin: false,
      user: true
    }) 
    res.end(answer);
  }
  
  else {
    console.log("Du er inni checkuser else")
    var answer = JSON.stringify({
    admin: false,
    user: false
  })
  res.end(answer);
}

});


/**
 * This route creates a new user
 * @see /server/src/components/UserClass - the class of a new user
 */

app.post('/registerUser',multerDecode.none(), function (req,res) {
  var usernameExist = false; //Does username exist?
  
  //const hashedPassword = await bcrypt.hash(req.body.password, 10) //- Sjekk om denne kan fjernet med Nicholas
  var salt = bcrypt.genSaltSync(10); //Generate salt
  var hashedPassword = bcrypt.hashSync(req.body.password, salt); //Hasshing the userPassword
  
  var regPers = new person(req.body); //Create a new user based on requests formdata
 
  //If the new users information matches the repeted information and the formdata requirements then chek if username exist
  console.log("er brukernavn tegn gyldig: " + regPers.validateInputUserName());
  if(regPers.matcingInfo() && regPers.validateInput() && regPers.validateInputUserName() &&regPers.validatePassword()){
    regPers.validateInput();
    console.log("All information maching and regex is okay for user: " + regPers.username); //Consoe log out status

   //Chek if username exist in DB
   db.query('SELECT COUNT(username) AS numberOfMatch FROM users WHERE username =?',[regPers.username], function (err,result) {
    if(err){
      throw err;
    }
    //If username not exist
    if(result[0].numberOfMatch == 0 ){
      console.log("The Desired username " + regPers.username +" Does not exit and can be used for user " + regPers.email);
      usernameExist = false;
    }
    else{
      //If username exist
      console.log("Username " + regPers.username + "does exist and cant be used");
      usernameExist = true;
    }
   })
   //Chek if email exist   and if not register the user
    db.query('SELECT COUNT(email) AS numberOfMatch FROM users WHERE email =?',[regPers.email], function (err, result) {
      if (err) 
        throw err;
        //If there is no match of email address in db and the username not exist, then: 
       if(result[0].numberOfMatch ==0 && usernameExist == false) {
         //register the new user in the DB:
         db.query('INSERT INTO users (email, password, username) VALUES (?,?,?)',[regPers.email,hashedPassword, regPers.username], function (err, result) {
          if (err)
          throw err;
          console.log("User: " +regPers.username + " Succesfully registerd in DB");
          res.send("ok"); //send respons to frontend
         });
       }
       else if(usernameExist == true){
         res.send("UsernameExist") //If username exist
       }
       else {
         res.send("emailFinnes"); //If emai exist, send message frontend
       }
      }); 
      
  }
  //else if from the big if statment, if the username have invalid characthers, send respons frontend and DO NOT REGISTER
  else if(regPers.validateInputUserName() == false){
    console.log("Username characther not valid for user with email: " +regPers.email);
    res.send("UserNameCharNot");
  }
  else if(!regPers.validatePassword()){ //If the password enterd is to short
    res.send("pwToChort");
  }
  else if(!regPers.validateInput()){ // if the email charachter is invalid
    res.send("emailCharNot"); 
  }
  else{
    res.send("missMatch"); //hvis inpund data ikke matcher 
  }
  
})

//registrering av ny bruker
app.post('/registerHashed',multerDecode.none(), async (req,res) => {

  // if (res.locals.uid)
  // console.log("Du er logga inn fortsett: " + res.locals.uid) //2

  // if (res.locals.userType)
  // console.log("Du er ikke logga inn sluittter her" + res.locals.userType) //Admin

  
 const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const formData = req.body; //Lagrer unna formdata objekt
  console.log('form data', formData.email); //Skriver ut formdata objekt
  console.log("Formdata brukernavn " + formData.username);
  var regPers = new person(formData); //lager en ny person temp
  console.log("BrukernavnKlasse: " + regPers.username);
  var userReg =  "INSERT INTO users (email, password, userType) VALUES ('"+regPers.email+"','"+ hashedPassword +"','user')"; //registrer en bruker
  //var dbSjekk = "SELECT COUNT(email) AS numberOfMatch FROM users WHERE email = 'zcrona@example.net'"
  //var dbSjekk = "SELECT COUNT(email) AS numberOfMatch FROM users WHERE email = '"+regPers.email+"'"
  var usernameExist = false;
  var tempUserType = 'bruker';
  //Hvis inpud data frontend matcher
  console.log("er brukernavn tegn gyldig: " + regPers.validateInputUserName());
  if(regPers.matcingInfo() && regPers.validateInput() && regPers.validateInputUserName()){
    regPers.validateInput();
    console.log("er brukernavn tegn gyldig: " + regPers.validateInputUserName());

   //Chek if username exist in DB
   db.query('SELECT COUNT(username) AS numberOfMatch FROM users WHERE username =?',[regPers.username], function (err,result) {
    if(err){
      throw err;
    }
    console.log("Sjekker brukernavn " + result[0].numberOfMatch);
    //If username not exist
    if(result[0].numberOfMatch == 0 ){
      console.log("Ingen funn av brukernavn")
      usernameExist = false;
    }
    else{
      //If username exist
      console.log("Brukernavn finnes")
      usernameExist = true;
    }
   })

   console.log("Bool: " + usernameExist);
   
    db.query('SELECT COUNT(email) AS numberOfMatch FROM users WHERE email =?',[regPers.email], function (err, result) {
      if (err) 
        throw err;
        console.log(result[0].numberOfMatch); 
        //Hvis det er ingen oppforinger i db
       if(result[0].numberOfMatch ==0 && usernameExist == false) {
         console.log("ingenMatch")
         //db.query(userReg); //register a new user
         db.query('INSERT INTO users (email, password, username) VALUES (?,?,?)',[regPers.email,hashedPassword, regPers.username], function (err, result) {
          if (err)
          throw err;
          console.log("User registerd");
          res.send("ok"); //send respons frontend
         });

         //res.send("ok"); //send respons frontend
       }
       else if(usernameExist == true){
         res.send("UsernameExist") //If username exist
       }
       else {
         res.send("emailFinnes"); //If emai exist, send message frontend
       }
      }); 
      
  }
  else if(regPers.validateInputUserName() == false){
    console.log("Username characther not valid")
    res.send("UserNameCharNot");
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
app.post('/getUsers', auth, function (req, res) {
  console.log("Du er i getUsers her er userType" + res.locals.userType)
  if (res.locals.userType == "user" || res.locals.userType == "moderator") {
    console.log("Du er i getUser og er en user")
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( {
      Object: {
        warning: "You have to be moderator/admin to see list of users", 
        hei: "You have to be moderator/admin to see list of users"
      }
    }
    ));
  }
  else if (res.locals.userType == "admin") {
    console.log("Du er i getUsers");
    db.query('SELECT * FROM users', function (err, result) {
      if (err) {
        res.status(400).send('Error in database operation.');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    });
  }
    

  
  });



/************************************************************************
 * 
 * Notewhorty! Content-Type is specified to be of application/json, this
 * information can be seen in the response header while inside
 * browser->networking->requestName
 ***********************************************************************/
app.get('/requests', function (req, res) {
  console.log("Du er i requests");

  if (res.locals.userType == "user" || res.locals.userType == "moderator") { 
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( 
      {
        Object: {
          warning: "You have to be an admin to handle requests"
        } 
      }
    ))
  }
    
  else if (res.locals.userType == "admin") {
    db.query('SELECT * FROM requests', function (err, result) {
      if (err) {
        res.status(400).send('Error in database operation.');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    });
  }
});

app.post('/changeUserInfo', auth ,multerDecode.none(), function(req, res) {
  const formData = req.body; //Lagrer unna formdata objekt
  console.log('form data username ', formData.username); //Skriver ut formdata objekt
  console.log('form data password', formData.password); //Skriver ut formdata objekt
  


          // UPDATE users SET username = 'hailitla', password = 'hailHitla' WHERE uid =5
  var sql = "UPDATE users SET username = " + "'" + formData.username + "'" + ", password= " + "'" + formData.password + "'" + " WHERE uid =" + res.locals.uid;
  console.log("Her er query" + sql)
  
  db.query(sql, function (err, result) {
    if (err) {
      res.status(400).send('Error in database operation.');
    } else {
      // res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end("Success");
    }
  });
})



/************************************************************************
 * 
 * Notewhorty! Content-Type is specified to be of application/json, this
 * information can be seen in the response header while inside
 * browser->networking->requestName
 ***********************************************************************/
app.post('/accept', multerDecode.none(), function (req, res) {
  console.log("Du er i accept");
  
  console.log("Accept sin userInt " + req.body.userInt);
  console.log("Accept sin userType " + req.body.userType);
  var sql = "DELETE FROM `requests` WHERE user=" + req.body.userInt;
            //  DELETE FROM `requests` WHERE user=3; UPDATE users SET userType = 'moderator' WHERE uid =3;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(400).send('Error in database operation.');
    } else {
      console.log(result);
    }
  });

  sql = "UPDATE users SET userType = 'moderator' WHERE uid =" + req.body.userInt;
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
app.post('/deny', multerDecode.none(), function (req, res) {
  console.log("Du er i deny");
  
  console.log("deny sin userInt " + req.body.userInt);
  console.log("deny sin userType " + req.body.userType);
  var sql = "DELETE FROM `requests` WHERE user=" + req.body.userInt;
            //  DELETE FROM `requests` WHERE user=3; UPDATE users SET userType = 'moderator' WHERE uid =3;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.end(JSON.stringify(result));
    }
  });
});


app.get('/userLogin', function(req, res) {
  console.log("Funker");
  console.log("Server username: " + req.body.username);
  var username = req.body.username;
  console.log("Server password: " + req.body.password);
  var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));  

  console.log("B");
  db.query(`SELECT password, uid, userType, picture FROM users WHERE username='${username}' AND password='${password}';`), function (err, result) {
    if(err) {
      res.status(400).send(err);
    }else{
      res.status(200).send("Valid login");
    }
  }
})

// Fetches data of active user
app.get('/getUserData', auth, function (req, res) {
  console.log(`SELECT username, picture FROM users WHERE uid=${res.locals.uid}`)
  db.query(`SELECT username, picture FROM users WHERE uid=${res.locals.uid}`, function (err, result) {
    if(err) {
      res.status(400).send("Error getting user information");
    }else{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
})

// Fetches properties for a single forum
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

// Fetches all posts for specified forum
app.get('/p/:forum/:sort', function (req, res) {
  var forum = req.params.forum;
  var sort = req.params.sort;
  db.query(`SELECT pid, title, image, votes, blocked, users.username FROM posts
            INNER JOIN users ON posts.uid = users.uid 
            WHERE posts.forum = '${forum}'
            ORDER BY ${sort} DESC;`, function (err, result) {
      if (err) {
        res.status(400).send('Error in database operation.');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    });
});

// Fetches properties for a single post
app.get('/p/:pid', function (req, res) {
  var pid = req.params.pid;
  db.query(`SELECT pid, title, forum, image, content, votes, blocked, users.username FROM posts
            INNER JOIN users ON posts.uid = users.uid 
            WHERE posts.pid = '${pid}'`, function (err, result) {
      if (err) {
        res.status(400).send('Error in database operation.');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    });
});

// Fetches all posts that match search criteria
app.get('/s/:keyword', function (req, res) {
  var keyword = req.params.keyword;
  db.query(`SELECT pid, title, image, votes, users.username FROM posts
            INNER JOIN users ON posts.uid = users.uid 
            WHERE title LIKE '%${keyword}%' OR content LIKE '%${keyword}%'
            ORDER BY votes DESC;`, function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
});

// Fetches all comments for a specific post
app.get('/c/:post', function (req, res) {
  var post = req.params.post;
  db.query(`SELECT cid, comments.uid, content, votes, date, users.username, users.picture FROM comments
            INNER JOIN users ON comments.uid = users.uid 
            WHERE pid = ${post}
            ORDER BY votes DESC;`, function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  });
});

// Inserts a new comment to database
app.post('/postComment', auth, function(req, res) {
  var uid = res.locals.uid;
  var pid = req.body.pid;
  var con = req.body.con;
  //console.log("uid: " + uid + "\npid: " + pid + "\ncon: " + con);

  db.query(`INSERT INTO comments (pid, uid, content) 
            VALUES (${pid}, ${uid}, "${con}"); `,  function (err, result) {
    if(err) {
      res.status(400).send('Error in database operation.');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
})

//Upvote | downvote
app.get('/:type/:id/vote/:updown', function(req, res) {
  var type = req.params.type;
  var id = req.params.id;
  var updo = req.params.updown;
  if(type == "posts"){
    if(updo == 1){
      db.query(`UPDATE posts SET votes = votes + 1 WHERE pid = ${id}`)
      .then(res.send("success"))
      .catch(err => res.send(err))
    }else{
      db.query(`UPDATE posts SET votes = votes - 1 WHERE pid = ${id}`)
      .then(res.send("success"))
      .catch(err => res.send(err))
    }
  }else{
    if(updo == 1){
      db.query(`UPDATE posts SET votes = votes + 1 WHERE pid = ${id}`)
      .then(res.send("success"))
      .catch(err => res.send(err))
    }else{
      db.query(`UPDATE posts SET votes = votes - 1 WHERE pid = ${id}`)
      .then(res.send("success"))
      .catch(err => res.send(err))
    }
  }
})


var test; //Litt usikker om denne kan slettes, var noe som lå over userregisterOld


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

/**
 * Uploading of profilepicture
 */



app.post('/profilePicUpload', auth, (req, res) => {
  var isAPicture = true; //For response logic
  var errorPicture = false; // for response logic
  var imageName;  //Store the imagename 
  var imageurl = 'http://localhost:8081/images/' //deafult url to picturefolder
  //Dummy data before coockie is implemented:
  var userId; //Coneccted to sql string for updating the specific user with the image url, 
  userId = res.locals.uid; //Before coockie is implemented i have hardcoded the uid of user 1 

  //Define pictureStore
  var multerStorage =multer.diskStorage({
    destination: './src/images/userProfile', //path to profilePicture
    //Create a image name:
    filename: function(req,file,cb){
        let nameTemp = randomstring.generate(); //generates a random filestring for random name
        imageName = nameTemp + path.extname(file.originalname); //apennder random name with file extention
        cb(null,imageName); //Return file with filename and extention;
    }
  }) //End of storage logick

  //Image filter for filter datatypes backend
  const pictureFilter = (reg,file,cb) => {
    //Chek what filetype uploaded
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    //If not match the filefilter then:
    } else {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
  }//end of filefilter for picture
  

  //var pictureUpload = multer({ storage: multerStorage}).single('file'); //save all the settings to a object
  var pictureUpload = multer({ storage: multerStorage, fileFilter:pictureFilter}).single('file');
 // pictureUpload = multer({ storage: multerStorage}).single('file');

  //Here we want to chek for errors and register the name in the database
  pictureUpload(req, res, function(err) {
  //Errorhandling from multer, see documenation https://www.npmjs.com/package/multer
    if(err instanceof multer.MulterError){
      console.log( "Error in pictureUpload of image: " + imageName);
      errorPicture = true; // Set errorPicture to tru if problem with multer
    }
    //If a filetype validation failed
    else if(req.fileValidationError){
      console.log("Not valid fileformat only jpg and png allowed ref: " + imageName);
      res.send("errorFileExt"); //Send message front end
    }
    else if(err){
      console.log("Some unspecifed error when handling of file: " + imageName);
      errorPicture = true; //set errorPicture to true if some unspecifed eror
      throw err;
    }
    //If it is a picture register the name in DB
    else if(isAPicture){
      var imageNamehttp = imageurl.concat(imageName); //Create the full image url
      //Update the specifed user with imahe url on profilepicture
      db.query('UPDATE users SET picture=? WHERE uid =?',[imageNamehttp,userId], function(err,results){
        if(err){
          console.log(err);
          errorPicture = true //Set the bool if problem with register 
        } else{
          //picture registed in db
          console.log("profilepic registerd in db with path: " + imageNamehttp);
             res.send("ok");  //picture uploded sucefully
        }
      });

    }//end of else
    
  })
  
  });
