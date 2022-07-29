<template>
  <div class="pricing-page">
    <AppHero
      :title="'Lista servicii si beneficii'"
      :subtitle="'Alege un plan care ti se potriveste'"
    />

    <PricePlans />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PricePlans from "~/components/_shared/PricePlans.vue";
import AppHero from "~/components/layout/AppHero.vue";

export default Vue.extend({
  name: "AppPricing",
  components: {
    PricePlans,
    AppHero,
  },

  data() {
    return {};
  },

  methods: {},
});
</script>
