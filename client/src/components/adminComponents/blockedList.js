//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class blocked extends LitElement {


    /********************************************************************
     * Properties for lit-element
     * 
     * In practive these properties 
     * are variables, used in the
     * rendered html
     * 
     * @var allBlockedComments - contains all object of blocked comments
     * @var allBlockedPosts - contains all object of blocked Posts
     * @author Nicholas Bodvin Sellevaag
     *******************************************************************/
    static get properties() {
        return {
            allBlockedPosts: {type: Array},
            allBlockedComments: {type: Array},
        };
    }



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
        this.retrieveBlockedPosts();
        this.retrieveBlockedComments();
    }

     

//"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
        
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
    }

    h1 {
        color: blue;
    
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
     * element. Effectively
     * creating a new lit-element
     * 
     * @see properties
     * @author Nicholas Bodvin Sellevaag
     ***********************************************/
    render() {
        console.log("hei dette er requests");    //log message available from web-browser, inspect->console
    
        return html`
        <div class="container">
            <div class="row">
                <h1>All blocked Posts:</h1>
            </div>
            <div class="row">${this.allBlockedPosts.map(i => html`<blocked-post .blockedPost=${i}></blocked-post>`)}</div>
            
            
            <div class="row">
                <h1>All blocked Comments:</h1>
            </div>
            <div class="row">${this.allBlockedComments.map(i => html`<blocked-comment .blockedComment=${i}>asdsa</blocked-comment>`)}</div>
        </div>
        `;
        }

     /**************************************************************************
     * Function sends a request with purpose of receiving all blocked posts.
     *
     * After receiving all blocked posts the rendered html will include all
     * blocked posts.
     * 
     * @var response - JSON object sent from back-end containing all posts
     * @see properties
     * @author Nicholas Bodvin Sellevaag
     *************************************************************************/
    retrieveBlockedPosts() {
        fetch(`${window.MyAppGlobals.serverURL}blockedPosts`, {
            method:'get',
            credentials: "include",
        })
        .then(response => response.json())
        .then(response => 
            {
            this.allBlockedPosts = Object.values(response)
            
        
            console.log("retrieve content warning " + this.allBlockedPosts[0].warning)
            console.log("retrieve content hei " + this.allBlockedPosts[0].hei)
            console.log("retrieve content uid " + this.allBlockedPosts[0].uid)
        })
    }

    /**************************************************************************
     * Function sends a request with purpose of receiving all blocked comments.
     *
     * After receiving all blocked comments the rendered html will include all
     * blocked comments.
     * 
     * @var response - JSON object sent from back-end containing all comments
     * @see properties
     * @author Nicholas Bodvin Sellevaag
     *************************************************************************/
    retrieveBlockedComments() {
        fetch(`${window.MyAppGlobals.serverURL}blockedComments`, {
            method:'get',
            credentials: "include",
        })
        .then(response => response.json())
        .then(response => 
            {
            this.allBlockedComments = Object.values(response)
            console.log("retrieve Comments" + this.allBlockedComments)
        })
    }
}
customElements.define('blocked-page', blocked);