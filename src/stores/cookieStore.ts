import { defineStore } from 'pinia';


export const useCookieStore = defineStore('cookie', {
    state: () => ({
        userCookie: '',
        username: '',
        password: '',
    }),
    actions: {
      acceptCookie(id:any) {
        this.userCookie = id;
      },
      setUserAndPassword(u:any,p:any){
        this.username = u;
        this.password = p;
      }
    },
  });