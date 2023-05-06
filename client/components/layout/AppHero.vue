<template>
  <section class="hero is-success position-relative">
    <div class="hero-wrapper" />
    <div class="hero-body">
      <div v-if="title || subtitle" class="container has-text-centered">
        <div class="is-flex is-align-items-center is-flex-direction-row is-justify-content-center">
          <b-icon v-if="icon" :icon="icon" class="mr-3" size="is-medium" />
          <p class="title">{{ title }}</p>
        </div>
        <p v-if="subtitle" class="subtitle mt-2">{{ subtitle }}</p>
      </div>
      <div v-else class="container is-max-desktop">
        <slot></slot>
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
    icon: {
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
