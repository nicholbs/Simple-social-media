import {Router} from '@vaadin/router'; //importerer modul
//Her legges stien til litelementene
import './src/components/userRegister.js' //For brukerregistrering
import './src/components/settings.js' //Settings page
import './src/components/retrievePosts.js'

			const outlet = document.getElementById('outlet'); //Rendrer innholdet i index.html
			const router = new Router(outlet);
			router.setRoutes([
			  {path: '/', component: 'register-page'},  //path er hvilken sti etter 8080 den skal ha, component er samme navnet siom lit elementet
			  {path: '/', component: 'register-page'},
			  {path: '/settings', component: 'settings-page'}
 
			]);