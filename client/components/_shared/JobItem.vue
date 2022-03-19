<template>
  <div class="columns job-item">
    <div class="column">
      <figure class="image is-48x48 mr-2">
        <img src="~assets/job-item-logo-example.png">
      </figure>
    </div>
    <div class="column" />
    <div class="column" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'JobItem',

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.columns {
  margin-left: 0;
  margin-right: 0;
}

.job-item {
  background-color: $basic-white;
}
</style>
