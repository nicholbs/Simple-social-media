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
     * @function sendPost(e) - post user data into database
     * @see index.html - window.MyAppGlobals.serverURL 
     * @event e - The event generated from clicking the "submitt" button
     * @var data - Contains user data which was written into the form
     * @author Nicholas Bodvin Sellevaag
     ******************************************************************/
    sendPost(e) 
    {
    const data = new FormData(e.target.form)
    fetch(`${window.MyAppGlobals.serverURL}createPost`,
        {
        method: 'POST',
        body: data
        })


        .then(res => console.log("tilbake"))        //log message available from docker extension->nodejs, right click and "View Logs"
    }

    /****************************************************************
     * This code is the first to run when creating instance of object
     * 
     * Constructor is the function which is called before all else
     * when creating an instance of this lit-element.
     * Super() - Necessary in lit-element constructors. Have not used
     * it in practice yet, but can be applied to other functions you
     * create to ensure the function becomes part of the initial 
     * creation of the object (lit-element).
     * 
     * @author Nicholas Bodvin Sellevaag
     ***************************************************************/
    constructor() {
        super();
    };

    /************************************************
     * The HTML which is visible on pages is rendered
     * 
     * HTML is essentially simply lines of code, 
     * nothing else. For the content of a webpage 
     * to become "visible" the HTML code is 
     * interpreted by software inside the browser and
     * becomes instructions for the browser to create
     * figures and text form.
     * 
     * In other words, our lit-element's contain HTML
     * which needs to be rendered.
     * 
     * @see sendPost(e) - sendPost()
     * @author Nicholas Bodvin Sellevaag
     ***********************************************/
    render() {
    console.log("hei");    //log message available from web-browser, inspect->console
    return html`
    <div class="container">
        <form class="form">
                <h1>Create a post</h1>
                <div>
                    <div>
                        <label for="postName">Tittel: </label>
                        <input type="text" name="postName">
                    </div>
                    <div>
                        <label for="postContent">Skriv hva du vil poste :</label>
                        <input type="text" name="postContent">
                    </div>
                </div>
                
                <div>
                    <button @click="${this.sendPost}" type="submit" class="btn btn-primary" >Submitt your post</button>
                </div>
            </form>                 
    </div>
    `;
    }
}

//Important! DO NOT USE CAPITAL LETTERS IN A LIT-ELEMENT'S NAME
customElements.define('create-posts', CreatePost);     //'create-post' is the lit-element's name, can be seen in "index.html" as <create-posts>
