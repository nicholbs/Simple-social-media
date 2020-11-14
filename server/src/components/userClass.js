
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
    //input validation in email
    validateInput(){
      var emailExp = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$");
      if(emailExp.test(this.email)){
        console.log("Epost expression gyldig");
        return true;
      }
      else {
        console.log("Epost expression ikke gyldig");
        return false;
      }
    }
    validateInputUserName(){
      var userNameExp = new RegExp("[a-z0-9A-Z]{2,63}$");
      if(userNameExp.test(this.username)){
        console.log("Username charcther valid");
        return true;
      }
      else{
        console.log("Username characthers not valid!");
        return false;
      }
    }
  }
export{person}