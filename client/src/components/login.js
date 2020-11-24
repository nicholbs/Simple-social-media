//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class login extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

   

    constructor() {
        super();
        this.registerUser();

    }

    render() {
        return html`
     

        `;
    }
    registerUser(e){
  

        fetch('http://localhost:8081/secret',{
            method:'get',
            credentials: "include",
        }).then(res =>  {
            if (res == "ok") {
                alert("You are authenticated!");
            }
            location.replace("http://localhost:8080/");
        }) 

    }
}
customElements.define('login-page', login);