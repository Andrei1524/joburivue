<template>
  <b-steps :value="currentStep" :has-navigation="false">
    <b-step-item
      v-for="step in steps"
      :key="step.title"
      :label="step.title"
      :icon="step.icon"
    ></b-step-item>
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
