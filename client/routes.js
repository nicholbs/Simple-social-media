import {Router} from '@vaadin/router'; //importerer modul
//Her legges stien til litelementene
import '/src/components/userRegister.js' //For brukerregistrering
import '/src/components/settings.js' //Settings page
import '/src/components/retrievePosts.js'
import '/src/components/forum_post.js'
import '/src/components/forum_site.js'
import '/src/components/post_site.js'
import '/src/components/comment.js'
import '/src/components/commentCreate.js'
import '/src/components/mainPage.js'
import '/src/components/login.js'
import '/src/components/navbar.js'
import '/src/components/adminComponents/userList.js'
import '/src/components/adminComponents/userCard.js'
import '/src/components/adminComponents/requestsList.js'
import '/src/components/adminComponents/requestCard.js'
import '/src/components/searchResult.js'
import '/src/components/logout.js'
import '/src/components/postCreate.js'
import '/src/components/createForum.js'
import '/src/components/forumLink.js'
import '/src/components/adminComponents/blockedList.js'
import '/src/components/adminComponents/blockedComments.js'
import '/src/components/adminComponents/blockedPosts.js'
import '/src/components/userActivity.js'



			const outlet = document.getElementById('outlet'); //Rendrer innholdet i index.html
			const router = new Router(outlet);
			router.setRoutes([
			  {path: '/', component: 'main-page'},  //path er hvilken sti etter 8080 den skal ha, component er samme navnet siom lit elementet
			  {path: '/login', component: 'login-page'},  
			  {path: '/register', component: 'register-page'},  
			  {path: '/settings', component: 'settings-page'},
			  {path: '/userList', component: 'userlist-page'},
			  {path: '/forum', component: 'forum-site'},
			  {path: '/post', component: 'post-site'},
			  {path: '/requests', component: 'requests-page'},
			  {path: '/blocked', component: 'blocked-page'},
			  {path: '/administrer', component: 'admin-page'},
			  {path: '/search', component: 'search-result'},
			  {path: '/logout', component: 'logout-page'},
			  {path: '/user', component: 'user-activity'},
			  {path: '/createPost', component: 'create-post'},
			  {path: '/createForum', component: 'CreateForum-page'},
			]);

			
			
