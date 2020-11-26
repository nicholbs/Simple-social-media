//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class forumLink extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    static get properties() {
        return {
			forumLink : Object,
        };
      }


    constructor() {
        super();
    
    }

    render() {
        return html`
            <div class="row justify-content-center">
                <a href="http://localhost:8080/forum?name=${this.forumLink.name}" onclick="setTimeout(location.reload.bind(location), 1)"> ${this.forumLink.title}       </a>  

            </div>
        `;
    }
  
    // he() {
    //     console.log("--------------Du er i forumLink: " + this.forumLink.name)
    // }
}
customElements.define('forum-link', forumLink);