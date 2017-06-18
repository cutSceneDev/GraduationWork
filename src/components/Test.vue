<template charset='utf-8'>
  <div class="test">
    <div class="test__content">
      <div class="content__status">
        <div v-for="(item, index) in results" :class="'status__item ' + (results[index].answer ? 'divGreen' : 'divOrange')" @click="changeQuestion(index)">
          <span :class="'item__number ' + (activeTest === index ? 'divBlue':'')">{{index + 1}}</span>
        </div>
      </div>
      <div class="content__task">
        <div class="task__number">
          <span class="number__current">{{activeTest + 1 + ' / ' + results.length}}</span>
        </div>
        <div class="task__quest">
          <span class="quest__text">{{currentTest.question}}</span>
        </div>
        <div class="task__answer">
          <label style="display:none">
            <input name="answer" type="radio" value="0" v-model="results[activeTest].answer">
            <span class="label__span">--Не выбран--</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="1" v-model="results[activeTest].answer">
            <span class="label__span">{{upperCase(currentTest.answer1)}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="2" v-model="results[activeTest].answer">
            <span class="label__span">{{upperCase(currentTest.answer2)}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="3" v-model="results[activeTest].answer">
            <span class="label__span">{{upperCase(currentTest.answer3)}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="4" v-model="results[activeTest].answer">
            <span class="label__span">{{upperCase(currentTest.answer4)}}</span>
          </label>

        </div>
        <div class="task__move">
          <button class="move__back" @click="changeQuestion(activeTest - 1)">Предыдущий вопрос</button>
          <button class="move__forward" @click="changeQuestion(activeTest + 1)">Следующий вопрос</button>
        </div>
      </div>
      <div class="task__finish">
        <button @click="finishTest()" :class="'finish__text ' + finishClass">Закончить Тест</button>
        <button @click="show()">testsObject</button>
        <button @click="sho()">eventPopup</button>
        <button @click="sh()">complateTests</button>
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
      tests: {
        temp: {question: "Question?",
               answer: 0,
               answer1: 'Answer1',
               answer2: 'Answer2',
               answer3: 'Answer3',
               answer4: 'Answer4'}},
      results: [0],
      activeTest: 0,
      userInfo: ''
    }
  },

  methods: {
    show: function() {
      console.log(this.results);
    },
    sho: function() {
      this.$emit('showResult', {total: 30, correct: 10, wrong: 20});
    },
    sh: function() {
      for (let el in this.results) {
        this.results[el].answer = 1;
      }
    },

    getTests: function() {
      let that = this;
      let quality = 20;
      axios.get(`http://localhost:3000/database/tests?qua=${quality}`)
      .then(function (response) {
        if (response.data) {
          that.tests = response.data;
        }
        if (response.data.length !== that.results.length) {
          that.results = [];
          response.data.forEach( (el)=> that.results.push({
            id : el.id_question,
            answer : 0
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    changeQuestion: function(number) {
      if (number > this.results.length - 1 || number < 0) return;
      this.activeTest = number;
    },
    finishTest: function() {
      let that = this;
      if (that.results && that.userData) {
        for (let el in that.results) {
          if (that.results[el].answer === 0) {
            return;
          }
        }
      } else {
        return;
      }
      //console.log(that.results);
      axios.post('http://localhost:3000/database/results', {
        results: that.results,
        userInfo: that.userData
      })
      .then(function (response) {
        that.showResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    showResult: function(res) {
      //console.log(res);
      this.$emit('showResult', res);
    },
    upperCase: function(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  },

  computed: {
    currentTest: function() {
      return this.tests[this.activeTest] || this.tests.temp;
    },
    classChanger: function(index) {
      if (this.results[index]) return 'divGreen';
      return 'divRed';
    },
    finishClass: function() {
      for (let el in this.results) {
        if (this.results[el].answer === 0) return 'unactive';
      }
      return '';
    }
  },

  mounted: function() {
    this.getTests();
  },
  props: ['userData']
}
</script>

<style lang="scss">
  @import "../style/sass/main.scss";

  .animate-enter {
    opacity: 0;
    transform: translateX(150%);
  } .animate-leave {
    opacity: 1;
    transform: translateX(50%);
  }
  .animate-leave-to {
    transform: translateX(-150%);
  } .animate-enter-to {
    transform: translateX(50%);
  }
  .animate-enter-active {
    transition: all .3s ease;
  } .animate-leave-active {
    transition: all .3s ease;
  }
  .finish__text {
    display: block;
    padding: 10px 15px;
    margin-bottom: 45px;
    width: 380px;
    text-align: center;
    border-radius: 15px;
    border: 2px solid $grey;

    background-color: black;
    text-decoration: none;
    box-shadow: 2px 2px 5px black;
    color: $blue;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;
    &:hover {
      color: $orange;
      border-color: $orange;
    }
  }
  .unactive {
    cursor: not-allowed;
    &:hover {
      color: $blue;
      border-color: $grey;
    }
  }
  .number__current {
    display: block;
    text-align: center;
    margin-top: 5px;
    color: $grey;
    font-family: "Arila", sans-serif;
    font-size: 25px;
    font-weight: bold;
  }
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
  .status__item {
    margin: 2px;
    border-radius: 5px;
  }
  .item__number {
    display: block;
    vertical-align: middle;
    border: 1px solid $white;
    padding: 5px 0;
    width: 30px;

    border-radius: 5px;
    text-align: center;
    font-family: "Arial", sans-serif;
    cursor: pointer;
  }
  .divOrange {
    background-color: $orange;
  }
  .divGreen {
    background-color: $green;
  }
  .divBlue {
    background-color: $blue;
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

    width: 600px;
    margin-bottom: 30px;
    border: 2px solid $grey;

    border-radius: 15px;
    color: $grey;
    background-color: $black;
    box-shadow: 3px 3px 15px $black;
  }
  .task__quest {
    margin: 4px 15px 15px 15px;
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
    border: 2px solid $black;
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
    justify-content: center;
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
</style>
