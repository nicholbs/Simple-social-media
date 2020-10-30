import { LitElement, html, css } from 'lit-element';

export class PostPreview extends LitElement {

    static get properties() {
        return {
          myData:   { type: Object },
          image:    { type: String },
          title:    { type: String },
          user:     { type: String }
        };
      }
    
      constructor() {
        super();
        this.myData = {};
        this.image = "";
        this.title = "title";
        this.user = "user";
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

    render() {
        return html`
            <!-- DIN HTML HER -->
            <!-- Action: i HTML-formen er ikke nødvendig så lenge du bruker: -->
            <!-- Gi button din property: @click="${this.register}" -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
            
            <div class="row justify-content-center">
                <div class="col-6">
                    <div class="row-6">
                        <div class="card" style="border-color:#343536; border-width: 2px; margin-top: 20px;">
                            <div class="card-body" style="background-color:#1a1a1b;">
                                <div class="row">
                                    <!-- Upvote / downvote -->
                                    <div class="col-1">
                                        <div class="d-flex justify-content-center" style="transform: rotate(180deg)">
                                            <img src="https://www.flaticon.com/svg/static/icons/svg/60/60781.svg" class="img-icon">
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <h6 class="test">1500</h6>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <img src="https://www.flaticon.com/svg/static/icons/svg/60/60781.svg" class="img-icon">
                                        </div>
                                    </div>
                                    <!-- Post body -->
                                    <div class="col" onclick="location.href='#';" style="cursor: pointer;">
                                        <h5 class="card-title"> ${this.title} </h5>
                                        <h6 class="card-subtitle mb-2">Posted by u/${this.user} </h6>
                                        <img src="${this.image}" class="card-img" alt="post-image">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("post-preview", PostPreview);