<template>
  <div class="columns is-gapless job-item p-2">
    <div class="column is-narrow">
      <figure class="image is-48x48 mr-2">
        <img src="~assets/job-item-logo-example.png">
      </figure>
    </div>
    <div class="column is-narrow">
      <h5 class="title is-5">
        Frontend Developer - Vue/Typescript
      </h5>
      <h6 class="subtitle has-text-left is-6">
        <span class="has-text-weight-bold">Streem</span> - Romania
      </h6>
    </div>
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
  //margin-left: 0;
  //margin-right: 0;
}

.title {
  color: $yankees-blue !important;
}

.subtitle {
  color: $gray !important;
}

.job-item {
  background-color: $basic-white;
}
</style>
