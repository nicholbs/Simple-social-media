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
        justify-content: center;
        
      }

    h5 {
        color: white;

    }
    h4 {
        color: white;

    }


    `;

    static get properties() {
        return {
            allForums :  { type: Array },
        };
    }

    constructor() {
        super();
        this.allForums = [];
        this.getForums();
    }

    render() {
        return html`
            <br><br><br>
            <div class="d-flex justify-content-center">  
                <br><br>
                <h4 id="mainPageTittel">This is the homepage for our web-application</h4>
                </div class="row">
                    <div class="d-flex justify-content-center">
                        <div class="col">
                            <div class="row  justify-content-center">
                                <a href="/register">First step is to register an account!</a>
                            </div>
                            <div class="row  justify-content-center">
                                <a href="/login">Secondly you can log into your account!</a>
                            </div>
                            <br><br>
                            <div class="row justify-content-center">
                                <h5>Forum list</h5>
                            </div>
                            ${this.allForums.map(i => html`<forum-link .forumLink=${i}></forum-link>`)}     
                        </div>
                    </div>
                </div>
            </div>        
        `;
    }
    
    async getForums() {
        await fetch('http://localhost:8081/retrieveForums',{
            method:'get',
            credentials: "include",
        }).then(res => res.json())
        .then(res => { 
            this.allForums = Object.values(res);
            
        }) 

    }



}
customElements.define('main-page', mainPage);