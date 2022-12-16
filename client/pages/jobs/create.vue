<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered">Adauga un job</h1>
    <div class="container is-max-desktop">
      <b-steps :has-navigation="false" :value="currentStep">
        <b-step-item
          :clickable="isStepsClickable"
          :icon="progressSteps[0].icon"
          :label="progressSteps[0].title"
        >
          <JobDetails
            v-if="currentStep === 0"
            class="mt-5"
          />
        </b-step-item>
        <b-step-item
          :clickable="isStepsClickable"
          :icon="progressSteps[1].icon"
          :label="progressSteps[1].title"
        >
          <JobPreview v-if="currentStep === 1" class="mt-5" />
        </b-step-item>
        <b-step-item
          :clickable="isStepsClickable"
          :icon="progressSteps[2].icon"
          :label="progressSteps[2].title"
        >
          <JobCheckout v-if="currentStep === 2" class="mt-5" />
        </b-step-item>
      </b-steps>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import JobDetails from "~/components/jobs/JobDetails.vue";
import JobPreview from "~/components/jobs/JobPreview.vue";
import JobCheckout from "~/components/jobs/JobCheckout.vue";

export default Vue.extend({
  name: "JobCreate",
  components: { JobDetails, JobPreview, JobCheckout },
  middleware: ["auth", "jobBelongsToCurrentUser"],

  data() {
    return {
      currentStep: 0,
      isStepsClickable: false,
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
