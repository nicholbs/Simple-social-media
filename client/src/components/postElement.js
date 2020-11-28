//LitElement for retrieving posts
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';





//Outdated, not in use!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//lit element forum-post is used instead of this element to showcase information about a post

export class PostLitElement extends LitElement {
    
    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
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
            post: Object,
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
    console.log("postElement: ");    //log message available from web-browser, inspect->console

    return html`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5>${this.post.pid ? html`${this.post.pid}` : html`Mangler "pid" i post`}</h5>
                    <h5>${this.post.user ? html`${this.post.user}` : html`Mangler "user" i post`}</h5>
                    <h5>${this.post.title ? html`${this.post.title}` : html`Mangler "title" i post`}</h5>
                    <h5>${this.post.content ? html`${this.post.content}` : html`Mangler "content" i post`}</h5>
                </div>
            </div>
            `;
    }
}


//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('post-lit', PostLitElement);     //'retrieve-posts' is the lit-element's name, can be seen in "index.html" as <retrieve-posts>
