<template charset='utf-8'>
  <div class="test">
    <div class="test__content" v-if="this.tests">
      <div class="content__status">
        <div v-for="(item, index) in results"
          class="status__item"
          :class=" index === activeTest ?
            'blue' : results[index].answer ?
            'green' : 'orange' "
          @click="changeQuestion(index)"
        >{{index + 1}}</div>
      </div>
      <div class="content__task">
        <div class="task__number">
          <span class="number__current">{{activeTotal}}</span>
        </div>
        <div class="task__quest">
          <span class="quest__text">{{currentTest.question | firstCapital}}</span>
        </div>
        <div class="task__answer">
          <label style="display:none">
            <input name="answer" type="radio" value="0"
              v-model="results[activeTest].answer">
            <span class="label__span">--Не выбран--</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="1"
              v-model="results[activeTest].answer">
            <span class="label__span">{{currentTest.answer1 | firstCapital}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="2"
              v-model="results[activeTest].answer">
            <span class="label__span">{{currentTest.answer2 | firstCapital}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="3"
              v-model="results[activeTest].answer">
            <span class="label__span">{{currentTest.answer3 | firstCapital}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="4"
              v-model="results[activeTest].answer">
            <span class="label__span">{{currentTest.answer4 | firstCapital}}</span>
          </label>

        </div>
        <div class="task__move">
          <button class="move__back"
            @click="changeQuestion(activeTest - 1)"
          >Предыдущий вопрос</button>
          <button class="move__forward"
            @click="changeQuestion(activeTest + 1)"
          >Следующий вопрос</button>
        </div>
      </div>
      <div class="task__finish">
        <button @click="finishTest()"
          class="finish__text"
          :class="{'disabled': testInProcess}"
        >Закончить Тест</button>
        <button @click="dev_complate()">complateTests</button>
      </div>
    </div>
    <div class="test__await" v-if="!this.tests">
      <div class="await__popup">
        <p>Testing is loading...</p>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tests: null,
      results: [],
      activeTest: 0,
      userInfo: ''
    }
  },

  methods: {
    dev_complate() {
      for (let el in this.results) {
        this.results[el].answer = 1;
      }
    },

    getTests() {
      let quantity = 20;
      this.axios.get(`http://localhost:3000/database/tests?qua=${quantity}`)
      .then((response) => {
        if (response.data) {
          this.tests = response.data;
        }
        if (response.data.length !== this.results.length) {
          this.results = [];
          response.data.forEach( (el)=> this.results.push({
            id : el.id_question,
            answer : 0
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    changeQuestion(number) {
      if (number > this.results.length - 1 || number < 0) return;
      this.activeTest = number;
    },
    finishTest() {
      if (this.testInProcess) return;
      this.axios.post('http://localhost:3000/database/results', {
        results: this.results,
        userInfo: this.userData
      })
      .then((response) => {
        this.showResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    showResult(res) {
      this.$emit('showResult', res);
    }
  },

  computed: {
    activeTotal() {
      return this.activeTest + 1 + '/' + this.results.length;
    },
    currentTest() {
      return this.tests[this.activeTest] || this.tests.temp;
    },
    testInProcess() {
      for (let el of this.results) {
        if (el.answer === 0) return true;
      }
      return false;
    }
  },

  filters: {
    firstCapital(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  },

  mounted() {
    this.getTests();
  },

  props: ['userData']
}
</script>

<style lang="scss" scoped>
  @import "../style/sass/main.scss";

  .await__popup {
    @include basicWindow;
    color: $blue;
    text-align: center;
  }
  .finish__text {
    @include mainButton;
  }
  .disabled {
    cursor: not-allowed;
    &:hover {
      color: $blue;
      border-color: $grey;
    }
  }
  .number__current {
    display: block;
    margin-top: 5px;
    font-size: 22px;
    font-weight: bold;

    text-align: center;
    color: $grey;
    font-family: "Verdana", sans-serif;
  }
  .content__status {
    @include basicWindow;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 5px 10px;
    color: $black;
  }
  .status__item {
    margin: 2px;
    border-radius: 5px;
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
  .orange {
    background-color: $orange;
  }
  .green {
    background-color: $green;
  }
  .blue {
    background-color: $blue;
  }
  .test__content {
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    align-items: center;
  }
  .content__task {
    @include basicWindow;
    display: flex;
    flex-flow: column nowrap;
    width: 600px;
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
    margin: 10px 15px;
    font-family: "Verdana", serif;
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
    @include testElem;
  }
  .label__radio:checked + .label__span {
    border-color: $green;
  }
  .task__move {
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    margin: 5px 25px;
  }
  .move__back,
  .move__forward {
    @include testElem;
    padding: 10px 15px;

    font-weight: bold;
    text-align: center;
    border-radius: 15px;
    text-transform: uppercase;
  }
  .move__back {
    //margin-right: 15px;
  }
</style>
