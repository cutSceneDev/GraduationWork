<template>
    <div class="main">
      <div class="main__nav">
        <div class="nav__container nav__container--center">
          <h1 class="container__title">Student Tester</h1>
          <div class="container__list">
            <router-link class="list__key" to='/'>Основная</router-link>
            <button class="list__key list__key--active" @click.prevent="popupShow('about')">О проекте</button>
            <button class="list__key list__key--active" @click.prevent="popupShow('admin')">Админ панель</button>
          </div>
        </div>
        <div class="nav__popup">
          <div class="popup__back" v-if="popups.about || popups.admin" @click="popupHide()">
          </div>
          <div class="popup__about" v-if="popups.about">
            <h2 class="about__title">О проекте</h2>
            <p class="about__info">Проект разработан в качестве дипломной работы учащегося в НМетАУ студента 4 курса Решетникова Артура в 2017г. Проект является SPA приложением с использованием библиотеки Vue.js и его основных плагинов, также в проекте используется JS, HTML, CSS(scss) и Webpack в качестве сборщика. Оригинал проекта храниться на:
              <a class="info__git" href="https://github.com/cutSceneDev/GraduationWork">github</a>
            </p>
        </div>
        <div class="popup__admin" v-if="popups.admin">
          <h2 class="admin__title">Вход в панель Администратора</h2>
          <label class="admin__label" for="login">Введите Логин:</label>
          <input class="admin__input" id="login" v-model="auth.login" autofocus placeholder="Логин" maxlength="14" value="Artyr" type="text">
          <label class="admin__label" for="pass">Введите Пароль:</label>
          <input class="admin__input" id="pass" v-model="auth.password" type="password" placeholder="Пароль" maxlength="14">
          <p class="admin__wrong" v-if="popups.wrong">Wrong login or password, try again!</p>
          <button class="admin__button" @click="verifyUser('admin')">Войти</button>
        </div>
      </div>
      </div>
      <div class="main__router">
        <div class="router router--center">
          <router-view v-on:show="showMsg"></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      popups: {
        about: false,
        admin: false,
        wrong: false
      },
      auth: {
        login: 'Artyr',
        password: 'pass'
      }

    }
  },
  methods: {
    popupShow: function(popup) {
      this.popups[popup] = true;
    },
    popupHide: function() {
      this.popups.admin = this.popups.about = false;
    },
    verifyUser: function(user) {
      this.getAccessDB( (acces) => {
        if (!acces) {
          this.popups.wrong = true;
          return;
        }
        this.popups.wrong = false;
        this.popupHide();
        this.$router.push('/' + user);
      });
    },
    getAccessDB: function(goAuth) {
      axios.post('http://localhost:3000/database/authAdmin', {
        login: this.auth.login,
        password: this.auth.password
      })
      .then(function (response) {
        goAuth(response.data);
      })
      .catch(function (error) {
        //console.log(error.data);
      });
    },
    showMsg: function(group, name) {
      console.log(group, name);
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
    margin: 15px 100px 15px 15px;
  }
  .container__list {
    display: flex;
    flex-flow: row nowrap;
    margin-right: 15px;
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
    margin: 15px 15px 10px 15px;
    text-align: center;
    color: $blue;
  }
  .about__info {
    margin: 0px 15px 25px 15px;
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
    margin: 0;
    font-size: 12px;

    text-transform: lowercase;
    color: red;
  }
  .admin__button {
    display: block;
    margin: 15px 0;
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
