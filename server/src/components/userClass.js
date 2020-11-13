
class person{
    constructor(dataE){
      this.email = dataE.email;
      this.repeatEmail = dataE.repeatEmail;
      this.password = dataE.password;
      this.repeatPassword =dataE.repeatPassword;
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
  }
export{person}