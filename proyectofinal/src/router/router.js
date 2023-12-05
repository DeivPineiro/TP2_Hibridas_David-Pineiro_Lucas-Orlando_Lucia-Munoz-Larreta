import { createRouter, createWebHashHistory } from 'vue-router';

import Map from './../pages/Map.vue';
import Area from './../pages/Area.vue';
import EditArea from './../pages/EditArea.vue';
import UserAreas from './../pages/UserAreas.vue';
import IrAMapa from './../pages/IrAMapa.vue';
import Home from './../pages/Home.vue';
import Login from './../pages/Login.vue';
import Register from './../pages/Register.vue';
import Perfil from './../pages/Perfil.vue';
import WikiPlagues from './../pages/WikiPlagues.vue';
import WikiPlants from './../pages/WikiPlants.vue';
import WikiHome from './../pages/WikiHome.vue';
import PlagueDetails from './../pages/PlagueDetails.vue';
import { subscribeToAuth } from '../service/auth';

const routes = [

    { path: '/', component: Login},  
    { path: '/home', component: Home, meta:{Auth: true}},  
    { path: '/wiki_home', component: WikiHome, meta:{Auth: true}}, 
    { path: '/map', component: Map, meta:{Auth: true}},
    { path: '/area', component: Area, meta:{Auth: true}},
    { path: '/user/areas/editAreas', component: EditArea, meta:{Auth: true}},
    { path: '/user/areas', component: UserAreas, meta:{Auth: true}},
    { path: '/user/areas/irAMapa', component: IrAMapa, meta:{Auth: true}},
    { path: '/wiki_home/wiki_plagues', component: WikiPlagues, meta:{Auth: true}},
    { path: '/wiki_home/wiki_plants', component: WikiPlants, meta:{Auth: true}},    
    { path: '/wiki_home/wiki_plants/:idPlague', name: 'plagueDetails', component: PlagueDetails, meta:{Auth: true}},
    { path: '/login', component: Login},
    { path: '/register', component: Register},   
    { path: '/perfil', component: Perfil, meta:{Auth: true}}, 

];

const router = createRouter({   
    history: createWebHashHistory(),
    routes,
});

let user = {
    id: null,
    email: null,
    rol: null,
}

subscribeToAuth(newUser => user = newUser);
router.beforeEach((to, from)=>{
    if(user.id === null && to.meta.Auth){
        return '/login';        
    }
});

export default router;