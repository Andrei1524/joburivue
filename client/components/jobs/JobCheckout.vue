<template>
  <div class="job-checkout">
    <h1 class="title is-3">Selecteaza un plan!</h1>
    <PricePlans />
    <Checkout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PricePlans from "~/components/_shared/PricePlans.vue";
import Checkout from "~/components/_shared/Checkout.vue";

export default Vue.extend({
  name: "JobCheckout",
  components: {
    PricePlans,
    Checkout,
  },
  middleware: "auth",

  data() {
    return {};
  },

  async fetch() {},

  computed: {},

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
