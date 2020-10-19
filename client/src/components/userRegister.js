//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class RegisterPage extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`
        <div>Hello from RegisterPage!</div>
        `;
    }
}
customElements.define('register-page', RegisterPage);