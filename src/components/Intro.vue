<template>
    <div class="intro">
      <div class="intro__content">
        <div class="content__lBar">
          <h2 class="lBar__title">Информация</h2>
          <p class="lBar__p">Данный сайт создан в образовательных целях для тестирования знаний учащихся в НМетАУ. Любой пользователь сайта имеет возможность выбрать нужный предмет из предложенного списка и ввести информацию о себе, после чего пройти определенное количество вопросов для оценивания знаний. По окончанию теста вы сможете увидеть количество правильных ответов и автоматически рассчитанную оценку на основе Болонской системе оценивания. Информация о каждом, даже прерваном тесте, будет занесена в базу данных.</p>
          <p class="lBar__head">Руководитель сайта: Евтушенко Галина Львовна</p>
          <a class="lBar__dev" href="https://github.com/cutSceneDev">Создатель сайта: Решетников Артур Александорович</a>
        </div>
        <div class="content__rBar">
          <h2 class="rBar__title">Тестирование</h2>
          <p class="rBar__p">Тестирование по предметам состоит из 30 вопросов. Каждый вопрос имеет 4 варианта ответа, из которых только один правильный.</p>
          <p class="rBar__p">Критерии оценивания по количеству правильных ответов:</p>
          <table class="rBar__table rBar__table--center">
            <tr class="table__title">
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
              <td>4 балла</td>
            </tr>
          </table>
        </div>
      </div>
      <router-link class="intro__login intro__login--center" to='/login'>Перейти к тестированию</router-link>
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
  @import "../style/sass/main.scss";
  .intro__content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .content__lBar,
  .content__rBar {
    flex-basis: 380px;
    margin-bottom: 30px;
    border: 2px solid $grey;

    border-radius: 15px;
    color: $grey;
    background-color: #000000;
    box-shadow: 3px 3px 15px #000000;
  }
  .lBar__title,
  .rBar__title {
    margin: 15px 0;
    text-align: center;
    color: $blue;
  }
  .lBar__p,
  .lBar__head,
  .lBar__dev,
  .rBar__p {
    margin: 0 15px;
    margin-bottom: 15px;
  }
  .lBar__head,
  .lBar__dev,
  .lBar__dev:visited {
    display: block;
    color: $orange;
  }
  .rBar__table {
    margin-left: 30px;
    margin-bottom: 15px;
    color: $orange;
    &--center {
      @include center;
    }
  }
  .rBar__table td {
    text-align: center;
    padding: 1px 15px;
  }
  .table__title {
    text-decoration: underline;
  }
  .intro__login {
    display: block;
    padding: 10px 15px;
    width: 350px;
    text-align: center;
    border-radius: 15px;
    border: 2px solid $grey;
    background-color: black;
    text-decoration: none;
    box-shadow: 2px 2px 5px black;
    color: $blue;
    text-transform: uppercase;
    outline: none;
    &:hover {
      color: $orange;
      border: 2px solid $orange;
    }
    &--center {
      @include center;
    }
  }
</style>
