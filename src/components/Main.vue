<template>
    <div class="main">
      <div class="main__nav">
        <div class="nav__container nav__container--center">
          <h1 class="container__title">Student Tester</h1>
          <div class="container__list">
            <router-link class="list__key" to='/' @click="goToMain()">Основная</router-link>
            <button class="list__key list__key--active" @click.prevent="popupShow('about')">О проекте</button>
            <button class="list__key list__key--active" @click.prevent="popupShow('admin')">Админ панель</button>
          </div>
        </div>
        <div class="nav__popup">
          <div class="popup__back" v-if="popupAbout || popupAdmin" @click="popupHide()">
          </div>
          <div class="popup__about" v-if="popupAbout">
            <h2 class="about__title">О проекте</h2>
            <p class="about__info">Проект разработан в качестве дипломной работы учащегося в НМетАУ студента 4 курса Решетникова Артура в 2017г. Проект является SPA приложением с использованием библиотеки Vue.js и его основных плагинов, также в проекте используется JS, HTML, CSS(scss) и Webpack в качестве сборщика. Оригинал проекта храниться на:
              <a class="info__git" href="https://github.com/cutSceneDev/GraduationWork">github</a>
            </p>
        </div>
        <form class="popup__admin" action="http://localhost:3000/login" method="post" v-if="popupAdmin">
          <h2 class="admin__title">Вход в панель Администратора</h2>
          <label class="admin__label" for="login">Введите Логин:</label>
          <input class="admin__input" id="login" name="login"  v-model="login" autofocus placeholder="Логин" maxlength="28">
          <label class="admin__label" for="pass">Введите Пароль:</label>
          <input class="admin__input" id="pass" name="password" v-model="password" type="password" placeholder="Пароль" maxlength="28">
          <p class="admin__wrong" :style="{visibility: wrongDisplay}">Wrong login or password, try again!</p>
          <input  class="admin__button" type="submit" value="Войти">
          <span>@click="adminValidation()"</span>
        </form>
      </div>
      </div>
      <div class="main__router">
        <div class="router router--center">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
const Data = require('../data.json');

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
    adminValidation: function(event) {
      if (this.login === this.storeLogin && this.password === this.storePassword) {
        this.$router.push('/admin');
        this.popupHide();
      } else {
        this.wrongDisplay = "visible";
        window.event.preventDefault();
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../style/sass/main.scss";
  body {
    min-width: 980px;
    background: $blue url("../style/img/blue.jpg") top center no-repeat fixed;
    background-size: cover;
    font-family: "Georgia", "Times New Roman", serif;
  }
  .main__nav {
    background-color: black;
    margin-bottom: 30px;
  }
  .nav__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 980px;
    &--center{
      @include center;
    }
  }
  .container__title {
    white-space: nowrap;
    color: $blue;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 100px;
  }
  .container__list {
    display: flex;
    flex-flow: row nowrap;
  }
  .list__key {
    padding: 10px 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
    white-space: nowrap;
    border: 1px solid #999;
    font-size: 16px;

    background-color: #666;
    color: $grey;
    border-radius: 5px;
    text-decoration: none;
    font-family: "Georgia", "Times New Roman", serif;
    cursor: pointer;
    outline: none;

    &:hover,
    &--active:focus {
      border: 1px solid black;
      color: black;
      background-color: $orange;
    };
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
  .popup__about,
  .popup__admin {
    position: absolute;
    top: 120px;
    left: 50%;
    right: 50%;
    margin-left: -190px;
    z-index: 10;
    width: 400px;
    border: 2px solid $grey;
    background-color: black;
    color: $grey;
    border-radius: 15px;
  }
  .about__title,
  .admin__title {
    margin: 15px;
    text-align: center;
    color: $blue;
  }
  .about__info {
    margin: 15px;
  }
  .info__git,
  .info__git:visited {
    text-transform: uppercase;
    color: $orange;
  }
  .popup__admin {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
  }
  .admin__label {
    margin-bottom: 5px;
    width: 65%;
    font-size: 18px;
  }
  .admin__input {
    width: 65%;
    padding: 5px 10px;
    margin-bottom: 15px;
    &:focus {
      outline-color: $orange;
    }
  }
  .admin__wrong {
    display: block;
    text-transform: lowercase;
    font-size: 12px;
    margin: 0;
    margin-bottom: 15px;
    color: red;
  }
  .admin__button {
    display: block;
    margin-bottom: 15px;
    padding: 5px 35px;
    border: 2px solid #999;

    font-weight: bold;
    border-radius: 5px;
    color: $grey;
    background-color: #666;
    outline: none;
    cursor: pointer;

    &:hover {
      color: $orange;
      border: 2px solid $orange;
    }
  }
  .router {
    width: 800px;
    &--center{
      @include center;
    }
  }
</style>
