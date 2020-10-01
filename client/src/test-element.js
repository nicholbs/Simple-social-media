import { LitElement, html, css } from '../node_modules/lit-element/lit-element';

export class TestELement extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`
        <div>Hello from testElement! Odd Var Her</div>
        `;
    }
}
customElements.define('test-element', TestELement);