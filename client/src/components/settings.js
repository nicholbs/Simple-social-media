//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class settingsPage extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;
    constructor() {
        super();
        this.validate();

    }
    render() {
        return html`
     
     <div>
        <div class="d-flex justify-content-center"> 
                <form class="form" id="uplaodPicture" enctype="multipart/form-data">
                        <h1>Upload Profile Picture</h1>
                        <div class="row mt-2">
                                <div class="col">
                                    <label for="photo2">Upload Picture</label>
                                    <input type="file" name="file" class="form-control-file" id="photo2" accept="image/*">
                                </div>
                                <div class="row mt-2">
                                        <button @click="${this.uploadPic}" class="btn btn-primary">Set Profile Picture</button>
                                </div>
                            </div>  
                </form>
                     
        </div>

        <div>
        <div class="d-flex justify-content-center"> 
                <form class="form" id="changeUser">     
                        <h1>Change Password</h1>
                        <div class="row mt-10">
                                <div class="col">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" placeholder=" new password">
                                </div>
                                <div class="row ml-2">
                                    <button class="btn btn-primary" @click="${this.changeUserInfo}">Change Password</button>
                                </div>
                            </div>  
                </form>
                     
        </div>
    
     

     `;
    }

    changeUserInfo(e) {
        console.log("Du er i changeUser")
        const userInfo = new FormData(e.target.form);
        e.preventDefault();
        fetch('http://localhost:8081/changeUserInfo',{
            method: 'post',
            credentials: "include",
            body: userInfo,
        })
        .then(function(response){
            return response.text();
        })
        .then(function (text){
        if(text=='pwChanged'){ //If the password updated sucesfully
            alert("Password has been changed");
            location.reload();// reloader page
        }
        else if(text == 'ErrorInPWChange'){ //If the password dident change sucefully
            alert("Problem with changing password");
        }
        else if(text=='pwToChort'){
            alert("Password to chort");
        }
    })
    }


    validate(){
        fetch('http://localhost:8081/secret',{
            credentials: "include"
        })

    }

    uploadPic(e){
        const userPic = new FormData(e.target.form);
        e.preventDefault();
        console.log("event");

        fetch('http://localhost:8081/profilePicUpload',{
            method:'post',
            credentials: "include",
            body:userPic
        })
        .then(function(response){
            return response.text();
        })
        .then(function (text){
            console.log(text);
            //Alt ok 
            if(text=='ok'){
                alert("Profilpicture uploaded, you wil be redirected to homepage");
                location.replace("http://localhost:8080/")
            }
            //feil i multer
            else if(text=='errorMulter'){
                alert("Fatal error in multer - backend");
            }
            else if(text=='errorFileExt'){
                alert("Only jpg and png pictures allowed");
            }
            //annen uspesifikk feil
            else {
                alert("some other fatal error backend");
            }
           
        })
        .catch(function (error){
            console.log(error);
        })

    }
}
customElements.define('settings-page', settingsPage);