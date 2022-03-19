<template>
  <div class="columns is-centered">
    <div class="column is-6 featured-companies">
      <h5 class="title is-5 has-text-left">
        Title 3
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppFeaturedCompanies',

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.featured-companies {
  background-color: $queen-blue;
}
</style>
