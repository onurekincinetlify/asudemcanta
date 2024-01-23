<template>
  <div id="container">
    <div id="LoginForm">
      <div class="RightPart">
        <p>Yönetici Paneli</p>
      </div>
      <div class="LeftPart">
        <label for="text">Yönetici Adı</label>
        <input class="input" type="text" v-model="username" placeholder="Kullanıcı Adı">
        <label for="password">Yönetici Şifresi</label>
        <input class="input" type="password" v-model="password" placeholder="Şifre">
        <input type="submit" @click="login" value="Giriş Yap">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { useCookieStore } from "../stores/cookieStore";

var username = '';
var password = '';
const login = () => {
  axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADFmNu_NAM1I3lLVH5vSlFRCfHkcKu8NM", {
            email: username,
            password: password,
            returnSecureToken: true
        }).then((e:any) => {
                localStorage.setItem('userCookie', e.data.localId);
                localStorage.setItem('registered', e.data.registered);
                localStorage.setItem('email', e.data.email);
                useCookieStore().acceptCookie(e.data.localId);
                useCookieStore().setUserAndPassword(username, password);
                router.push('/panel');
        })
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');
#container{
    background-color:white;
    background-image: url(https://images.unsplash.com/photo-1682695795255-b236b1f1267d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: fixed;
    font-family: 'Quicksand', sans-serif;
}
#LoginForm {
  display: flex;
  margin: 0 auto;
  margin-top: 60px;
  width: 800px;
  height: 500px;
  border: 1px solid transparent;
  border-radius: 40px;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.363);
  .LeftPart {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    label{
      color:white;
    }
    label:first-of-type{
      margin-top: 100px;
    }
    input{
      width: 400px;
      display: block;
      background: none;
      border: 1px solid transparent;
      border-bottom-color: white;
      outline: none;
      color:white;
      text-align: center;

    }
    input:first-of-type{
      margin: 10px 0px 40px 0px;
    }
    input:last-of-type{ 
      margin: 10px 0px 0px 0px;
    }
    input[type="submit"]{
      width: 150px;
      height: 35px;
      border-radius: 10px;
      outline: none;
      background: black;
      border: 1px solid rgb(0, 0, 0);
      color:white;
      margin-top: 20px;
    }
  }
  
  .RightPart {
    flex: 0.1;
    width: 100%;
    height: 100%;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    background-color: black;
    p{
      text-align: center;
      color:hsl(0, 0%, 100%);
      font-size: 25px;
      padding: 2px 0px 0px 0px;
    }
  }
}

@media (max-width: 800px) {
  #LoginForm {
    display: flex;
    width: 100%;
    border-radius: 0px !important;
    margin: 0px; 
    height: 100vh;
  }
  input[type="text"]{
    width: 300px !important;
    color:white;
  }
  input[type="password"]{
    width: 300px !important;
    color:white;
  }
  #container{
    transform: scale(1.02);
  }
  .RightPart {
    border-top-right-radius: 0px !important; 
    border-top-left-radius: 0px !important; 
    flex: 0.08 !important; 
    display: flex;
    align-items: center; /* Dikey hizalama */
    justify-content: center; /* Yatay hizalama */
  }
  .LeftPart{
    flex: 1 !important;
  }
}

</style>
