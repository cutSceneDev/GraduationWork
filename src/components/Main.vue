<template>
    <div class="main">
      <div class="main__nav">
        <div class="nav__container">
          <h1 class="container__title">Student Tester</h1>
          <div class="container__list">
            <button class="list__key list__key--active" @click.prevent="popupShow('about')">О проекте</button>
            <router-link class="list__key" to='/'>Главная</router-link>
            <router-link class="list__key" to='/result'>Результаты</router-link>
            <button class="list__key list__key--active"
              @click.prevent="popupShow('admin')"
            >Админ панель</button>
          </div>
        </div>
      <div class="nav__popup">
        <div class="popup__back"
          v-if="popups.result || popups.about || popups.admin "
          @click="popupHide()"
        ></div>
        <div class="popup__result" v-if="popups.result">
          <h2 class="result__title">Результаты тестирования:</h2>
          <p class="result__text">Группа:
            <span class="result__group">{{userData.group}}</span>
          </p>
          <p class="result__text">Имя:
            <span class="result__name">{{userData.name}}</span>
          </p>
          <p class="result__text">Всего вопросов:
            <span class="result__total">{{userData.total}}</span>
          </p>
          <p class="result__text">Правильно:
            <span class="result__correct">{{userData.correct}}</span>
          </p>
          <p class="result__text">Ошибок:
            <span class="result__wrong">{{userData.wrong}}</span>
          </p>
          <p class="result__text">Рекомендованная оценка:
            <span class="result__mark">{{userData.mark}}</span>
          </p>
          <div class="result__buttons">
            <button class="list__key"
              @click="changeComp('main')"
            >Главная</button>
            <button class="list__key"
              @click="changeComp('result')"
            >Результаты</button>
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
          <input class="admin__input" id="login"
            v-model="formData.login" autofocus placeholder="Логин"
            maxlength="99" value="Artyr" type="text">
          <label class="admin__label" for="pass">Введите Пароль:</label>
          <input class="admin__input" id="pass"
            v-model="formData.password" type="password"
            placeholder="Пароль" maxlength="14">
          <p class="admin__wrong" v-if="popups.wrong">Wrong login or password, try again!</p>
          <button class="admin__button"
            @click="verifyLogin('admin')"
          >Войти</button>
        </div>
      </div>
      </div>
      <div class="main__router">
        <div class="router">
          <router-view @setUser="setUserInfo"
            @showResult="showResult"
            :userData="userData"
          ></router-view>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      popups: {
        result: false,
        about: false,
        admin: false,
        wrong: false
      },
      userData: {
        info: {
          name: '',
          group: ''
        },
        result: {

        }
      },
      formData: {
        login: 'Artyr',
        password: 'pass'
      },
      userData: {}
    }
  },

  methods: {
    showResult(resultData) {
      if (!resultData) return;
      this.setUserResult(resultData);
      this.popupShow('result');
    },
    popupShow(popup) {
      this.popups[popup] = true;
    },
    popupHide(comp) {
      this.popups.admin = this.popups.about = false;
      if (comp === 'result' || comp === 'main') {
        this.popups.result = false;
      }
    },
    verifyLogin(user) {
      this.axios.post('http://localhost:3000/database/auth', {
        login: this.formData.login,
        password: this.formData.password
      })
      .then( (response) => {
        if (response.data === true) {
          this.popups.wrong = false;
          this.changeComp(user)
        } else {
          this.popups.wrong = true;
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    setUserInfo(info) {
      if(!info) return;
      this.userData.name = info.name;
      this.userData.group = info.group;
    },
    setUserResult(results) {
      if(!results) return;
      this.userData = results;
    },
    changeComp(comp) {
      this.popupHide(comp);
      this.$router.push({name: comp, params: {access: true}});
    }
  }
}
</script>

<style lang="scss">
  @import "~normalize.css";
  @import "../style/sass/main.scss";
  body {
    min-width: 980px;
    background: $blue url("../style/img/blue.jpg") top center no-repeat fixed;
    background-size: cover;
    font-family: "Verdana", "Arial", sans-serif;
    user-select: none;
  }
  button,
  input {
    font-family: "Verdana", "Arial", serif;
  }
  .main__nav {
    background-color: black;
    margin-bottom: 30px;
  }
  .nav__container {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 980px;
  }
  .container__title {
    margin: 15px 100px 15px 15px;
    white-space: nowrap;
    color: $blue;
  }
  .container__list {
    display: flex;
    flex-flow: row nowrap;
    margin-right: 15px;
  }
  .list__key {
    @include navButton;
  }
  .popup__back {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .popup__result,
  .popup__about,
  .popup__admin {
    @include basicWindow;
    position: absolute;
    top: 120px;
    left: 50%;
    right: 50%;
    margin-left: -200px;
    z-index: 10;
    width: 400px;
  }
  .result__text {
    margin: 20px 20px 15px 15px;;
  }
  .result__name,
  .result__group {
    color: $yellow;
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
    color: $yellow;
  }
  .popup__admin {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0 15px;
  }
  .admin__label {
    margin-bottom: 5px;
    width: 80%;
    font-size: 16px;
  }
  .admin__input {
    width: 80%;
    margin-bottom: 15px;
    padding: 4px;
    &:focus {
      outline-color: $yellow;
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
    @include navButton;
    margin: 15px 0;
    padding: 10px 35px;
  }
  .router {
    margin: 0 auto;
    width: 800px;
  }
</style>
