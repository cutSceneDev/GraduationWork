<template>
  <div class="intro">
    <div class="intro-content">
      <div class="intro-content__column1 column1">
        <h2 class="column1__title">Информация</h2>
        <p>Данный сайт создан в образовательных целях для тестирования знаний учащихся в НМетАУ. Любой пользователь сайта имеет возможность выбрать нужный предмет из предложенного списка и ввести информацию о себе, после чего пройти определенное количество вопросов для оценивания знаний. По окончанию теста вы сможете увидеть количество правильных ответов и автоматически рассчитанную оценку на основе Болонской системе оценивания. Информация о каждом, даже прерваном тесте, будет занесена в базу данных.</p>
        <p class="column1__dev">Руководитель сайта: Евтушенко Галина Львовна</p>
        <p class="column1__dev">Создатель сайта: Решетников Артур Александорович</p>
      </div>
      <div class="intro-content__column2 column2">
        <h2 class="column2__title">Тестирование</h2>
        <p>Тестирование по предметам состоит из 30 вопросов . Каждый вопрос имеет 4 варианта ответа, из которых только один правильный.</p>
        <p>Критерии оценивания по количеству правильных ответов:</p>
        <table class="intro_table">
          <tr class="intro_table--title">
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
      <router-link to='/login'>Перейти к тестированию</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style>
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
    border: 2px solid #d4d4d4;
    background-color: #000000;
    color: #d4d4d4;
    border-radius: 15px;
    flex-basis: 360px;
    box-shadow: 3px 3px 15px #000000;
  }
  .column1__title,
  .column2__title {
    text-align: center;
    color: #94c4ff;
  }
  .intro_table td {
    text-align: center;
    padding: 0 10px;
  }
  .intro_table {
    margin-bottom: 15px;
    color: #e35724;
  }
  .intro_table--title {
    text-decoration: underline;
  }
  .column1__dev {
    color: #e35724;
    text-decoration: underline;
  }
</style>
