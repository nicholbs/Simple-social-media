/** 
 * Lit element for site navbar
 * 
 * Includes search fuctionality and a cookie for setting sort as datetime or votes
 * 
 * @author Oddbjørn S Borge-Jensen
 **/

import { LitElement, html, css } from 'lit-element';

export class NavBar extends LitElement {

    static get properties() {
        return {
			userData : Object,
			cookieProperty: {type: String}
        };
	}
    
    constructor() {
		super();
		this.cookieProperty = ";samesite=lax";
		this.iniSort();
	}

    render() {
        return html`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">ForumCenter</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
				  <!-- Home -->
				  <li class="nav-item active">
					<a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
				  </li>
				  <!-- User Info -->
				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  User Info
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <a class="dropdown-item" href="/login" onclick="setTimeout(location.reload.bind(location), 1)">login</a>
					  <a class="dropdown-item" href="/register" onclick="setTimeout(location.reload.bind(location), 1)">register</a>
					  <a class="dropdown-item" href="/settings" onclick="setTimeout(location.reload.bind(location), 1)">settings</a>
					</div>
				  </li>
				  <!-- Forum -->
				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Forum
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <a class="dropdown-item" href="/createForum" onclick="setTimeout(location.reload.bind(location), 1)">Create forum</a>
					</div>
				  </li>
				  <!-- Administer -->
				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Administer
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <a class="dropdown-item" href="/userList" onclick="setTimeout(location.reload.bind(location), 1)">List of users</a>
					  <a class="dropdown-item" href="/blocked" onclick="setTimeout(location.reload.bind(location), 1)">blocked</a>
					  <a class="dropdown-item" href="/requests" onclick="setTimeout(location.reload.bind(location), 1)">requests</a>
					</div>
				  </li>
				  <!-- Search -->
                  <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" id="searchKey" type="search" placeholder="Search" aria-label="Search">
                    <button @click="${this._searchPosts}" id="searchBtn" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                  </form>
				  <!-- Sort -->
				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Sort
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <button class="dropdown-item" @click="${this._setSortDate}">Time</button>
					  <button class="dropdown-item" @click="${this._setSortVote}">Votes</button>
					</div>
				  </li>
				</ul>
			  </div>
            </nav>
        `;
    }

	//Onclick event for search button
	_searchPosts() {
        location.href = '/search?q=' + this.shadowRoot.getElementById("searchKey").value;
	}
	//Initiates sort cookie if there is none
	iniSort() {
		const c = document.cookie;
		if(!c.split("; ").find(row => row.startsWith('sort'))){
			document.cookie = "sort=votes" + this.cookieProperty;
		}
	}
	//Sets sort cookie to datetime
	_setSortDate() {
		document.cookie = "sort=date" + this.cookieProperty;
		setTimeout(location.reload.bind(location), 1)
	}
	//Sets sort cookie to votes
	_setSortVote() {
		document.cookie = "sort=votes" + this.cookieProperty;
		setTimeout(location.reload.bind(location), 1)
	}
}
customElements.define("nav-bar", NavBar);