//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class login extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`
        <div>Hello from RegisterPage!</div>
        <div class="d-flex justify-content-center">
        <!--Selve formen som skal registrere data-->
        <form class="form" id="login">
        <h1>Register to forum</h1>
        <!--Første rad-->
        <div class="row mt-2">
            <div class="col">
                <label for="eMail">E-mail</label>
                <input type="email" name="email"patter="[a-zA-z0-9._]{1,20}+@+[a-zA-z0-9._]" class="form-control"  placeholder="example@domain.com">
            </div>
            <div class="col">
                <label for="repeteEMail">Repete E-mail</label>
                <input type="email" name="repeatEmail" patter="[a-zA-z0-9._]{1,20}+@+[a-zA-z0-9._]" class="form-control"  placeholder="example@domain.com">
            </div>
        </div>
        <!--Andre rad-->
        <div class="row mt-2">
            <div class="col">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control"  placeholder="password">
            </div>
            <div class="col">
                <label for="repetePassword">Password</label>
                <input type="password" name="repeatPassword" class="form-control"  placeholder="password">
            </div>
        </div>
        <div class="row mt-2">
        <button @click="${this.registerUser}" class="btn btn-primary">Register User</button>
        </div>
    </form>
    </div>
        `;
    }
    registerUser(e){
        const newUser = new FormData(e.target.form);
        console.log("event");

        fetch('http://localhost:8081/lolol',{
            method:'post',
            credentials: "include",
            body:newUser
        })
       
     

    }
}
customElements.define('login-page', login);