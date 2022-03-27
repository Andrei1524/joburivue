<template>
  <div class="homepage">
    <Hero />
    <JobsList class="mt-6" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/homepage/Hero.vue'
import JobsList from '~/components/_shared/JobsList.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero,
    JobsList
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
