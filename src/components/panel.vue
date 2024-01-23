<template>
    <div id="container">
    <div id="LoginForm">
      <div class="RightPart">
        <p>Editör Paneli</p>
      </div>
      <div class="LeftPart">
        <label for="canta">Kategori</label>
        <div class="select">
          <select v-model="category">
            <option value="plajCantalari">Plaj Çantaları</option>
            <option value="kanvasCantalari">Kanvas Çantaları</option>
            <option value="hambezCantalari">Hambez Çantaları</option>
            <option value="sirtCantalari">Sırt Çantaları</option>
            <option value="sporCantalari">Spor Çantaları</option>
            <option value="gambocCantalari">Gamboç Kılıfları</option>
            <option value="ozelTasarimCantalari">Özel Tasarım Çantalar</option>
          </select>
        </div>
        <label for="title">Başlık {{ totalObject }}</label>
        <input class="input" id="title" type="text" v-model="title" placeholder="Başlık">
        <label for="title">Alt Başlık</label>
        <input class="input" id="title" type="text" v-model="subtitle" placeholder="Alt Başlık">
        <label for="title">Resim Adresi</label>
        <input class="input" id="title" type="text" v-model="imgurl" placeholder="https://x.com/civciv.png">
        <label for="title">Açıklama Yazısı</label>
        <textarea class="input" id="title" type="text" v-model="description" placeholder="Açıklama Yazısı"></textarea>
        <input type="submit" @click="yukle" value="Yükle">
      </div>
    </div>
  </div>
  </template>

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
  margin-top: 25px;
  width: 800px;
  height: 600px;
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
      margin: 10px 0px 5px 0px;
    }
    textarea{
      width: 300px;
      height: 90px;
    }
    input{
      width: 200px;
      display: block;
      background: none;
      border: 2px solid black;
      outline: none;
      color:white;
      text-align: center;

    }
    input::placeholder {
      color: white;
      opacity: 0.5;
      font-size: 15px;
    }
    input::-ms-input-placeholder {
      color: white;
      opacity: 0.5; 
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

<script lang="ts" setup>
import { useCookieStore } from "../stores/cookieStore";
import { ref } from "vue";
import axios from 'axios';

var category = ref();
var title = ref('');
var subtitle = ref('');
var imgurl = ref('');
var description = ref('');
var totalObject = '';
var products = []

axios.get("https://asudemcanta-default-rtdb.firebaseio.com/products.json").then(function(e){
     var data = e.data['-NoWMdA5BdknrLOSdSIq']; 
     var objeSayisi = Object.keys(data).length;
     totalObject = String(objeSayisi);
     products = e.data['-NoWMdA5BdknrLOSdSIq']
})
  
const yukle = () => {
  setTimeout(() => {
  axios.put("https://asudemcanta-default-rtdb.firebaseio.com/products/-NoWMdA5BdknrLOSdSIq/" + totalObject +'.json', {
    title: title.value,
  subtitle: subtitle.value,
  description: description.value,
  date: "28 Ocak 2024",
  imageSrc: imgurl.value,
  category: category.value
  })
       .then(function(response) {
         console.log("Ürün başarıyla eklendi:", response.data);
         alert('Ürün yüklendi.')
       })
       .catch(function(error) {
         console.error("Ürün eklenirken bir hata oluştu:", error);
         alert('Ürün yüklenirken bir hata ile karşılaşıldı.')
       });
     }, 2000);
}

</script>