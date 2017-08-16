<template>
  <div class="test">
    <div class="test__content" v-if="tests.length >= 1">
      <div class="content__status">
        <div v-for="(item, index) in tests"
          class="status__item"
          :class="index === activeTest ?
            'yellow' : results[index] ?
            'blue' : 'white'"
          @click="changeQuestion(index)"
        >{{index + 1}}</div>
      </div>

      <test-bar
        :results="results"
        :activeTest="activeTest"
        :tests="tests"
        @changeQuestion="changeQuestion"
      ></test-bar>

      <div class="task__finish">
        <button @click="finishTest()"
          class="finish__text"
          :class="{'disabled': !testComplate}"
          >Закончить Тест</button>
        <button @click="dev_complate()">complate</button>
        <button @click="dev_logQuestData()">log</button>
      </div>
    </div>
    <div class="test__await" v-else>
      <div class="await__popup">
        <p>Testing is loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TestBar from './Test/TestBar.vue';

export default {
  data() {
    return {
      activeTest: 0,
      results: []
    }
  },

  methods: {
    dev_complate() {
      for (let res in this.results) {
        this.results[res] = 1;
      }
    },
    dev_logQuestData() {
      console.log(this.tests, this.results);
    },

    changeQuestion(number) {
      if (number > this.tests.length - 1 || number < 0) return;
      this.activeTest = number;
    },
    finishTest() {
      if (!this.testComplate) return;
      this.storeSaveResult(this.createResult());
      this.$emit('complateTest');
    },
    storeSaveResult(result) {
      this.$store.dispatch('storeSaveResult', {
        resultData: result //[{result, id}, {...}]
      })
    },
    createResult() {
      const resultData = [];
      for (let index in this.results) {
        resultData.push({
          id: this.tests[index].id_question,
          result: this.results[index]
        });
      }
      return resultData;
    }
  },

  computed: {
    testComplate() {
      for (let res of this.results) {
        if (res === 0) return false;
      }
      return true;
    },
    tests() {
      return this.$store.getters.getTests;
    }
  },

  created() {
    this.tests.forEach(() => {
      this.results.push(0);
    });
  },

  beforeRouteLeave(to, from, next) {
    if (this.testComplate) next();
    else next(false);
  },

  components: {
    testBar: TestBar
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
</style>
