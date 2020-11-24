import { LitElement, html, css } from 'lit-element';

export class PostComment extends LitElement {
    static get properties() {
        return {
            cData : Object,
            shownVote: {type: Number}
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

    firstUpdated() {
        this.shown_vote = this.cData.votes
    }

    render() {
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
                                <!-- Comment -->
                                <div class="col">
                                    <h6 class="card-subtitle mb-2">${this.cData.content}</h6>
                                    <h5 class="card-title"> ${this.cData.username}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("post-comment", PostComment);