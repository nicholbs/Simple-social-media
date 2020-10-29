//LitElement for retrieving posts
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class RetrievePosts extends LitElement {
    
    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
    }
    `;

    static get properties() {
        return {
            allPosts: {type: Array},
        };

    }
    
    
    constructor(){
        super();
        this.allPosts = ["hent", "posts", "deg", "nicholas"];
        this.retrieveAllPost();
    }
    
    retrieveAllPost() {
        fetch(`${window.MyAppGlobals.serverURL}retrievePosts`)
        .then(response => response.json())
        .then(response => 
            {
            this.allPosts = Object.values(response)
            console.log("Halla ");
            console.log(this.allPosts);

        //         console.log("length " + response.length);
        //         const htmlElement = document.getElementById("container");
        // for(var index=10; index < response.length; index++) {
            
            
        //         let li = document.createElement("register-page");
        //         let node = document.createTextNode("PID: " + response[index].pid + " ");
        //          li.appendChild(node);
        //         container.appendChild(li);      //Eehhh hvorfor i helvette lar container det bli riktig satt inn i listen. den skal jo egentlig være htmlElement variabelen
        // }	
       
                // this..appendChild(li);      //Eehhh hvorfor i helvette lar container det bli riktig satt inn i listen. den skal jo egentlig være htmlElement variabelen
        
        })
    }
      


    render() {
    console.log("hei");    //log message available from web-browser, inspect->console

    return html`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title" id="title-card">${this.allPosts[12].title ? html`${this.allPosts[12].title}` : html``}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">USER: ${this.allPosts[1].user}</h6>
                    <p class="card-text">TITLE: ${this.allPosts[2].title}</p>
                    <p class="card-text">CONTENT: ${this.allPosts[3].content}</p>
                    <p class="card-text">${this.allPosts.map(i => html`<post-lit class="card" .post=${i}></post-lit>`)}</p>

                
                </div>
            </div>
        
            <div>
                <button class="btn btn-primary"  @click="${this.retrieveAllPost}"   type="submit">Button</button>
            </div>
            `;
    }


}

//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('retrieve-posts', RetrievePosts);     //'retrieve-posts' is the lit-element's name, can be seen in "index.html" as <retrieve-posts>
