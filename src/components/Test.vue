<template>
  <div class="test">
    <div class="test__content" v-if="this.dataReady">
      <div class="content__status">
        <div v-for="(item, index) in questData"
          class="status__item"
          :class="index === activeTest ?
            'blue' : item.answer ?
            'green' : 'orange'"
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
              v-model="questData[activeTest].answer">
            <span class="label__span">--Не выбран--</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="1"
              v-model="questData[activeTest].answer">
            <span class="label__span">{{currentTest.answer1}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="2"
              v-model="questData[activeTest].answer">
            <span class="label__span">{{currentTest.answer2}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="3"
              v-model="questData[activeTest].answer">
            <span class="label__span">{{currentTest.answer3}}</span>
          </label>
          <label class="answer__label">
            <input class="label__radio" name="answer" type="radio" value="4"
              v-model="questData[activeTest].answer">
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
          :class="{'disabled': testInProcess}"
        >Закончить Тест</button>
        <button @click="dev_complate()">complateTests</button>
        <button @click="dev_logQuestData()">complateTests</button>
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
      testInProgress: false,
      questData: [],
      userInfo: {
          name: this.$route.query.name,
          group: this.$route.query.group
      }
    }
  },
  methods: {
    dev_complate() {
      for (let el of this.questData) {
        el.answer = 1;
      }
    },
    dev_logQuestData() {
      console.log(this.questData);
    },

    getTestFromDb(quantity) {
      this.axios.get(`http://localhost:3000/database/tests?qua=${quantity}`)
      .then( (response) => {
        if (!response) throw new Error(response);
        this.dataReady = true;
        this.questData = response.data;
        for (let el of this.questData) {
          el.answer = 0
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    changeQuestion(number) {
      if (number > this.questData.length - 1 || number < 0) return;
      this.activeTest = number;
    },
    finishTest() {
      if (this.testInProcess) return;
      this.axios.post('http://localhost:3000/database/results', {
        userInfo: this.userInfo,
        questData: this.questData
      })
      .then( (response) => {
        this.showResult(response.data);
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    showResult(info) {
      this.$emit('showResult', info);
    }
  },

  computed: {
    activeTotal() {
      return this.activeTest + 1 + '/' + this.questData.length;
    },
    currentTest() {
      return this.questData[this.activeTest];
    },
    testInProcess() {
      console.log('as');
      for (let el of this.questData) {
        if (el.question === 0) return true;
      } 
      return false;
    }
  },

  mounted() {
    this.getTestFromDb(20);
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
  }
  .label__radio:checked + .label__span {
    background-color: $green;
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
