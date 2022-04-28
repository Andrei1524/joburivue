<template>
  <div class="job-checkout">checkout</div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";

export default Vue.extend({
  name: "JobCheckout",
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
