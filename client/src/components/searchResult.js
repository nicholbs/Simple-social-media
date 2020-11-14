import { LitElement, html, css } from 'lit-element';

export class SearchResult extends LitElement {

    static get properties() {
        return {
            allPosts: {type: Array},
            search_query: {type: String},
            result_amount: {type: Number}
        };
    }
    
    constructor() {
    super();
    this.search_query = "";
    this.result_amount = 0;
    this.allPosts = [];
    this.fetch_data();
    }

    static get styles() {
        return [
            css`
            img {
                object-fit:cover;
                max-width:100%;
                max-height:400px;
                width: auto;
                height: auto;
            }
            .img-icon {
                width: 18px;
                height: 18px;
                margin-top: 0px;
                margin-bottom: 0px;
            }
            .img-banner {
                width: 100%;
                height: 225px;
            }
            .img-forum-icon {
                width: 128px;
                height: 128px;
                border-top-left-radius: 15px;
                border-top-right-radius: 50px;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 15px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .test {
                margin: auto;
                margin-bottom: 5px;
                margin-top: 5px;
                color: #818384;
            }
            .forum-subtitle {
                margin-left: 10px;
                font-size: large;
                color:#818384;
            }
            .card-title {
                color: #d7dadc;
            }
            .card-subtitle {
                color: #818384;
            }
            .display-4 {
                color: #d7dadc;
            }
            `,
        ]
    }

    fetch_data() {
        this.get_search_results(this.get_search_query());
    }

    get_search_query() {
        const urlParams = new URLSearchParams(window.location.search);
        return this.search_query = urlParams.get("q");
    }

    get_search_results() {
        fetch(`${window.MyAppGlobals.serverURL}s/${this.search_query}`)
        .then(res => res.json())
        .then(res => {
            this.allPosts = Object.values(res);
            this.result_amount = this.allPosts.length;
            console.log("Found Posts:")
            console.log(this.allPosts);
        })
        .catch(e => console.log(e))
    }

    render() {
        return html`
            <!-- DIN HTML HER -->
            <!-- Action: i HTML-formen er ikke nødvendig så lenge du bruker: -->
            <!-- Gi button din property: @click="${this.register}" -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
        
            <!-- Main page content -->
            <div class="container-fluid">
                <!-- Forum header -->
                <div class="row justify-content-center" style="background-color: #1a1a1b;">
                    <div class="col-5">
                        <h1 class="display-4" id="forum-title">Results for "${this.search_query}"</h1>
                        <h1 class="forum-subtitle" id="forum-address">${this.result_amount} matches found!</h1>
                    </div>
                </div>

                <!-- Posts -->
                <div id="post-col">
                    ${this.allPosts.map(i => html`<post-preview .pData=${i}></post-preview>`)}
                </div>
            </div>
        `;
    }
}
customElements.define("search-result", SearchResult);