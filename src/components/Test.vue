<template charset='utf-8'>
  <div class="test">
    <div class="test__content">
      <div class="content__status">
        <div v-for="(item, index) in results" :class="results[index] ? 'divGreen' : 'divRed'">
        </div>
      </div>
      <div class="content__task">
        <div class="task__quest">
          <span class="quest__text">{{currentTest.question}}</span>
        </div>
        <div class="task__answer">

          <label style="display:none">
            <input name="answer" type="radio" value="0" v-model="results[activeTest]">
            <span class="label__span">--Не выбран--</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="1" v-model="results[activeTest]">
            <span class="label__span">{{currentTest.answer1}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="2" v-model="results[activeTest]">
            <span class="label__span">{{currentTest.answer2}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="3" v-model="results[activeTest]">
            <span class="label__span">{{currentTest.answer3}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="4" v-model="results[activeTest]">
            <span class="label__span">{{currentTest.answer4}}</span>
          </label>

        </div>
        <div class="task__move">
          <button class="move__back" @click="prevTest()">Предыдущий вопрос</button>
          <button class="move__forward" @click="nextTest()">Следующий вопрос</button>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  data: function() {
    return {
      tests: '',
      results: [],
      activeTest: 0
    }
  },


  methods: {

    getTests: function() {
      let thisEnv = this;
      axios.get('http://localhost:3000/database/tests', {
        qua: 30,
      })
      .then(function (response) {
        //console.log(response);
        if (response.data && !thisEnv.tests) thisEnv.tests = response.data;
        if (response.data.length !== thisEnv.results.length) {
          thisEnv.results = [];
          response.data.forEach( ()=> thisEnv.results.push(0) );
        }
      })
      .catch(function (error) {
        console.log(error.data);
      });
    },


    nextTest: function() {
      if (this.activeTest < this.tests.length - 1) this.activeTest++;
      //console.log(this.activeTest, this.results[this.activeTest]);
    },

    prevTest: function() {
      if (this.activeTest > 0) this.activeTest--;
      //console.log(this.activeTest, this.results[this.activeTest]);
    }
  },


  computed: {
    currentTest: function() {
      return this.tests[this.activeTest];
    },

    classChanger: function(index) {
      if (this.results[index]) return 'divGreen';
      return 'divRed';
    }
  },


  mounted: function() {
    this.getTests();
  }
}
</script>

<style lang="scss">
  @import "../style/sass/main.scss";

  .content__status {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin-bottom: 15px;
    padding: 5px 10px;
    border: 2px solid $grey;

    border-radius: 15px;
    background-color: $black;
  }
  .content__status div {
    margin: 2px;
    width: 25px;
    height: 25px;
    border: 1px solid $white;

    border-radius: 5px;
  }
  .test__content {
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    align-items: center;
  }
  .content__task {
    display: flex;
    flex-flow: column nowrap;

    min-width: 380px;
    margin-bottom: 50px;
    border: 2px solid $grey;

    border-radius: 15px;
    color: $grey;
    background-color: $black;
    box-shadow: 3px 3px 15px $black;
  }
  .task__quest {
    margin: 20px 15px 15px 15px;
    border: 2px solid $orange;
    background: $grey;
    color: $black;
    border-radius: 5px;
  }
  .quest__text {
    display: block;
    margin: 10px 15px 10px 15px;
    font-family: "Arial", serif;
  }
  .task__answer {
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    margin: 0 15px 15px 15px;
  }
  .label__radio {
    display: none;
  }
  .label__span {
    display: block;
    margin-bottom: 10px;
    border: 1px solid $black;
    padding: 8px 15px;

    background: $grey;
    color: $black;
    border-radius: 5px;
    cursor: pointer;
    font-family: "Arial", serif;
    &:hover {
      border-color: $blue;
    }
  }
  .label__radio:checked + .label__span {
    border-color: $green;
  }
  .task__move {
    display: flex;
    justify-content: flex-start;
    flex-flow: row nowrap;
    margin: 0 15px 20px 15px;
  }
  .move__back,
  .move__forward {
    display: block;
    padding: 10px 15px;
    text-align: center;
    border: 2px solid $black;

    font-family: "Arial", serif;
    font-weight: bold;
    border-radius: 15px;
    text-decoration: none;
    box-shadow: 2px 2px 5px black;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;

    &:hover {
      color: $black;
      border-color: $blue;
    }
    &--center {
      @include center;
    }
  }
  .move__back {
    margin-right: 15px;
    background-color: $grey;
    border-color: $black;
    color: $black;
  }
  .move__forward {
    background-color: $grey;
    border-color: $black;
    color: $black;
  }
  .divRed {
    background-color: $red;
  }
  .divGreen {
    background-color: $green;
  }
</style>
