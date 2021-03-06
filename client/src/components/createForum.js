//This litElement creates create a forum
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class CreateForum extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`

        <div class="d-flex justify-content-center">
        <!--The form for creating a forum-->
        <form class="form" id="registerForum">
        <h1>Create new forum</h1>
        <!--Første rad-->
        <div class="row mt-2">
            <div class="col">
                <label for="ForumName">Forum name</label>
                <input type="text" name="ForumName"pattern="[a-z0-9A-Z]{2,63}$" class="form-control" id="forumName" placeholder="name on forum" required>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <label for="ForumTitle">Forum Title</label>
                <input type="text" name="ForumTitle"pattern="[a-z0-9A-Z]{2,63}$" class="form-control" id="forumTitle" placeholder="Title of forum" required> 
            </div>
        </div>      
        <div class="row mt-2">
        <button @click="${this.registerForum}" class="btn btn-primary">Create Forum</button>
        </div>
    </form>
    </div>
        `;
    }
     /**
     * This function take the formdata from registerForum and sends it backend for creating a new forum
     */
    registerForum(e){
        const newUser = new FormData(e.target.form);
        e.preventDefault();
        console.log("event");

        fetch('http://localhost:8081/createforum',{
            method:'post',
            credentials: "include",
            body:newUser
        })
        .then(function(response){
            return response.text();
        })
        .then(function (text){
            if(text =='ok'){ //If all thing was okay and the forum was created okay
                console.log("registrert");
                alert("Forum Created, You will be redirected to homepage");
                location.replace("http://localhost:8080/") //redirect to homepage
            }
            else if(text == 'invalidChar'){ //invalid characters
                alert("Title ore name characther not valid, can only contain 0-9,A-Z,a-z");
            }
            else if(text=='nameExist'){ //if the forumname alredy exist
                alert("Forum name alredy exist, plese chose anotherone!");
            }
            
        })
        .catch(function (error){
            console.log(error);
        })

    }
}
customElements.define('createforum-page', CreateForum);