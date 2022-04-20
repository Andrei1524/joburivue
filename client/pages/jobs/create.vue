<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered">Adauga un job</h1>
    <div class="container is-max-desktop">
      <!-- Refactor AppProgress to handle page prorgress using slots -->
      <AppProgress
        class="mt-6"
        :steps="progressSteps"
        :current-step="currentStep"
      />
      <JobDetails @submitJobDetails="nextStep" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppProgress from "@/components/_shared/Progress.vue";
import JobDetails from "@/components/jobs/create/JobDetails.vue";

export default Vue.extend({
  name: "JobCreate",
  components: { AppProgress, JobDetails },
  middleware: "auth",

  // TODO: refactor whole component into smaller ones
  data() {
    return {
      currentStep: 0,
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
    };
  },

  mounted() {},

  methods: {
    nextStep() {
      this.currentStep += 1;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.container {
  > h5 {
    color: $gray;
  }
}

.sections {
  margin: 0 auto;
  max-width: 700px;

  > div {
    width: 100%;
  }
}
</style>
