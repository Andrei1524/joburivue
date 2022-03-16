<template>
  <div class="app">
    <AppNavbar />
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
