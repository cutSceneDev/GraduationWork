<template>
  <div>
    <div class="main-nav">
      <div class="main-nav__container">
        <div class="main-nav__title title">
          <h1 class="title__main">Student Tester</h1>
        </div>
        <div class="main-nav__navigation navigation">
          <router-link class="navigation__key active" to='/' @click="goToMain()">Основная</router-link>
          <button class="navigation__key btn__focus" @click.prevent="popupShow('about')">О проекте</button>
          <button class="navigation__key btn__focus" @click.prevent="popupShow('admin')">Админ панель</button>
        </div>
      </div>
    </div>
    <div class="router-content">
      <div class="router-content__wrap">
        <router-view></router-view>
      </div>
    </div>
    <div class="popup__back" v-if="popupAbout || popupAdmin" @click="popupHide()">
    </div>
    <div class="popup__about" v-if="popupAbout">
      <h2 class="about__title">О проекте</h2>
      <p class="about__info">Проект разработан в качестве дипломной работы учащегося в НМетАУ студента 4 курса Решетникова Артура в 2017г. Проект является SPA приложением с использованием библиотеки Vue.js и его основных плагинов, также в проекте используется JS, HTML, CSS(scss) и Webpack в качестве сборщика. Оригинал проекта храниться на <a class="git-href" href="https://github.com/cutSceneDev/GraduationWork">github.com/cutSceneDev/GraduationWork</a></p>
    </div>
    <div class="popup__admin" v-if="popupAdmin">
      <h2 class="admin__title">Вход в панель Администратора</h2>
      <form class="admin-form" action="" method="get">
        <div class="admin-form__wrap">
          <label class="admin-form__login-label" for="login">Введите Логин:</label>
          <input class="admin-form__login-input" id="login" name="login" v-model="login" placeholder="Логин" autofocus maxlength="16">
          <label class="admin-form__pass-label" for="pass">Введите Пароль:</label>
          <input class="admin-form__pass-input" id="pass" name="password" v-model="password" type="password" placeholder="Пароль" maxlength="16">
          <p class="wrong" :style="{visibility: wrongDisplay}">Wrong login or password, try again!</p>
          <input @click="submitValidation()" class="admin-form__submit" type="button" value="Войти">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
let Data = require('../data.json');
module.exports = {
  data: function() {
    return {
      storeLogin: 'Artyr',
      storePassword: 'hello',
      popupAbout: false,
      popupAdmin: false,
      wrongDisplay: "hidden",
      login: Data.validation.login,
      password: Data.validation.password,
    }
  },
  methods: {
    popupShow: function(name) {
      if (name === 'about') this.popupAbout = true
      if (name === 'admin') this.popupAdmin = true
    },
    popupHide: function() {
      this.popupAdmin = this.popupAbout = false;
    },
    goToMain: function(event) {
      if (window.location.href == 'http://localhost:8080/') {
        window.event.preventDefault();
      };
    },
    submitValidation: function(event) {
      if (this.login === this.storeLogin && this.password === this.storePassword) {
        alert('enter');
      } else {
        this.wrongDisplay = "visible";
        window.event.preventDefault();
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../style/sass/colors.scss";

  html {
    width: 100%;
    height: 100%;
  }
  body {
    min-width: 960px;
    color: white;
    font-size: 16px;
    background: $blue url("../style/img/blue.jpg") top center no-repeat;
    background-size: cover;
    height: 100%;
    font-family: "Georgia", "Times New Roman", serif;
  }
  a,
  button {
    font-family: "Georgia", "Times New Roman", serif;
  }
  .main-nav {
    background-color: black;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    margin-bottom: 25px;
  }
  .main-nav__container {
    display: flex;
    justify-content: space-between;
    width: 960px;
  }
  .navigation {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
  }
  .navigation__key {
    background-color: #666;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    color: $grey;
    margin: 15px 10px;
    text-decoration: none;
  }
  .navigation__key:hover,
  .btn__focus:focus {
    background-color: $orange;
    color: black;
    border: 1px solid black;
    cursor: pointer;
    outline: none;
  }
  .title__main {
    color: $blue;
    margin: 15px 10px;
  }
  .router-content {
    display: flex;
    justify-content: center;
    align-content: flex-start;
  }
  .router-content__wrap {
    width: 960px;
  }
  .popup__center-wrap {
    display: flex;
    justify-content: flex-start;
  }
  .popup__about,
  .popup__admin {
    position: absolute;
    top: 120px;
    left: 50%;
    right: 50%;
    margin-left: -190px;
    z-index: 10;
    width: 380px;
    border: 2px solid $grey;
    background-color: black;
    color: $grey;
    border-radius: 15px;
    box-shadow: 3px 3px 15px black;
  }
  .about__title,
  .admin__title {
    margin: 15px 0px;
    text-align: center;
    color: $blue;
  }
  .about__info {
    padding: 0 15px;
  }
  .popup__back {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  .git-href,
  .git-href:visited {
    color: $orange;
  }
  .admin-form__wrap {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .admin-form__login-input,
  .admin-form__pass-input {
    width: 250px;
    padding: 5px 10px;
  }
  .admin-form__login-input {
    margin-bottom: 15px;
  }
  .admin-form__submit {
    font-weight: bold;
    background-color: #666;
    border: 2px solid #999;
    border-radius: 5px;
    padding: 5px 35px;
    font-size: 16px;
    color: $grey;
    text-decoration: none;
    outline: none;
    margin-bottom: 15px;
  }
  .admin-form__submit:visited {
    color: $blue;
  }
  .admin-form__submit:hover {
    color: $orange;
    border: 2px solid $orange;
  }
  .wrong {
    display: block;
    text-transform: lowercase;
    color: red;
    font-size: 12px;
  }
</style>
