<template>
  <div>
    <div class="main-nav">
      <div class="main-nav__container">
        <div class="main-nav__title title">
          <h1 class="title__main">Student Tester</h1>
        </div>
        <div class="main-nav__navigation navigation">
          <button class="navigation__key active">Основная</button>
          <button class="navigation__key">О проекте</button>
          <button class="navigation__key">Админ панель</button>
        </div>
      </div>
    </div>
    <div class="router-content">
      <div class="router-content__wrap">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
  body {
    min-width: 960px;
    color: white;
    font-size: 16px;
    background: #94c4ff;
  }
  .main-nav {
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-content: flex-start;
  }
  .main-nav__container {
    display: flex;
    justify-content: space-between;
    width: 960px;
  }
  .navigation {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
  }
  .navigation__key {
    background-color: #666;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    color: #d4d4d4;
    margin: 20px 10px;
  }
  .title__main {
    color: #94c4ff;
    margin: 20px 10px;
  }
  .router-content {
    display: flex;
    justify-content: center;
    align-content: flex-start;
  }
  .router-content__wrap {
    width: 960px;
  }
</style>
