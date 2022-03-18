<template>
  <div class="app">
    <div class="navbar-wrapper">
      <div class="container">
        <AppNavbar />
      </div>
    </div>
    <Hero />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppNavbar from '~/components/layout/AppNavbar.vue'
import Hero from '~/components/homepage/Hero.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    AppNavbar,
    Hero
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.navbar-wrapper {
  background: $white;
  box-shadow: 0px 1px 7px #0000001a;
}
</style>
