//LitElement for retrieving posts
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

//OUTDATED

export class RetrievePosts extends LitElement {
    
    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
    }
    `;

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
            allPosts: {type: Array},
        };

    }
    
    /*****************************************************************
     * This code is the first to run when creating instance of object
     * 
     * Constructor is the function which is called before all else
     * when creating an instance of this lit-element.
     * Super() - Necessary in lit-element constructors. Have not used
     * it in practice yet, but can be applied to other functions you
     * create to ensure the function becomes part of the initial 
     * creation of the object (lit-element).
     * 
     * @function retrieveAllPost - Sends a "GET" request for all posts
     * @author Nicholas Bodvin Sellevaag
     ****************************************************************/    
    constructor(){
        super();
        this.retrieveAllPost();
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
    retrieveAllPost() {
        fetch(`${window.MyAppGlobals.serverURL}retrievePosts`)
        .then(response => response.json())
        .then(response => 
            {
            this.allPosts = Object.values(response)
            console.log("Dette er innholdet fra JSON objektet");
            console.log(this.allPosts);
        })
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
    console.log("hei");    //log message available from web-browser, inspect->console

    return html`
            <div class="container">
                <div class="row">${this.allPosts.map(i => html`<post-lit class="card" .post=${i}></post-lit>`)}</div>
            </div>
         
            `;
    }

}

//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('retrieve-posts', RetrievePosts);     //'retrieve-posts' is the lit-element's name, can be seen in "index.html" as <retrieve-posts>
