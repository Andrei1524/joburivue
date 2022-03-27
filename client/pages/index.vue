<template>
  <div class="homepage">
    <Hero />
    <div class="container is-max-desktop mt-6">
      <Search class="mb-5" />
      <JobsList />
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/homepage/Hero.vue'
import JobsList from '~/components/_shared/JobsList.vue'
import Search from '~/components/_shared/Search.vue'
import Pagination from '~/components/_shared/Pagination.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Pagination,
    Hero,
    JobsList,
    Search
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
