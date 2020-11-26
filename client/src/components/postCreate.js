import { LitElement, html, css } from 'lit-element';

export class CreatePost extends LitElement {
    static get properties() {
        return {
            forum: {type: String},
        };
    }
    
    constructor() {
        super();
        this.forum = "games"
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
                                <form class="form" id="createPost">
                                    <h1 style="color: white">Register to forum</h1>
                                    <!--Første rad-->
                                    <div class="row mt-2">
                                        <div class="col">
                                            <label for="title" style="color: white">Title</label>
                                            <input name="title" class="form-control" id="title" placeholder="Post title..." required>
                                        </div>
                                    </div>
                                    <!--Andre rad-->
                                    <div class="row mt-2">
                                        <div class="col">
                                            <label for="content" style="color: white">Content</label>
                                            <input name="content" class="form-control" id="content" placeholder="Post content..." required>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <button type="button" @click="${this.createPost}" class="btn btn-primary">Create Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createPost(e) {
        let newPost = new FormData(e.target.form);
        e.preventDefault();
        newPost.append("forum", "Trains");  //Hardkoda for nå
        console.log("Creating post...");

        fetch('http://localhost:8081/createPost', {
            method: 'post',
            credentials: 'include',
            body: newPost
        })
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }
}
customElements.define("create-post", CreatePost);