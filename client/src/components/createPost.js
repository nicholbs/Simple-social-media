//LitElement for creating a post
import { LitElement, html, css } from '/client/node_modules/lit-element/lit-element';

export class CreatePost extends LitElement {
    
    //"styles" property of this lit-element specifies which styling is applied to the rendered html
    static styles = css`
    :host {
        display: block;
    }
    `;

    /*******************************************************************
     * Function sends a request with purpose of creating a new post
     * 
     * Values for the new post is generated from html form
     * Function is called when "@click" event is triggered
     * When event happens, the whole event is sent as param "e"
     * Data from html form is put into key/value container "FormData"
     * To retrieve values from html form: e.target.form
     * 
     * FormData is sent as "data" property inside "body" of http request
     * Method used is "POST" which always carries parameters in
     * the message body of the http request.
     * in contrast to "GET" parameters which are appended into URL
     * 
     * The rendered html contains the form which the new entry's
     * values are generated from
     * Important! the "input" element in form's name is the key
     * from which accesses the value inside FormData
     * 
     * @author Nicholas Bodvin Sellevaag
     ******************************************************************/
    sendPost(e) 
    {
    const data = new FormData(e.target.form)

    //"serverURL" is specified in "index.html" which this lit-element is loaded into, in practice: fetch('http://localhost:8081/createPost', 
    fetch(`${window.MyAppGlobals.serverURL}createPost`,
        {
        method: 'POST',
        body: data
        })
        .then(res => console.log("tilbake"))        //log message available from docker extension->nodejs, right click and "View Logs"
    }



    render() {
    console.log("hei");    //log message available from web-browser, inspect->console

    return html`
        <form class="form">
            <h1>Create a post</h1>
            <!--Første rad-->
            <div class="row mt-2">
                <div class="col">
                    <label for="postName">Tittel: </label>
                    <input type="text" name="postName">
                </div>
                <div class="col">
                    <label for="postContent">Skriv hva du vil poste :</label>
                    <input type="text" name="postContent">
                </div>
            </div>
            
            <div class="row mt-2">
                <button @click="${this.sendPost}" type="submit" class="btn btn-primary" >Submitt your post</button>
            </div>
        </form>                 
    `;
    }
}

//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('create-posts', CreatePost);     //'create-post' is the lit-element's name, can be seen in "index.html" as <create-posts>
