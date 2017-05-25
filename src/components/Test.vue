<template charset='utf-8'>
  <div class="test">
    <div class="test__content">
      <div class="content__task">
        <div class="task__quest">
          <span class="quest__text">{{currentTest.question}}</span>
        </div>
        <div class="task__answer">
          <label style="display:none"><input name="answer" type="radio" value="0" checked><span class="label__span">--Не выбран--</span></label>
          <label class="answer__label"><input class="label__radio" name="answer" type="radio" value="1"><span class="label__span">{{currentTest.answer1}}</span></label>
          <label class="answer__label"><input class="label__radio" name="answer" type="radio" value="2"><span class="label__span">{{currentTest.answer2}}</span></label>
          <label class="answer__label"><input class="label__radio" name="answer" type="radio" value="3"><span class="label__span">{{currentTest.answer3}}</span></label>
          <label class="answer__label"><input class="label__radio" name="answer" type="radio" value="4"><span class="label__span">{{currentTest.answer4}}</span></label>
        </div>
        <div class="task__move">
          <button class="move__back" @click="">Предыдущий вопрос</button>
          <button class="move__forward" @click="">Следующий вопрос</button>
        </div>
      </div>
      <div class="content__results">

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
      results: '',
      currentNumber: 3
    }
  },
  methods: {
    showTests: function() {
      console.log(this.tests);
    },
    getTests: function() {
      let thisEnv = this;
      axios.get('http://localhost:3000/database/tests', {
        qua: 30,
      })
      .then(function (response) {
        thisEnv.tests = response.data;
      })
      .catch(function (error) {
        console.log(error.data);
      });
    }
  },
  computed: {
    currentTest: function() {
      return this.tests[this.currentNumber];
    }
  },
  mounted: function() {
    this.getTests();
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/sass/main.scss";
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
    margin-bottom: 30px;
    border: 2px solid $grey;

    border-radius: 15px;
    color: $grey;
    background-color: $black;
    box-shadow: 3px 3px 15px $black;
  }
  .task__quest {
    margin: 20px 15px 15px 15px;
    border: 3px solid $blue;
    background: $grey;
    color: $black;
    border-radius: 5px;
  }
  .quest__text {
    display: block;
    margin: 10px 15px 10px 15px;
  }
  .task__answer {
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    margin: 0 15px 15px 15px;
  }
  .answer__label {
    margin: 7px 0;
    background: $grey;
    color: $black;
    border-radius: 5px;
    cursor: pointer;
  }
  .label__radio {
    margin: 10px 5px 10px 10px;
  }
  .label__radio:checked + .label__span {
    font-weight: bold;
    color: $dgreen;
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
    border: 3px solid $black;

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
    background-color: $yellow;
    border-color: $black;
    color: $black;
  }
  .move__forward {
    background-color: $green;
    border-color: $black;
    color: $black;
  }
</style>
