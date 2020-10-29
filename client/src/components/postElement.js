//LitElement for retrieving posts
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class PostLitElement extends LitElement {
    
    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
    }
    `;

    static get properties() {
        return {
            post: Object,
        };

    }
    
    
    constructor(){
        super();

    }
    
   
      


    render() {
    console.log("postElement: ");    //log message available from web-browser, inspect->console

    return html`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title" id="title-card">${this.post ? html`${this.post.pid}` : html``}</h5>
                </div>
            </div>
            `;
    }


}

//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('post-lit', PostLitElement);     //'retrieve-posts' is the lit-element's name, can be seen in "index.html" as <retrieve-posts>
