import { LitElement, html, css } from 'lit-element';

export class PostSite extends LitElement {
    static get properties() {
        return {
            pData : Object,
            allComments: { type: Array }
        };
    }
    
    constructor() {
    super();
    this.pData = {};
    this.allComments = [];
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

    async fetch_data() {
        this.get_post_data(this.get_post_id(), this.get_sort())
    }

    get_post_id() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    get_post_data(pid, sort) {    
        fetch(`${window.MyAppGlobals.serverURL}p/${pid}`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {    
            this.pData = Object.values(res)[0]; 
            console.log("Post Data:")
            console.log(this.pData);
        })
        .catch(e => console.log(e))

        fetch(`${window.MyAppGlobals.serverURL}c/${pid}/${sort}`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {    
            this.allComments = Object.values(res); 
            console.log("Comment Data:")
            console.log(this.allComments);
        })
        .catch(e => console.log(e))
    }

    get_sort() {
        const c = document.cookie;
        return c.split("; ").find(row => row.startsWith("sort")).split("=")[1];
    }

    render() {
        return html`
            <post-preview .pData=${this.pData} .shown_vote=${this.pData.votes}></post-preview>
            <create-comment .pid=${this.pData.pid} .avatar=${this.pData.picture}></create-comment>
            <!-- Posts -->
            <div id="post-col">
                ${this.allComments.map(i => html`<post-comment .cData=${i}></post-comment>`)}
            </div>
        `;
    }
}
customElements.define("post-site", PostSite);