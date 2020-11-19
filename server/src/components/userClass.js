/**
 * This class is used when register a new user to the forum
 */
class person{
    constructor(dataE){
      this.email = dataE.email;
      this.repeatEmail = dataE.repeatEmail;
      this.password = dataE.password;
      this.repeatPassword =dataE.repeatPassword;
      this.username = dataE.username;
    }
    matcingInfo(){
      //validating thath input data maches
      if((this.email === this.repeatEmail) && this.password === this.repeatPassword){
        console.log('Match');
        return true;
      }
      else {
        console.log('noMatch');
        return false;
      }
    }
    //input validation email
    validateInput(){
      var emailExp = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"); //what we axept for email
      if(emailExp.test(this.email)){ //chek if email characters conist of only valid characthers
        console.log("Epost expression vaild for user: " + this.email);
        return true;
      }
      else { //If the email consist of ilegal characthers
        console.log("Epost expression not valid for user: " + this.email);
        return false;
      }
    }
    //Input validation of username
    validateInputUserName(){
      var userNameExp = new RegExp("[a-z0-9A-Z]{2,63}$"); //what we axept of valid characthers of a username
      if(userNameExp.test(this.username)){ //If the username only consist of valid characthers
        console.log("Username charcther valid for user with email: " + this.email);
        return true;
      }
      else{ //If the username consist of ileagal characthers
        console.log("Username characthers not valid! for user with email: " + this.email);
        return false;
      }
    }
    validatePassword(){
      if (this.password.length >= 8){ //Chek if the pw is grather than 8 characthers
        console.log("Pw lengt for user " + this.username + "is okay")
        return true;
      }
      else{ //If the pw iss less than 8 characther
        console.log("Pw lengt for user " + this.username + " is lower then requerd 8 ");
        return false;
      }
      
    }
  }
export{person}