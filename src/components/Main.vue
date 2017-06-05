<template>
    <div class="main">
      <div class="main__nav">
        <div class="nav__container nav__container--center">
          <h1 class="container__title">Student Tester</h1>
          <div class="container__list">
            <button class="list__key list__key--active" @click.prevent="popupShow('about')">О проекте</button>
            <router-link class="list__key" to='/'>Главная</router-link>
            <router-link class="list__key" to='/result'>Результаты</router-link>
            <button class="list__key list__key--active" @click.prevent="popupShow('admin')">Админ панель</button>
          </div>
        </div>
      <div class="nav__popup">
        <div class="popup__back" v-if="popups.result || popups.about || popups.admin " @click="popupHide()"></div>
        <div class="popup__result" v-if="popups.result">
          <h2 class="result__title">Результаты тестирования:</h2>
          <p class="result__text">Группа: <span class="result__group">{{userData.group}}</span></p>
          <p class="result__text">Имя: <span class="result__name">{{userData.name}}</span></p>
          <p class="result__text">Всего вопросов: <span class="result__total">{{userData.total}}</span></p>
          <p class="result__text">Правильно: <span class="result__correct">{{userData.correct}}</span></p>
          <p class="result__text">Ошибок: <span class="result__wrong">{{userData.wrong}}</span></p>
          <p class="result__text">Рекомендованная оценка: <span class="result__mark">{{userData.mark}}</span></p>
          <div class="result__buttons">
            <button class="list__key" @click="changeComponent('main')">Главная</button>
            <button class="list__key" @click="changeComponent('result')">Результаты</button>
          </div>
        </div>
        <div class="popup__about" v-if="popups.about">
          <h2 class="about__title">О проекте</h2>
          <p class="about__info">Проект разработан в качестве дипломной работы учащегося в НМетАУ студента 4 курса Решетникова Артура в 2017г.<br>
          Програмный продукт являеться полноценным SPA приложением написаном на JavaScript, HTML, CSS(scss). В качестве библиотек/фреймворков проект использует Vue js(Router, Axios), Node js(MySQL, Express) и Webpack в качестве сборщика.<br>
          Оригинал проекта храниться на:
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
          <button class="admin__button" @click="loginUser('admin')">Войти</button>
        </div>
      </div>
      </div>
      <div class="main__router">
        <div class="router router--center">
          <router-view @setUser="setUserInfo" @showResult="showResult" :userData="userData"></router-view>
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
        result: false,
        about: false,
        admin: false,
        wrong: false
      },
      auth: {
        login: 'Artyr',
        password: 'pass'
      },
      userData: {}
    }
  },
  methods: {
    showResult: function(resultData) {
      if (!resultData) return;
      this.setUserResult(resultData);
      this.popupShow('result');
    },
    popupShow: function(popup) {
      this.popups[popup] = true;
    },
    popupHide: function(comp) {
      this.popups.admin = this.popups.about = false;
      if (comp === 'result' || comp === 'main') this.popups.result = false;
    },
    loginUser: function(user) {
      this.dbgetAccess( (acces) => {
        if (!acces) {
          this.popups.wrong = true;
          return;
        }
        this.popups.wrong = false;
        this.changeComponent(user)
      });
    },
    dbgetAccess: function(goAuth) {
      axios.post('http://localhost:3000/database/auth', {
        login: this.auth.login,
        password: this.auth.password
      })
      .then(function (response) {
        goAuth(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setUserInfo: function(info) {
      if(!info) return;
      this.userData.name = info.name;
      this.userData.group = info.group;
    },
    setUserResult: function(results) {
      if(!results) return;
      this.userData.total = results.total;
      this.userData.correct = results.correct;
      this.userData.wrong = results.wrong;
      this.userData.mark = results.mark;
    },
    changeComponent: function(comp) {
      this.popupHide(comp);
      this.$router.push({name: comp, params: {access: true}});
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
    font-family: "Verdana", "Arial", sans-serif;
  }
  button,
  input {
    font-family: "Verdana", "Arial", sans-serif;
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
  .popup__result,
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
    border-radius: 15px;

    background-color: black;
    color: $grey;
  }
  .popup__result {

  }
  .result__text {
    margin: 20px 20px 15px 15px;;
  }
  .result__name,
  .result__group {
    color: $orange;
  }
  .result__total {
    color: $blue;
  }
  .result__correct {
    color: $green;
  }
  .result__wrong {
    color: $red;
  }
  .result__mark {
    color: $yellow;
  }
  .result__title,
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
