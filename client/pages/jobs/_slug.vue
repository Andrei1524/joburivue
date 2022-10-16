<template>
  <div>
    <AppHero>
      <div class="is-flex is-justify-content-space-between">
        <div class="is-flex">
          <figure class="image is-48x48 mr-2">
            <img src="~assets/job-item-logo-example.png" />
          </figure>
          <div>
            <h2 class="title is-4 mb-0">Vue Web Developer [Remote / WFH]</h2>
            <h3 class="is-3">
              <span>Streem</span> |
              <span>WFH ☝ Remote Allowed</span>
            </h3>
          </div>
        </div>
        <div>
          <h2 class="title is-4 mb-0">Full-time</h2>
          <h3 class="is-3">€50k - €70k</h3>
        </div>
      </div>
    </AppHero>

    <!-- job content -->
    <div class="container is-max-desktop">
      <div>
        <h3 class="is-size-4 mb-0 mt-2">Descriere companie</h3>
        <hr class="my-1" />
        <p>
          ArborXR is device management for AR & VR (XR) devices. We are a fully
          remote company with 20 employees that have been working for 5 years to
          solve one of the most difficult problems preventing XR from scaling.
          <br />
          Companies are finding that using XR for training and collaboration
          saves them time and money. The problem? Companies today are using
          consumer hardware without software to help them scale. As they go from
          pilot projects with a few headsets to larger deployments of hundreds
          or thousands of headsets, they get stuck.
        </p>
      </div>
      <div class="mt-4">
        <h3 class="is-size-4 mb-0 mt-2">Descriere job</h3>
        <hr class="my-1" />
        <p>
          ArborXR is device management for AR & VR (XR) devices. We are a fully
          remote company with 20 employees that have been working for 5 years to
          solve one of the most difficult problems preventing XR from scaling.
          Companies are finding that using XR for training and collaboration
          saves them time and money.
          <br />
          The problem? Companies today are using consumer hardware without
          software to help them scale. As they go from pilot projects with a few
          headsets to larger deployments of hundreds or thousands of headsets,
          they get stuck.
        </p>
      </div>

      <!-- skills & apply -->
      <div
        class="is-flex is-justify-content-space-between is-align-items-center mt-6"
      >
        <div class="skills w-50">
          <h3 class="is-size-4">Skills</h3>
          <hr class="my-1" />
          <!-- TODO: move tags to own component -->
          <b-tag type="is-primary" attached aria-close-label="Close tag">
            vue3
          </b-tag>
        </div>
        <div class="position-relative">
          <img class="apply-drawing" src="~assets/apply_drawing.png" alt="" />
          <b-button type="is-primary" class="orange-btn px-5 ml-6">
            Aplica
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHero from "~/components/layout/AppHero.vue";
import * as JobService from "~/services/job.service";

export default Vue.extend({
  name: "AppJobPage",
  components: {
    AppHero,
  },

  data() {
    return {
      job: {},
    };
  },

  async created() {
    await this.handleGetData();
  },

  methods: {
    async handleGetData() {
      try {
        const jobId = this.$route.hash.substr(1);

        const job = await JobService.getJob(this.$axios, jobId);
        this.job = job;
      } catch (error) {}
    },
  },
});
</script>

<style scoped lang="scss">
.apply-drawing {
  position: absolute;
  top: -39px;
  right: -26px;
}
</style>
