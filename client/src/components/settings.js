//LitElement for register page
//LitElement for register page
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class settingsPage extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`
     
     <div>
        <div class="d-flex justify-content-center"> 
                <form class="form" id="uplaodPicture" enctype="multipart/form-data">
                        <h1>Upload Picture</h1>
                        <div class="row mt-2">
                                <div class="col">
                                    <label for="photo2">Upload Picture</label>
                                    <input type="file" name="file" class="form-control-file" id="photo2" accept="image/*">
                                </div>
                                <div class="row mt-2">
                                        <button @click="${this.uploadPic}" class="btn btn-primary">set Prfoile Picture</button>
                                </div>
                            </div>  
                </form>
                     
        </div>

     </div>`;
    }
    uploadPic(e){
        const userPic = new FormData(e.target.form);
        console.log("event");

        fetch('http://localhost:8081/profilePicUpload',{
            method:'post',
            body:userPic
        })
        .then(function(response){
            return response.text();
        })
        .then(function (text){
            console.log(text);
            //Alt ok 
            if(text=='ok'){
                alert("Profilpicture uploaded");
            }
            //feil i multer
            else if(text=='errorMulter'){
                alert("Fatal error in multer - backend");
            }
            else if(text=='errorFileExt'){
                alert("Only jpg and png pictures allowed");
            }
            //annen uspesifikk feil
            else {
                alert("some other fatal error backend");
            }
           
        })
        .catch(function (error){
            console.log(error);
        })

    }
}
customElements.define('settings-page', settingsPage);