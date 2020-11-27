import { LitElement, html, css } from 'lit-element';

export class PostComment extends LitElement {
    static get properties() {
        return {
            cData : Object,                 //Comment properties
            shown_vote: {type: Number},     //Front end vote
            showBlock: {type: Boolean},     //Toggles block functionality
            showDelete: {type: Boolean}     //Toggles delete functionality    
        };
    }
    
    constructor() {
        super();
        this.shown_vote = 0;
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

    _voteUp() {
        fetch(`http://localhost:8081/comments/${this.cData.cid}/vote/1`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.shown_vote += 1
    }
    _voteDown(){
        fetch(`http://localhost:8081/comments/${this.cData.cid}/vote/0`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.shown_vote -= 1
    }

    //Sets front end vote to show user
    firstUpdated() {
        this.shown_vote = this.cData.votes
    }

    render() {
        if(!this.cData.blocked) {
            return html`
                <div class="row justify-content-center">
                    <div class="col-6">
                        <div class="card" style="border-color:#343536; border-width: 2px; margin-top: 20px;">
                            <!-- Card -->
                            <div class="card-body" style="background-color:#1a1a1b;">
                                <div class="row justify-content-left">
                                    <!-- Upvote / downvote -->
                                    <div class="col-1 justify-content-center">
                                        <div class="d-flex justify-content-center" style="transform: rotate(180deg)">
                                            <input type="image" @click="${this._voteUp}" src="https://www.flaticon.com/svg/static/icons/svg/60/60781.svg" class="img-icon">
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <h6 class="test">${this.shown_vote}</h6>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <input type="image" @click="${this._voteDown}" src="https://www.flaticon.com/svg/static/icons/svg/60/60781.svg" class="img-icon">
                                        </div>
                                    </div>
                                    <!-- Profile picture -->
                                    <div class="col-auto">
                                        <img class="avatar" src="${this.cData.picture}">
                                    </div>
                                    <!-- Comment -->
                                    <div class="col">
                                        <h6 class="card-subtitle mb-2">
                                            <a onclick="setTimeout(location.reload.bind(location), 1)" href="/user?id=${this.cData.uid}">${this.cData.username}</a>
                                        </h6>
                                        <h5 class="card-title"> ${this.cData.content}</h5>
                                    </div>

                                    <div class="col-1">
                                        <button @click="${this.get_userType}">A</button>
                                        <h5>${this.showBlock ? html`<button type="button" @click="${this.blockComment}">Block</button>` : html``}</h5>
                                        <h5>${this.showDelete ? html`<button type="button" @click="${this.deleteComment}">Delete</button>` : html``}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    blockComment() {
        console.log("block cid: " + this.cData.cid)
        fetch('http://localhost:8081/blockComment',{
            method:'post',
            credentials: "include",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                cid: this.cData.cid 
            })
        })
        .then(location.reload.bind(location))
    }
    
    deleteComment() {
        console.log("delete cid: " + this.cData.cid)
        fetch('http://localhost:8081/deleteComment',{
            method:'post',
            credentials: "include",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                cid: this.cData.cid 
            })
        })
        .then(location.reload.bind(location))
    }

    get_userType() {    
        console.log("Her er comment_id: " + this.cData.cid)
        fetch('http://localhost:8081/checkUserType',{
            method:'post',
            credentials: "include",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ownerId: this.cData.uid 
            })    
        })
        .then(res => res.json())
        .then(res => {    
            var data = Object.values(res); 
            if(data[0] == true) {
                this.showBlock = true;
                console.log("Du er admin og kan slette + blocke")
            }
            if(data[1] == true) {
                this.showDelete = true;
                console.log("Du er eieren av post og kan slette")
            }
            if(data[1] == false) {
                console.log("Du må logge inn for å redigere")
            }
        })
    }
}
customElements.define("post-comment", PostComment);