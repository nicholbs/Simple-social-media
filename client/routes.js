import {Router} from '@vaadin/router'; //importerer modul
//Her legges stien til litelementene
import './src/components/userRegister.js' //For brukerregistrering
import './src/components/settings.js' //Settings page
import './src/components/retrievePosts.js'
import './src/components/mainPage.js'
import './src/components/login.js'
import './src/components/adminPage.js'

			const outlet = document.getElementById('outlet'); //Rendrer innholdet i index.html
			const router = new Router(outlet);
			router.setRoutes([
			  {path: '/', component: 'main-page'},  //path er hvilken sti etter 8080 den skal ha, component er samme navnet siom lit elementet
			  {path: '/login', component: 'login-page'},  //path er hvilken sti etter 8080 den skal ha, component er samme navnet siom lit elementet
			  {path: '/register', component: 'register-page'},  //path er hvilken sti etter 8080 den skal ha, component er samme navnet siom lit elementet
			  {path: '/settings', component: 'settings-page'},
			  {path: '/admin', component: 'admin-page'}
 
			]);

			