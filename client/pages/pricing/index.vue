<template>
  <div class="pricing-page">
    <section class="hero is-success position-relative">
      <div class="hero-wrapper" />
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">Lista servicii si beneficii</p>
          <p class="subtitle mt-2">Alege un plan care ti se potriveste</p>
        </div>
      </div>
    </section>

    <div class="price-plans container is-max-desktop mt-6">
      <PricePlan />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PricePlan from "~/components/_shared/PricePlan.vue";

export default Vue.extend({
  name: "AppPricing",
  components: {
    PricePlan,
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
