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
        <!--Selve formen som skal registrere data-->
        <form class="form" id="registerForum">
        <h1>Register new forum</h1>
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
        <button @click="${this.registerForum}" class="btn btn-primary">Register Forum</button>
        </div>
    </form>
    </div>
        `;
    }
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
            //console.log(text);
            if(text =='ok'){
                console.log("registrert");
                alert("Forum registerd");
            } 
            
        })
        .catch(function (error){
            console.log(error);
        })

    }
}
customElements.define('createforum-page', CreateForum);