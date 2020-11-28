//Lit element for register a user
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class RegisterPage extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`

        <div class="d-flex justify-content-center">
        <!--The form thath register a user-->
        <form class="form" id="registerUser">
        <h1>Register to forum</h1>
        <!--Første rad-->
        <div class="row mt-2">
            <div class="col">
                <label for="eMail">E-mail</label>
                <input type="email" name="email"pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" class="form-control" id="eMail" placeholder="example@domain.com" required>
            </div>
            <div class="col">
                <label for="repeteEMail">Repete E-mail</label>
                <input type="email" name="repeatEmail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" class="form-control" id="repeteEMail" placeholder="example@domain.com" required>
            </div>
        </div>
        <!--Andre rad-->
        <div class="row mt-2">
            <div class="col">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="password">
            </div>
            <div class="col">
                <label for="repetePassword">Password</label>
                <input type="password" name="repeatPassword" class="form-control" id="repetePassword" placeholder="password">
            </div>
        </div>
        <div class="row mt-2">
            <label for="username">Username</label>
            <input type="text" name="username"pattern="[a-z0-9A-Z]{2,63}$" class="form-control" id="username" placeholder="mysky" required> 
        </div>
        <div class="row mt-2">
        <button @click="${this.registerUser}" class="btn btn-primary">Register User</button>
        </div>
    </form>
    </div>
        `;
    }
     /**
     * This function take the formData registerUser and send it backend for creating a new user 
     */
    registerUser(e){
        const newUser = new FormData(e.target.form); //Create a formdata from formen registerUser
        e.preventDefault();
        console.log("event");

        fetch('http://localhost:8081/registerUser',{
            method:'post',
            credentials: "include",
            body:newUser
        })
        .then(function(response){
            return response.text();
        })
        .then(function (text){
            //console.log(text);
            if(text =='ok'){ //If reply message is ok and the user is registerd
                console.log("registrert");
                alert("User Registered! You will be redirected to home");
                location.replace("http://localhost:8080/"); //redirect to homepage
            } 
            else if(text=='emailFinnes'){ //If the email alredy exist
                alert("Bruker Finnes fra før");
            
            }
            else if(text=='UsernameExist'){ //If the username exist 
                alert("Username exist");
            }
            else if(text =='UserNameCharNot'){ //if the username caracther is not valid
                alert("Username characther not valid, can only contain 0-9,A-Z,a-z");
            }
            else if(text =='missMatch'){ 
                //alert("Feil i brukernavn eller passord under registrering");
                alert("input value not vallid username, password missmatch ");
            }
            else if(text =='pwToChort'){ //If the password is to short
                alert("Pw to short, must be atleast 8 characther long!");
            }
            else if(text=='emailCharNot'){ //if email characthers is invalid
                alert("Invalid charachters in Email");
            }
        })
        .catch(function (error){
            console.log(error);
        })

    }
}
customElements.define('register-page', RegisterPage);