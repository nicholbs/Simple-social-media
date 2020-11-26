import { LitElement, html, css } from 'lit-element';

export class ForumSite extends LitElement {

    static get properties() {
        return {
            fData : Object,
            allPosts:  { type: Array },
            forum_url: { type: String },
            show: Object
            // userType: {type: String }
        };
    }
    
    constructor() {
    super();
    this.fData = {};
    this.allPosts = [];
    this.fetch_data();
    // this.get_userType();
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
        this.get_forum_data(this.get_forum_name())
    }

    get_forum_name() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("name");
    }

    get_forum_data(url_forum) {    
        fetch(`${window.MyAppGlobals.serverURL}f/${url_forum}`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {    
            this.fData = Object.values(res)[0]; 
            console.log("Forum Data:")
            console.log(this.fData);
        })
        .then(res => {
            this.get_posts(url_forum) 
        })
        .catch(e => console.log(e))
    }

    get_posts(url_forum) {
    fetch(`${window.MyAppGlobals.serverURL}p/${url_forum}/votes`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(res => {
            this.allPosts = Object.values(res);
            // console.log("Body type:   " + res.body.userType)
            console.log("Forum Posts:")
            console.log(this.allPosts);
            this.show = true;

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
                <!-- Forum banner -->
                
                <div class="row">
                    <img id ="forum-banner" src="${this.fData.banner}" alt="forum-banner" class="img-banner">
                </div>
                <!-- Forum header -->
                <div class="row justify-content-center" style="background-color: #1a1a1b;">
                    <div class="col-1">
                        <div class="row justify-content-center">
                            <img id="forum-icon" src="${this.fData.icon}" alt="forum-icon" class="img-forum-icon">
                        </div>
                    </div>
                    <div class="col-5">
                        <h1 class="display-4" id="forum-title">${this.fData.title}</h1>
                        <h1 class="forum-subtitle" id="forum-address">f/${this.fData.name}</h1>
                    </div>
                </div>

                <!-- Posts -->
                <div id="post-col">
                    ${this.show ? html`${this.allPosts.map(i => html`<post-preview .pData=${i}></post-preview>`)}` : html `<h1>You need to be logged in before you van view this forum's content</h1>`}
                </div>
                    
               
            </div>
        `;
    }
}
customElements.define("forum-site", ForumSite);