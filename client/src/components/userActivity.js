import { LitElement, html, css } from 'lit-element';

export class UserActivity extends LitElement {

    static get properties() {
        return {
            userPosts: {type: Array},
            userComments: {type: Array},
            userID: {type: Number}
        };
    }
    
    constructor() {
        super();
        this.userPosts = [];
        this.userComments = [];
        this.userID = 0;
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
        const sort = this.get_sort();
        const params = new URLSearchParams();
        this.userID = params.get("id");
        this.userPosts = get_posts(sort, userID);
        this.userComments = get_comments(sort, userID);
    }

    get_sort() {
        const c = document.cookie;
        return c.split("; ").find(row => row.startsWith("sort")).split("=")[1];
    }

    get_posts(sort, uid) {
        fetch(`http://localhost:8081/user/p/${uid}/${sort}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => { 
            return Object.values(res);  
        })
    }

    get_comments(sort, uid) {
        fetch(`http://localhost:8081/user/c/${uid}/${sort}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => { 
            return Object.values(res);  
        })
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
        
            <!-- Main page content -->
            <div class="container-fluid">
                <!-- Posts -->
                <div>
                    ${this.userPosts.map(i => html`<post-preview .pData=${i}></post-preview>`)}
                </div>

                <!-- Comments -->
                <div>
                    ${this.userComments.map(i => html`<post-preview .cData=${i}></post-preview>`)}
                </div>
            </div>
        `;
    }
}
customElements.define("user-activity", UserActivity);