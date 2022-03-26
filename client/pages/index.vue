<template>
  <div class="homepage">
    <Hero />
    <!--    <JobsMap :disable-map-scrolling="true" />-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/homepage/Hero.vue'
import JobsMap from '~/components/_shared/JobsMap.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero,
    JobsMap
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
