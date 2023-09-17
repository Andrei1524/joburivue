<template>
  <section class="hero h-32 relative">
    <div class="hero-wrapper" />
    <div class="relative">
      <div v-if="title || subtitle" class="container has-text-centered">
        <div
          class="is-flex is-align-items-center is-flex-direction-row is-justify-content-center"
        >
          <Icon v-if="icon" :name="icon" class="mr-3" size="is-medium" />
          <p class="text-basic-white text-3xl">{{ title }}</p>
        </div>
        <p v-if="subtitle" class="mt-2">{{ subtitle }}</p>
      </div>
      <div v-else class="container">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
});
</script>

<style lang="scss" scoped>
@import './design/variables';

.hero-wrapper {
  background: #212940d9;
  height: 100%;
  width: 100%;
  position: absolute;
}

.hero {
  background: url('/assets/hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
