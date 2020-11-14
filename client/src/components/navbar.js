import { LitElement, html, css } from 'lit-element';

export class NavBar extends LitElement {

    static get properties() {
        return {
            
        };
      }
    
    constructor() {
    super();
    }

    _searchPosts(e) {
        location.href = '/search?q=' + this.shadowRoot.getElementById("searchKey").value;
    }

    render() {
        return html`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">fjesBokShi</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			  </button>
			
			  <div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
				  <li class="nav-item active">
					<a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
				  </li>
				  
			
				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Dropdown
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <a class="dropdown-item" href="/login">login</a>
					  <a class="dropdown-item" href="/register">register</a>
					  <a class="dropdown-item" href="/settings">settings</a>
					  <a class="dropdown-item" href="/administrer">administrer</a>
					</div>
				  </li>

				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Forum
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <a class="dropdown-item" href="/forum?name=Trains" onclick="setTimeout(location.reload.bind(location), 1)">Trains</a>
					  <a class="dropdown-item" href="/forum?name=games" onclick="setTimeout(location.reload.bind(location), 1)">Games</a>
					</div>
                  </li>
                  <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" id="searchKey" type="search" placeholder="Search" aria-label="Search">
                    <button @click="${this._searchPosts}" od="searchBtn" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                  </form>
				</ul>
			  </div>
            </nav>
        `;
    }

}
customElements.define("nav-bar", NavBar);