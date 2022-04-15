<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered mt-5">Adauga un job</h1>
    <div class="container is-max-desktop login">
      <AppProgress :steps="progressSteps" :current-step="currentStep" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppProgress from "@/components/_shared/Progress.vue";

export default Vue.extend({
  name: "JobCreate",
  components: { AppProgress },
  middleware: "auth",
  data() {
    return {
      progressSteps: [
        {
          title: "Detalii job",
          icon: "pencil-box-multiple",
        },
        {
          title: "Preview",
          icon: "file-find",
        },
        {
          title: "Checkout",
          icon: "credit-card",
        },
      ],
      currentStep: 1,
    };
  },

  mounted() {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
