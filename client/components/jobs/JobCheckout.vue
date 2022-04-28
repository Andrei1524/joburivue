<template>
  <div class="job-checkout">
    <PricePlans />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PricePlans from "~/components/_shared/PricePlans.vue";

export default Vue.extend({
  name: "JobCheckout",
  components: {
    PricePlans,
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
