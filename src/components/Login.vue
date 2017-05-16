<template>
  <div class="login">
    <div class="login__content">
      <div class="content__reg">
        <span class="reg__text-group">Выберите свою группу</span>
        <select class="reg__group" v-model="form.group">
          <option value="KN01-13-1">КН01-13-1</option>
          <option value="KN01-13-2">КН01-13-2</option>
          <option value="KN01-13-3">КН01-13-3</option>
        </select>
        <span class="reg__text-name">Введите свое имя/фамилию</span>
        <input class="reg__name" placeholder="Иван Громов" v-model="form.name">

      </div>
      <button v-on:click="show">11111111111111</button>
      <router-link class="login__test login__test--center" to='/test'>Начать тестирование</router-link>
    </div>
  </div>
</template>

<script>
const Data = require('../data.json')

export default {
  data: function() {
    return {
      form: {
        name: '',
        group: 'KN01-13-3'
      }
    }
  },
  methods: {
    show: function() {
      let name = this.check(this.form.name);
      let group = this.form.group;
      //console.log(name);
      if (name) {
        this.$emit(`show`, group, name);
      } else {
        this.form.name = 'Wrong name, try again!'
      }
    },
    check: function(name) {
      //console.log(name);
      if ( name.split(' ').length == 2 ) {
        for(let i = 0; i < name.length; i++) {
          let code = name.charCodeAt(i);
          console.log(code);
          if (code == 32 ||   //пробел
              code > 65 && code < 122 ||   //анг алфавит
              code > 1039 && code < 1104) {}  //ру алфавит
            else return;
        }
        return name.toLowerCase();
      }
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/sass/main.scss";
  .login__content {
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    align-items: center;
  }
  .content__reg {
    display: flex;
    flex-flow: column nowrap;

    width: 380px;
    margin-bottom: 30px;
    border: 2px solid $grey;

    border-radius: 15px;
    color: $grey;
    background-color: #000000;
    box-shadow: 3px 3px 15px #000000;
  }
  .reg__text-group {
    margin: 20px 15px 5px 15px;
  }
  .reg__group {
    margin: 0px 15px 20px 15px;
  }
  .reg__text-name {
    margin: 0px 15px 5px 15px;
  }
  .reg__name {
    margin: 0px 15px 25px 15px;
  }
  .login__test {
    display: block;
    padding: 10px 15px;
    margin-bottom: 45px;
    width: 350px;
    text-align: center;
    border-radius: 15px;
    border: 2px solid $grey;
    background-color: black;
    text-decoration: none;
    box-shadow: 2px 2px 5px black;
    color: $blue;
    text-transform: uppercase;
    outline: none;
    &:hover {
      color: $orange;
      border: 2px solid $orange;
    }
    &--center {
      @include center;
    }
  }
</style>
