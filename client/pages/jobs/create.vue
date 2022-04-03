<template>
  <div class="create-job">
    create job
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'JobCreate',
  components: {
  },
  middleware: 'auth'
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
