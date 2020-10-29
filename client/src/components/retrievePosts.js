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
            testObject: Object,
            allPosts: {type: Array},
            cardTitle: {type: String},
            cardSubTitle: {type: String},
            cardText: {type: String},
            cardLink: {type: String},

        };

    }
    
    
    constructor(){
        super();
        this.allPosts = ["hei", "på", "deg", "nicholas"];
        this.retrieveAllPost();
    }
    
    retrieveAllPost() {
        fetch(`${window.MyAppGlobals.serverURL}retrievePosts`,
        {
        method: 'GET'
        })
        .then(response => response.json())
        .then(response => 
            {
            console.log(response);
            var stringArray = [];
            
            stringArray.push(response[0].pid);
            stringArray.push(response[0].user);
            stringArray.push(response[0].title);
            stringArray.push(response[0].content);
            
            console.log(stringArray[2]);
            this.allPosts = stringArray;
            console.log("haha " + this.allPosts);







                console.log("length " + response.length);
                const htmlElement = document.getElementById("container");
        for(var index=10; index < response.length; index++) {
            
            
                let li = document.createElement("register-page");
                let node = document.createTextNode("PID: " + response[index].pid + " ");
                 li.appendChild(node);
                container.appendChild(li);      //Eehhh hvorfor i helvette lar container det bli riktig satt inn i listen. den skal jo egentlig være htmlElement variabelen
        }	
       
                // this..appendChild(li);      //Eehhh hvorfor i helvette lar container det bli riktig satt inn i listen. den skal jo egentlig være htmlElement variabelen
        
        })
    }
      


    render() {
    console.log("hei");    //log message available from web-browser, inspect->console

    return html`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title" id="title-card">PID: ${this.allPosts[0]}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">USER: ${this.allPosts[1]}</h6>
                    <p class="card-text">TITLE: ${this.allPosts[2]}</p>
                    <p class="card-text">CONTENT: ${this.allPosts[3]}</p>
                    <!-- <a href="#" class="card-link">Content ${this.allPosts[3]}</a> -->
                    <ul id="container"></ul>
                
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
