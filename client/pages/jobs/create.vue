<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered">Adauga un job</h1>
    <div class="container is-max-desktop">
      <b-steps :value="currentStep" :has-navigation="false">
        <b-step-item
          :label="progressSteps[0].title"
          :icon="progressSteps[0].icon"
        >
          <JobDetails @submitJobDetails="nextStep" />
        </b-step-item>
        <b-step-item
          :label="progressSteps[1].title"
          :icon="progressSteps[1].icon"
        >
          <!-- <JobDetails @submitJobDetails="nextStep" /> -->
        </b-step-item>
        <b-step-item
          :label="progressSteps[2].title"
          :icon="progressSteps[2].icon"
        >
          <!-- <JobDetails @submitJobDetails="nextStep" /> -->
        </b-step-item>
      </b-steps>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import JobDetails from "@/components/jobs/create/JobDetails.vue";

export default Vue.extend({
  name: "JobCreate",
  components: { JobDetails },
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

  watch: {
    $route() {
      this.redirectToStepsFromQuery();
    },
  },

  created() {
    this.redirectToStepsFromQuery();
  },

  methods: {
    nextStep() {
      this.currentStep += 1;
    },

    redirectToStepsFromQuery() {
      const { query } = this.$route;
      if (!_.isEmpty(query) && query.id.length > 0 && query.option.length > 0) {
        // TODO: handle get one job by id
        switch (query.option) {
          case "edit":
            this.currentStep = 0;
            break;

          case "preview":
            this.currentStep = 1;
            break;

          case "checkout":
            this.currentStep = 2;
            break;
        }
      }
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
