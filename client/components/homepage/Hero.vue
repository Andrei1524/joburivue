<template>
  <section class="hero is-success is-halfheight">
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          Angajați dezvoltatori Vue.js & găsiți locuri de muncă cu Vue.js
        </p>
        <p class="subtitle" />

        <FeaturedCompanies />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import FeaturedCompanies from '~/components/_shared/FeaturedCompanies.vue'

export default Vue.extend({
  name: 'AppHero',
  components: {
    FeaturedCompanies
  },

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
