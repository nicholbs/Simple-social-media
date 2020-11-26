import { LitElement, html, css } from 'lit-element';

export class CreateComment extends LitElement {
    static get properties() {
        return {
            avatar: {type: String},
            pid: {type: Number},
            uid: {type: Number}
        };
    }
    
    constructor() {
        super();
        this.pid = 0
    }

    static get styles() {
        return [
            css`
            input {
                width: auto;
            }
            img {
                object-fit:cover;
                max-width:100%;
                max-height:400px;
                width: auto;
                height: auto;
            }
            .avatar {
                width: 64px;
                height: 64px;
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

    render() {
        return html`
            <div class="row justify-content-center">
                <div class="col-6">
                    <div class="card" style="border-color:#343536; border-width: 2px; margin-top: 20px;">
                        <!-- Card -->
                        <div class="card-body" style="background-color:#1a1a1b;">
                            <!-- Form -->
                            <div class="row justify-content-left">
                                <div class="col">
                                    <form>
                                        <div><input id="content"></div>
                                        <button @click="${this.postComment}" id="postComment">Post comment</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async postComment(e) {
        //const newComment = new FormData(e.target.form);
        var eCon = this.shadowRoot.getElementById("content").value;
        var ePid = this.pid;
        var newComment = JSON.stringify({con: eCon, pid: ePid})
        e.preventDefault();
        console.log("Comment posted: \"" + eCon + "\"")

        var a = await fetch('http://localhost:8081/postComment',{
            method:'post',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: newComment
        })
        .then(function(response){
            return response.text();
        })
        .catch(function (error){
            console.log(error);
        })
        if(a)
            setTimeout(location.reload.bind(location), 1);
    }
}
customElements.define("create-comment", CreateComment);