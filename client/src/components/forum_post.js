import { LitElement, html, css } from 'lit-element';

export class PostPreview extends LitElement {

    static get properties() {
        return {
            pData : Object,
            shown_vote: {type: Number},
            showBlock: {type: Boolean},
            showDelete: {type: Boolean}
         
        };
      }
    
    constructor() {
        super();
        this.shown_vote = 0;
        // this.showButton = true;
    }

    static get styles() {
        return [
            css`
            .card-text {
                color:white;
            }
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

    _voteUp() {
        fetch(`http://localhost:8081/posts/${this.pData.pid}/vote/1`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.shown_vote += 1
    }
    _voteDown(){
        fetch(`http://localhost:8081/posts/${this.pData.pid}/vote/0`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.shown_vote -= 1
    }

    connectedCallback() {
        super.connectedCallback()
        if(this.pData.votes != null)
            this.shown_vote = this.pData.votes
    }

    render() {
        if(!this.pData.blocked) {
            return html`
                <!-- DIN HTML HER -->
                <!-- Action: i HTML-formen er ikke nødvendig så lenge du bruker: -->
                <!-- Gi button din property: @click="${this.register}" -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
                
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
                                    <!-- Post title -->
                                    <div class="col" onclick="location.href='/post?id=${this.pData.pid}';" style="cursor: pointer;">
                                        <h5 class="card-title"> ${this.pData.title} </h5>
                                        <h6 class="card-subtitle mb-2">Posted by ${this.pData.username} </h6>
                                    </div>
                                    <div class="col-1">
                                        <button @click="${this.get_userType}">A</button>
                                        <h5>${this.showBlock ? html`<button @click="${this.blockPost}" onclick="setTimeout(location.reload.bind(location), 1)">Block</button>` : html``}</h5>
                                        <h5>${this.showDelete ? html`<button @click="${this.deletePost} " onclick="setTimeout(location.reload.bind(location), 1)">Delete</button>` : html``}</h5>
                                    </div>
                                </div>
                                <!-- Post content -->
                                <div id="postContent" class="row justify-content-center">
                                    <h6 class ="card-text">${this.pData.content}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    blockPost() {
        console.log("pid: " +this.pData.pid);
        fetch('http://localhost:8081/blockPost',{
            method:'post',
            credentials: "include",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                pid: this.pData.pid 
            })  
        })
    }

    deletePost() {
        fetch('http://localhost:8081/deletePost',{
                method:'post',
                credentials: "include",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    pid: this.pData.pid 
            })
        })
    }

    get_userType() {    

        console.log("Du er i get_userType, her er post_pid: " + this.pData.pid)
        console.log("Du er i get_userType, her er post_uid: " + this.pData.uid)
        var uid = this.pData.uid;
        fetch('http://localhost:8081/checkUserType',{
            method:'post',
            credentials: "include",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                ownerId: this.pData.uid 
              })
            
            
        }).then(res => res.json())
        .then(res => {    
            var data = Object.values(res); 

            if(data[0] == true) {
                this.showBlock = true;
            }
            if(data[1] == true) {
                this.showDelete = true;
            }
            if(data[1] == false) {
                alert("You are not the post's user or a server admin/moderator and can therefore not delete this post")
            }
        })
    }
}
customElements.define("post-preview", PostPreview);