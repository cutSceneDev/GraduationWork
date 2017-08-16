<template>
  <div>
    <div class="content__task">
      <div class="task__number">
        <span class="number__current">
          {{ activeTotal }}
        </span>
      </div>
      <div class="task__quest">
        <span class="quest__text">
          {{ currentTest.question }}
        </span>
      </div>
      <div class="task__answer">
        <label style="display:none">
          <input name="answer"
            type="radio"
            value="0"
            v-model.number="results[activeTest]">
          <span class="label__span">--Не выбран--</span>
        </label>
        <label class="answer__label">
          <input class="label__radio"
            name="answer"
            type="radio"
            value="1"
            v-model.number="results[activeTest]">
          <span class="label__span">
            {{ currentTest.answer1 }}
          </span>
        </label>
        <label class="answer__label">
          <input class="label__radio"
            name="answer"
            type="radio"
            value="2"
            v-model.number="results[activeTest]">
          <span class="label__span">
            {{ currentTest.answer2 }}
          </span>
        </label>
        <label class="answer__label">
          <input class="label__radio"
            name="answer"
            type="radio"
            value="3"
            v-model.number="results[activeTest]">
          <span class="label__span">
            {{ currentTest.answer3 }}
          </span>
        </label>
        <label class="answer__label">
          <input class="label__radio"
            name="answer"
            type="radio"
            value="4"
            v-model.number="results[activeTest]">
          <span class="label__span">
            {{ currentTest.answer4 }}</span>
        </label>
      </div>
      <div class="task__move">
        <button class="move__back"
          @click="$emit('changeQuestion', activeTest - 1)"
          >Предыдущий вопрос</button>
        <button class="move__forward"
          @click="$emit('changeQuestion', activeTest + 1)"
          >Следующий вопрос</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },

    computed: {
      activeTotal() {
        return this.activeTest + 1 + '/' + this.tests.length;
      },
      currentTest() {
        return this.tests[this.activeTest];
      }
    },

    props: ['tests', 'results', 'activeTest']
  }
</script>

<style lang="scss" scoped>
  @import "../../style/sass/main.scss";

  .number__current {
    display: block;
    margin-top: 5px;
    font-size: 22px;
    font-weight: bold;

    text-align: center;
    color: $blue;
    font-family: "Verdana", sans-serif;
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
