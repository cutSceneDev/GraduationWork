<template>
  <div class="intro">
    <div class="intro-content">
      <div class="intro-content__column1 column1">
        <h2 class="column1__title">Информация</h2>
        <p class="column1__p">Данный сайт создан в образовательных целях для тестирования знаний учащихся в НМетАУ. Любой пользователь сайта имеет возможность выбрать нужный предмет из предложенного списка и ввести информацию о себе, после чего пройти определенное количество вопросов для оценивания знаний. По окончанию теста вы сможете увидеть количество правильных ответов и автоматически рассчитанную оценку на основе Болонской системе оценивания. Информация о каждом, даже прерваном тесте, будет занесена в базу данных.</p>
        <p class="column1__head">Руководитель сайта: Евтушенко Галина Львовна</p>
        <p><a class="column1__dev" href="https://github.com/cutSceneDev">Создатель сайта: Решетников Артур Александорович</a></p>
      </div>
      <div class="intro-content__column2 column2">
        <h2 class="column2__title">Тестирование</h2>
        <p class="column2__p">Тестирование по предметам состоит из 30 вопросов. Каждый вопрос имеет 4 варианта ответа, из которых только один правильный.</p>
        <p>Критерии оценивания по количеству правильных ответов:</p>
        <table class="intro-table">
          <tr class="intro-table__title">
            <td>РЕЗУЛЬТАТ</td>
            <td>ОЦЕНКА</td>
          </tr>
          <tr>
            <td>95-100%</td>
            <td>11 баллов</td>
          </tr>
          <tr>
            <td>90-94%</td>
            <td>10 баллов</td>
          </tr>
          <tr>
            <td>85-89%</td>
            <td>9 баллов</td>
          </tr>
          <tr>
            <td>80-84%</td>
            <td>8 баллов</td>
          </tr>
          <tr>
            <td>75-79%</td>
            <td>7 баллов</td>
          </tr>
          <tr>
            <td>65-74%</td>
            <td>6 баллов</td>
          </tr>
          <tr>
            <td>50-64%</td>
            <td>5 баллов</td>
          </tr>
          <tr>
            <td>35-49%</td>
            <td>4 баллов</td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <router-link class="intro__login" to='/login'>Перейти к тестированию</router-link>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: function() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import "../style/sass/colors.scss";

  .intro-content {
    margin-top: 25px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: flex-start;
  }
  .intro-content__column1,
  .intro-content__column2 {
    padding: 0 15px;
    border: 2px solid $grey;
    background-color: #000000;
    color: $grey;
    border-radius: 15px;
    flex-basis: 360px;
    box-shadow: 3px 3px 15px #000000;
    margin-bottom: 30px;
  }
  .column1__title,
  .column2__title {
    margin: 15px 0;
    text-align: center;
    color: $blue;
  }
  .intro-table td {
    text-align: center;
    padding: 0 10px;
  }
  .intro-table {
    margin-bottom: 15px;
    color: $orange;
  }
  .intro-table__title {
    text-decoration: underline;
  }
  .column1__dev,
  .column1__dev:visited,
  .column1__head {
    color: $orange;
  }
  .intro {
    display: flex;
    flex-flow: column;
    justify-content: top;
    align-items: center;
  }
  .intro__login {
    padding: 10px 15px;
    border-radius: 5px;
    border: 2px solid $grey;
    background-color: black;
    text-decoration: none;
    box-shadow: 2px 2px 5px black;
    color: $blue;
    text-transform: uppercase;
  }
  .intro__login:visited {
    color: $blue;
  }
  .intro__login:hover {
    color: $orange;
    border: 2px solid $orange;
  }
</style>
