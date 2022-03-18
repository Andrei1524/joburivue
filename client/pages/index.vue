<template>
  <div class="homepage">
    <Hero />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/homepage/Hero.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
