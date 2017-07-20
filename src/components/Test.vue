<template>
  <div class="test">
    <div class="test__content" v-if="this.dataReady">
      <div class="content__status">
        <div v-for="(item, index) in questData.results"
          class="status__item"
          :class="index === activeTest ?
            'yellow' : item ?
            'blue' : 'white'"
          @click="changeQuestion(index)"
        >{{index + 1}}</div>
      </div>
      <div class="content__task">
        <div class="task__number">
          <span class="number__current">{{activeTotal}}</span>
        </div>
        <div class="task__quest">
          <span class="quest__text">{{currentTest.question}}</span>
        </div>
        <div class="task__answer">
          <label style="display:none">
            <input name="answer" type="radio" value="0"
              v-model="questData.results[activeTest]">
            <span class="label__span">--Не выбран--</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="1"
              v-model="questData.results[activeTest]">
            <span class="label__span">{{currentTest.answer1}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="2"
              v-model="questData.results[activeTest]">
            <span class="label__span">{{currentTest.answer2}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="3"
              v-model="questData.results[activeTest]">
            <span class="label__span">{{currentTest.answer3}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="4"
              v-model="questData.results[activeTest]">
            <span class="label__span">{{currentTest.answer4}}</span>
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
          :class="{'disabled': !testComplate}"
        >Закончить Тест</button>
        <button @click="dev_complate()">complate</button>
        <button @click="dev_logQuestData()">log</button>
      </div>
    </div>
    <div class="test__await" v-if="!this.dataReady">
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
      activeTest: 0,
      dataReady: false,
      questData: {
        tests: [],
        results: []
      },
      userData: {
          name: this.$route.query.name,
          group: this.$route.query.group
      }
    }
  },
  methods: {
    dev_complate() {
      for (let el in this.questData.results) {
        this.questData.results[el] = 1;
      }
    },
    dev_logQuestData() {
      console.log('questData', this.questData, 'userData', this.userData);
    },

    getTestFromDb(quantity) {
      this.axios.get(`http://localhost:3000/database/tests?qua=${quantity}`)
      .then((response) => {
        this.questData.tests = response.data; //[{test}, {...}]
        this.dataReady = true;
        for (let el in response.data) {
          this.questData.results.push(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    changeQuestion(number) {
      if (number > this.questData.tests.length - 1 || number < 0) return;
      this.activeTest = number;
    },
    finishTest() {
      if (!this.testComplate) return;
      this.saveStoreData(this.createResult());
      this.$emit('complateTest');
    },
    saveStoreData(result) {
      this.$store.commit('saveStoreData', {
        resultData: result //[{result, id}, {...}]
      })
    },
    createResult() {
      const resultData = [];
      for (let index in this.questData.results) {
        resultData.push({
          id: this.questData.tests[index].id_question,
          result: this.questData.results[index]
        });
      }
      return resultData;
    }
  },
  computed: {
    activeTotal() {
      return this.activeTest + 1 + '/' + this.questData.tests.length;
    },
    currentTest() {
      return this.questData.tests[this.activeTest];
    },
    testComplate() {
      for (let result of this.questData.results) {
        if (result == 0) return false;
      }
      return true;
    }
  },
  created() {
    this.getTestFromDb(20);
  },
  beforeRouteLeave(to, from, next) {
    if (this.testComplate) next();
    else next(false);
  }
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
    color: $yellow;
    font-family: "Verdana", sans-serif;
  }
  .content__status {
    @include basicWindow;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 5px 10px;
    margin-bottom: 15px;
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
  .white {
    background-color: $dwhite;
  }
  .blue {
    background-color: $blue;
  }
  .yellow {
    background-color: $yellow;
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
    @include testElem;
    margin: 5px 15px 25px 15px;
    border: none;

    border-radius: 15px;
    cursor: default;
    &:hover {
      border: none;
    }
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
    font-size: 14px;
  }
  .label__radio:checked + .label__span {
    background-color: $yellow;
  }
  .task__move {
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    margin: 0 30px;
  }
  .move__back,
  .move__forward {
    @include navButton;
    margin: 0 0 15px 0;
    padding: 10px 25px;
    border-radius: 15px;
    text-transform: uppercase;
  }
</style>
