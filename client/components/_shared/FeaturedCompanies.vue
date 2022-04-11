<template>
  <div class="container is-max-desktop">
    <div class="featured-companies pt-2 px-4 pb-5">
      <h6 class="title is-6 has-text-left mb-4">Companii Recomandate</h6>

      <JobItem v-for="job in featuredJobs" :key="job.id" :job="job" />
    </div>

    <div
      class="see-all-jobs is-relative is-flex is-flex-direction-column is-align-items-center pb-5"
    >
      <b-button type="is-primary" size="is-medium" class="orange-btn mb-2">
        Vezi toate joburile
      </b-button>
      <b-icon
        class="see-all-jobs-icon"
        icon="chevron-triple-down"
        size="is-medium"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import JobItem from "~/components/_shared/JobItem.vue";

export default Vue.extend({
  name: "AppFeaturedCompanies",
  components: {
    JobItem,
  },

  data() {
    return {
      featuredJobs: [],
    };
  },

  async fetch() {
    // TODO: handle fetch featured jobs
    // const response = await this.$axios.get("/jobs");
    // this.featuredJobs = response.data;
  },
  fetchOnServer: false,
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.featured-companies {
  background: linear-gradient(#3b668c, #3b668c00);
  border-radius: 5px;
}

.see-all-jobs-icon {
  animation: MoveUpDown 1.5s ease-in-out infinite;
  position: absolute;
  bottom: -15px;
  transform: translateY(0px);
  will-change: transform;
}

@keyframes MoveUpDown {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(15px);
  }
}
</style>
