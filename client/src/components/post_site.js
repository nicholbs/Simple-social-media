import { LitElement, html, css } from 'lit-element';

export class ForumSite extends LitElement {
    static get properties() {
        return {
            fData : Object,
        };
    }
    
    constructor() {
    super();
    this.fData = {};
    }
}
customElements.define("forum-site", ForumSite);