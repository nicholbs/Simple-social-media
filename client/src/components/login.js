//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class login extends LitElement {

    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
    }
    `;

   
    /****************************************************************
     * This code is the first to run when creating instance of object
     * 
     * Constructor is the function which is called before all else
     * when creating an instance of this lit-element.
     * Super() - Necessary in lit-element constructors. Have not used
     * it in practice yet, but can be applied to other functions you
     * create to ensure the function becomes part of the initial 
     * creation of the object (lit-element).
     * 
     * @author Nicholas Bodvin Sellevaag
     ***************************************************************/
    constructor() {
        super();
        this.login();

    }


    /************************************************
     * The HTML which is visible on pages is rendered
     * 
     * HTML is essentially simply lines of code, 
     * nothing else. For the content of a webpage 
     * to become "visible" the HTML code is 
     * interpreted by software inside the browser and
     * becomes instructions for the browser to create
     * figures and text form.
     * 
     * In other words, our lit-element's contain HTML
     * which needs to be rendered.
     * 
     * @see properties - post
     * @author Nicholas Bodvin Sellevaag
     ***********************************************/
    render() {
        return html`
     

        `;
    }



    /***************************************************************************
     * Function sends a request with purpose of authenticating the user and
     * make them logged in.
     * 
     * User is logged in when their browser has a hashed cookie with data about
     * the user from the database 
     *
     * @var response - JSON object sent from back-end containing all posts
     * @author Nicholas Bodvin Sellevaag
     ***************************************************************************/
    login(e){
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