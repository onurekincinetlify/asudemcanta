import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import panelSystem from '@/components/panelSystem.vue';
import panel from '@/components/panel.vue';
import { useCookieStore } from "../stores/cookieStore";
import axios from 'axios';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: panelSystem
  },
  {
    path: '/panel',
    name: 'login',
    component : panel
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.name == 'login'){
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADFmNu_NAM1I3lLVH5vSlFRCfHkcKu8NM", {
            email: useCookieStore().$state.username,
            password: useCookieStore().$state.password,
            returnSecureToken: true
        }).then((e:any) => {
          if(localStorage.getItem('registered') && useCookieStore().$state.userCookie === e.data.localId){
            console.log(useCookieStore().$state.userCookie)
            console.log(e.data.localId)
            next(true);
          } else {
            router.push('/')
            next(true);
          }
        }).catch((e)=>{
          router.push('/')
          next(true);
        })
  } else {
    next(true);
  }
})

export default router
