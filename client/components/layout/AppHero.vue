<template>
  <section class="hero is-success position-relative">
    <div class="hero-wrapper" />
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">{{ title }}</p>
        <p v-if="subtitle" class="subtitle mt-2">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppHero",

  props: {
    title: {
      type: String,
      default: () => "",
    },
    subtitle: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {};
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.hero-wrapper {
  background: #212940d9;
  height: 100%;
  width: 100%;
  position: absolute;
}

.hero-body {
  background: url("~assets/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
