<template>
  <b-steps :value="currentStep" :has-navigation="false">
    <b-step-item label="Account" icon="account-key"></b-step-item>
    <b-step-item label="Profile" icon="account"></b-step-item>
    <b-step-item label="Social" icon="account-plus"></b-step-item>
  </b-steps>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppProgress",
  middleware: "auth",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },

  mounted() {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
