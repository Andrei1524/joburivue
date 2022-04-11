<template>
  <div class="homepage">
    <Hero />
    <div class="container is-max-desktop mt-6">
      <Search v-model.trim="search" class="mb-5" />
      <JobsList v-if="jobs.length > 0" :jobs="jobs" />
      <Pagination :search="search" @data="handleGetData" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { JobInterface } from "../../server/src/ts/interfaces/job.interfaces";
import Hero from "~/components/homepage/Hero.vue";
import JobsList from "~/components/_shared/JobsList.vue";
import Search from "~/components/_shared/Search.vue";
import Pagination from "~/components/_shared/Pagination.vue";

export default Vue.extend({
  name: "IndexPage",
  components: {
    Pagination,
    Hero,
    JobsList,
    Search,
  },
  data() {
    return {
      search: "",
      jobs: [],
    };
  },
  methods: {
    handleGetData(data: []) {
      this.jobs = data;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
