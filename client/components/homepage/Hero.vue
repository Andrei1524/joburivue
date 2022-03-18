<template>
  <section class="hero is-success is-halfheight">
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          Title
        </p>
        <p class="subtitle">
          Subtitle
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppNavbar',

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.hero-body {
  background: url('~assets/hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
