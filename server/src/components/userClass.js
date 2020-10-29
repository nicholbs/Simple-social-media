
class person{
    constructor(dataE){
      this.email = dataE.email;
      this.repeatEmail = dataE.repeatEmail;
      this.password = dataE.password;
      this.repeatPassword =dataE.repeatPassword;
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
export{person}