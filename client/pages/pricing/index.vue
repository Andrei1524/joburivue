<template>
  <div class="pricing-page">
    <AppHero
      :title="$t('app.pricing.services_list_benefits')"
      :subtitle="$t('app.pricing.choose_a_plan_which_suits_you')"
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
