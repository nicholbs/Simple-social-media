//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class mainPage extends LitElement {

    static styles = css`
    :host {
        display: block;
        
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
        
      }



    `;

    render() {
        return html`
        <h5 id="mainPageTittel">Hello Professor, this is the </h5>
    

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Putt linker til forum x her</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
    
        `;
    }

}
customElements.define('main-page', mainPage);