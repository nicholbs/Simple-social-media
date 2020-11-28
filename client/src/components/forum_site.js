/** 
 * Lit Element for forum page
 * 
 * @author Oddbjørn S Borge-Jensen
 **/

import { LitElement, html, css } from 'lit-element';

export class ForumSite extends LitElement {
    
    static get properties() {
        return {
            fData : Object,
            allPosts:  { type: Array },
            forum_url: { type: String },
            show: Object
        };
    }
    
    constructor() {
        super();
        this.fData = {};
        this.allPosts = [];
        this.fetch_data();
    }

    static get styles() {
        return [
            css`
            #createBtn {
                background-color: gray;
                border-color: orange;
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

    async fetch_data() {
        this.get_forum_data(this.get_forum_name(), this.get_sort())
    }

    //Gets forum name from url
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
            console.log(this.fData)
        })
        .then(this.get_posts(url_forum, this.get_sort()))
        .catch(e => console.log(e))
    }

    get_posts(url_forum, sort) {
        fetch(`${window.MyAppGlobals.serverURL}p/${url_forum}/${sort}`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {
            this.allPosts = Object.values(res);
            console.log("Forum Posts:")
            console.log(this.allPosts)
            this.show = true;
        })
        .catch(e => console.log(e))
    }

    //Chooses sort based on cookie
    get_sort() {
        const c = document.cookie;
        return c.split("; ").find(row => row.startsWith("sort")).split("=")[1];
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
                <div class="col justify-content-center" style="background-color: #1a1a1b;">
                    <div class="row justify-content-center">
                        <h1 class="display-4" id="forum-title">${this.fData.title}</h1>
                    </div>
                    <!-- Create post button -->
                    <div class="row justify-content-center">
                        <button id="createBtn" class="btn btn-primary" onclick="location.href='/createPost?forum=${this.fData.name}'">Create post</button>
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