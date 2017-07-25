<template>
  <div class="result">
    <div class="result__content">
      <div class="content__result">
        <table class="result__table">
          <tr class="table__row table__row--main">
            <td class="table__field table__field--main">Номер:</td>
            <td class="table__field table__field--main">Группа:</td>
            <td class="table__field table__field--main">Имя:</td>
            <td class="table__field table__field--main">Всего:</td>
            <td class="table__field table__field--main">Правильно:</td>
            <td class="table__field table__field--main table__field--last">Время:</td>
          </tr>
          <tr class="table__row" v-for="(item, index) in results">
            <td class="table__field">{{item.id_result}}</td>
            <td class="table__field">{{item.team}}</td>
            <td class="table__field">{{item.name}}</td>
            <td class="table__field">{{item.total}}</td>
            <td class="table__field">{{item.correct}}</td>
            <td class="table__field table__field--last">{{item.date_time | format}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: ''
    }
  },

  methods: {
    getStat() {
      this.axios.get('http://localhost:3000/database/stat')
      .then((response) => {
        this.results = response.data.reverse();
        if (this.results.length > 50) {
          this.results = this.results.slice(0, 50);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    testTime() {
      console.log(new Date());
    }
  },
  filters: {
    format(time) {
      return time;
    }
  },
  mounted() {
    this.getStat();
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/sass/main.scss";

  .result__content {
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
    align-items: center;
  }
  .content__result {
    display: flex;
    flex-flow: column nowrap;
    min-width: 600px;
    max-width: 900px;
    margin-bottom: 30px;
    border: 2px solid $grey;

    border-radius: 15px;
    color: $grey;
    background-color: $black;
    box-shadow: 3px 3px 15px $black;
  }
  .result__table {
    display: block;
    margin: 20px 15px;
    border-spacing: 0;
    border: 1px solid $grey;
    border-radius: 5px;
    border-collapse: collapse;

    background-color: $white;
    color: $black;
  }
  .table__row {
    border-top: 1px solid $grey;

    &--main {
      border: 0;
      border-bottom: 2px solid $grey;
    }
  }
  .table__field {
    padding: 4px 8px;
    border-right: 1px solid $grey;
    text-align: center;

    &--main {
      border-right: 2px solid $grey;
      font-weight: bold;
    }
    &--last {
      border-right: 0;
    }
  }
</style>
