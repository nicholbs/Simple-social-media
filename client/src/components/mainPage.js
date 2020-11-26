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


    `;

    render() {
        return html`
            <br>
            <br>
            <br>
            <div class="d-flex justify-content-center">
                
                <br>
                <br>
        
            <h5 id="mainPageTittel">This is the homepage for our web-application</h5>
            
                  </div class="row">
                    <div class="d-flex justify-content-center">

                        <div class="col">
                            

                            <div class="row  justify-content-center">
                                <a href="/register">First step is to register an account!</a>
                            </div>
                            
                            
                            
                            <div class="row  justify-content-center">
                                <a href="/login">Secondly you can log into your account!</a>
                            </div>


                            <div class="row  justify-content-center">
                                <a href="/logout">Thirdly you can logout your account!</a>
                            </div>
                            
                        </div>
                    </div>
                    </div>
                 </div>
            
            
            
        </div>
            
            `;
    }
    
}
customElements.define('main-page', mainPage);