//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class logout extends LitElement {

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
  

        fetch('http://localhost:8081/logout',{
            method:'get',
            credentials: "include",
        }).then(res =>  {
            // location.replace("http://localhost:8080/alla");
            
            if (res.ok == true) {
                alert("You are logged out!");
                console.log("response var ok");
            }

        }) 

    }
}
customElements.define('logout-page', logout);