<template>
  <div class="app">
    <div class="container">
      <AppNavbar />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppNavbar from '~/components/layout/AppNavbar.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    AppNavbar
  }
})
</script>
