//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class adminPage extends LitElement {


    /*********************************************
     * Properties for lit-element
     * 
     * In practive these properties 
     * are variables, used in the
     * rendered html
     * 
     * @var allPosts - array som holder alle posts
     * @author Nicholas Bodvin Sellevaag
     ********************************************/
    static get properties() {
        return {
            allUsers: {type: Array},
        };
    }




    constructor() {
        super();
        this.retrieveAllUsers();
    }

     


    static styles = css`
    :host {
        display: block;
        
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
    }
    `;

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
     * Notewhorty! allPosts.map is used to put each
     * value mapped with key "i" into a new html
     * element, namely <post-lit>. Effectively
     * creating a new lit-element for each post
     * 
     * @method allPosts.map - for each key
     * @see properties - allPosts
     * @author Nicholas Bodvin Sellevaag
     ***********************************************/
    render() {
        console.log("hei dette er adminPage");    //log message available from web-browser, inspect->console
    
        return html`
                <div class="container">
                    <div class="row">${this.allUsers.map(i => html`<user-card class="card" .post=${i}></user-card>`)}</div>
                </div>
                `;
        }




     /**************************************************************************
     * Function sends a request with purpose of receiving all posts in database
     * 
     * 
     * Request is sent to "route" specified in the "URL" of http request
     * Method used is "GET" which always carries parameters in
     * the URL of request.
     * in contrast to "POST" parameters which are sent inside the
     * body of the request itself.
     * 
     * The rendered html contains the information of posts retrieved
     *
     * @var response - JSON object sent from back-end containing all posts
     * @see properties - allPosts
     * @author Nicholas Bodvin Sellevaag
     *************************************************************************/
    retrieveAllUsers() {
        fetch(`${window.MyAppGlobals.serverURL}getUsers`, {
            method:'post',
            credentials: "include",
        })
        .then(response => response.json())
        .then(response => 
            {
            this.allUsers = Object.values(response)
            // console.log(response)
            console.log("Dette er innholdet fra JSON objektet");
            console.log(this.allUsers);
        })
    }


}
customElements.define('userlist-page', adminPage);