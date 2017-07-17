<template>
  <div class="login">
    <div class="login__content">
      <div class="content__reg">
        <label class="reg__text-group form-label" for="group" >Выберите свою группу:</label>
        <select class="reg__group form-input" id="group" v-model="formData.group">
          <option value="KN01-13-1">КН01-13-1</option>
          <option value="KN01-13-2">КН01-13-2</option>
          <option value="KN01-13-3">КН01-13-3</option>
        </select>
        <label class="reg__text-name form-label" for="name-input">Введите свое имя и фамилию:</label>
        <input class="reg__name form-input" 
          id="name-input" 
          placeholder="Иван Громов" 
          v-model="formData.name">
      </div>
      <button class="login__test" @click="createUser">Начать тестирование</button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: 'Artyr Reshetnikov',
        group: 'KN01-13-3'
      }
    }
  },
  methods: {
    createUser() {
      if ( this.check(this.formData.name) ) {
        this.$router.push({
          name: 'test',
          query: {
            name: this.formData.name,
            group: this.formData.group
          }
           });
      } else {
        this.formData.name = 'Wrong name, try again!'
      }
    },
    check(name) {
      if ( name.split(' ').length != 2 ) return;
        for(let i = 0; i < name.length; i++) {
          let code = name.charCodeAt(i);
          if ((code !== 32) &&   //пробел
              (code < 65 || code > 122 &&   //анг алфавит
              code < 1039 || code > 1104)) {  //ру алфавит
            return
          }
        }
      return name.toLowerCase();
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/sass/main.scss";

  .content__reg {
    margin: 30px auto;
    @include basicWindow;
    width: 320px;
    padding: 10px 50px 10px 20px;
  }
  .form-label,
  .form-input {
    width: 100%;
    margin: 5px 0;
    display: block;
  }
  .form-input {
    margin-bottom: 15px;
  }
  .login__test {
    @include mainButton;
  }
</style>
