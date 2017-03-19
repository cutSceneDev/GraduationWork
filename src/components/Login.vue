<template>
  <div>
  </div>
</template>

<script>
const Data = require('../data.json')

module.exports = {
  data: function() {
    return {
      vasya: Data.testing[1].answers[2].answer
    }
  }
}
</script>

<style>

</style>
