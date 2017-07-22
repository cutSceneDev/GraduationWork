<template>
    <div class="info">
      <div class="info__content">
        <div class="content__left">
          <h2 class="left__title">Информация</h2>
          <p class="left__text bar-content">Данный сайт создан в образовательных целях для тестирования знаний учащихся в НМетАУ. Любой пользователь сайта имеет возможность ввести информацию о себе, после чего пройти определенное количество вопросов для оценивания знаний. По окончанию теста вы сможете увидеть количество правильных ответов и рекомендованную автоматически рассчитанную оценку на основе предложенной системы оценивания.</p>
          <p class="left__exec bar-content orange">Руководитель сайта: Евтушенко Галина Львовна</p>
          <p class="bar-content left__dev"><a class="orange"
            href="https://github.com/cutSceneDev"
            >Создатель сайта: Решетников Артур Александорович</a
          ></p>
        </div>
        <div class="content__right">
          <h2 class="right__title">Тестирование</h2>
          <p class="right__text bar-content">Тестирование по предметам состоит из 30 вопросов. Каждый вопрос имеет 4 варианта ответа, из которых только один правильный.</p>
          <p class="right__text bar-content">Критерий оценивания по количеству правильных ответов:</p>
          <table class="right__table orange">
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
      <router-link class="info__reg" :to="{name: 'reg'}" tag="button">Регистрация</router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "../style/sass/main.scss";

  .info__content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .content__left,
  .content__right {
    @include basicWindow;
    flex-basis: 50%;
  }
  .content__left {
    margin-right: 30px;
  }
  .left__title,
  .right__title {
    margin: 15px 0;
    text-align: center;
    color: $blue;
  }
  .bar-content {
    margin: 10px 15px;
  }
  .left__dev {
    margin-bottom: 20px;
  }
  .orange {
    color: $yellow;
  }
  .right__table {
    margin: 20px auto;
  }
  .right__table td {
    text-align: center;
    padding: 1px 15px;
  }
  .table__title {
    text-decoration: underline;
  }
  .info__reg {
    @include mainButton;
  }
</style>
