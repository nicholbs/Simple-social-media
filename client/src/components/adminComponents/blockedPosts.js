//LitElement for retrieving posts
import { internalProperty } from 'lit-element';
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class blockedComment extends LitElement {
    
    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
    }

    button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    p {
        color: blue;
        
    }
    `;

    /********************************************************************
     * Properties for lit-element
     * 
     * In practive these properties 
     * are variables, used in the
     * rendered html
     * 
     * @var post - contains a post object sent as parameter form creator
     * @author Nicholas Bodvin Sellevaag
     ******************************************************************/
    static get properties() {
        return {
            blockedPost: Object,
        
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
    constructor(){
        super();
        
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
     * Notewhorty! The '?' is used as an if statement
     * for example if post.pid is set the HTML is set
     * to the consecutive text this.post.pid. if the
     * post.pid is not set the HTML is set as 
     * "Mangler 'pid' i post"
     * 
     * @see properties - post
     * @author Nicholas Bodvin Sellevaag
     ***********************************************/
    render() {
    return html`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5> ${this.blockedPost.uid ? html`<p>ID of user: </p>${this.blockedPost.uid}` : html``}</h5>
                    <h5>${this.blockedPost.title ? html`<p>Title of post: </p>${this.blockedPost.title}` : html``}</h5>
                    <h5>${this.blockedPost.content ? html`<p>Content of post: </p>${this.blockedPost.content}` : html``}</h5>
                    <h5>${this.blockedPost.warning ? html`<p></p>${this.blockedPost.warning}` : html``}</h5>
                    
                </div>
            </div>
            `;
    }
}


//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('blocked-post', blockedComment);     //'retrieve-posts' is the lit-element's name, can be seen in "index.html" as <retrieve-posts>
