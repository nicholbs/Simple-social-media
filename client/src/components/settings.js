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
                        <h1>Upload Picture</h1>
                        <div class="row mt-2">
                                <div class="col">
                                    <label for="photo2">Upload Picture</label>
                                    <input type="file" name="file" class="form-control-file" id="photo2" accept="image/*">
                                </div>
                                <div class="row mt-2">
                                        <button @click="${this.uploadPic}" class="btn btn-primary">set Prfoile Picture</button>
                                </div>
                            </div>  
                </form>
                     
        </div>
     </div>
           <div>
            <form class="form" id="changeUser">
                <h1>Change info</h1>
                <!--Første rad-->
                <div class="row mt-2">
                </div>
                <!--Andre rad-->
                <div class="d-flex justify-content-center">
                    <div class="col">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="username">
                    </div>
                    <div class="col">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="password">
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" @click="${this.changeUserInfo}">Change info</button>
                </div>
            </form>
           </div>

     `;
    }

    changeUserInfo(e) {
        console.log("Du er i changeUser")
        const userInfo = new FormData(e.target.form);
        e.preventDefault();
        fetch('http://localhost:8081/changeUserInfo2',{
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