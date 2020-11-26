//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class blocked extends LitElement {


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
            allBlockedPosts: {type: Array},
            allBlockedComments: {type: Array},
            requestButton: {type:Boolean}
        };
    }




    constructor() {
        super();
        this.retrieveBlockedPosts();
        this.retrieveBlockedComments();
    }

     


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
     * element, namely <post-lit>. Effectively
     * creating a new lit-element for each post
     * 
     * @method allPosts.map - for each key
     * @see properties - allPosts
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
        // console.log("retrieve content uid " + this.allBlockedPosts[0].uid)
        // <div class="row">${this.allRequests.map(i => html`<requestcard-page class="card" .post=${i} .userInt=${i.user} .userType=${i.userType}></requestcard-page>`)}</div>



        // <br>
        // <div>${this.requestButton ? html`<button  @click="${this.requestModerator}" class="btn btn-danger btn-sm">Request moderator status</button>` : html``}</div>
        // <br>


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
    retrieveBlockedPosts() {
        fetch(`${window.MyAppGlobals.serverURL}blockedPosts`, {
            method:'get',
            credentials: "include",
        })
        .then(response => response.json())
        .then(response => 
            {
            this.allBlockedPosts = Object.values(response)
            
        
            console.log("retrieve content uid " + this.allBlockedPosts[0].uid)
        })
    }


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


    // requestModerator() {
    //     fetch('http://localhost:8081/requestDup',{
    //         method:'post',
    //         credentials: "include",
    //     }).then(response => response.json()) 
    //     .then(response=> {
    //         console.log("requestMod " + response)
    //         var answer = Object.values(response);
    //         console.log(answer[0])
    //         if (answer[0] == "ok") {
                
    //             alert("Your request has been noticed!");
    //         }
    //         else if (answer[0] == "duplicate"){
    //             alert("You already have a request to become a moderator!")

    //         }
            
    //     })
    // }





}
customElements.define('blocked-page', blocked);