import { LitElement, html, css } from 'lit-element';

export class PostPreview extends LitElement {

    static get properties() {
        return {
            pData : Object,
            post_id: {type: Number},
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
        fetch(`http://localhost:8081/post/${this.pData.pid}/vote/1`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.shown_vote += 1
    }
    _voteDown(){
        fetch(`http://localhost:8081/post/${this.pData.pid}/vote/0`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.shown_vote -= 1
    }

    firstUpdated() {
        this.shown_vote = this.pData.votes
    }

    render() {
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
<<<<<<< HEAD
                                    <div class="d-flex justify-content-center">
                                        <h6 class="test">${this.shown_vote}</h6>
=======
                                        <div>
                                            <button @click="${this.get_userType}">Settings</button>
                                            <h5>${this.showBlock ? html`<button>blocked</button>` : html``}</h5>
                                            <h5>${this.showDelete ? html`<button>Delete</button>` : html``}</h5>
                                        </div>
                                    <!-- Post body -->
                                    <div class="col" onclick="location.href='#';" style="cursor: pointer;">
                                        <h5 class="card-title"> ${this.pData.title} </h5>
                                        <h6 class="card-subtitle mb-2">Posted by u/${this.pData.email} </h6>
                                        <img src="${this.pData.image}" class="card-img" alt="post-image">
>>>>>>> 504d053c3f1bc14b15f9cc281eed15da671985fb
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <input type="image" @click="${this._voteDown}" src="https://www.flaticon.com/svg/static/icons/svg/60/60781.svg" class="img-icon">
                                    </div>
                                </div>
                                <!-- Post title -->
                                <div class="col" onclick="location.href='/post?id=${this.pData.pid}';" style="cursor: pointer;">
                                    <h5 class="card-title"> ${this.pData.title} </h5>
                                    <h6 class="card-subtitle mb-2">Posted by u/${this.pData.username} </h6>
                                </div>
                            </div>
                            <!-- Post image -->
                            <div class="row justify-content-center">
                                <div class="d-flex justify-content-center">
                                    <img src="${this.pData.image}" class="card-img" alt="post-image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    get_userType() {    

        console.log("Du er i forum post, her er post_id: " + this.pData.uid)
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
customElements.define("post-preview", PostPreview);