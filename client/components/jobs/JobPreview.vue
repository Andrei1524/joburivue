<template>
  <div class="job-preview">
    <div class="container is-max-desktop">
      <div class="box mt-5">
        <b-loading
          :active="jobPreviewLoading"
          :is-full-page="false"
          :can-cancel="false"
        ></b-loading>

        <div class="sections">
          <h2 class="title is-4">{{ job.title }}</h2>
          <hr />
          <h2 class="is-size-5">{{ job.location }}</h2>
          <h2 class="is-size-5">{{ formatJobType(job.type) }}</h2>
        </div>

        <div class="buttons is-flex is-justify-content-space-between">
          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-right="arrow-left-bold"
            @click="
              $router.replace(`/jobs/create?id=${$route.query.id}&option=edit`)
            "
          >
            Editeaza jobul
          </b-button>
          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-left="arrow-right-bold"
            @click="
              $router.replace(`/jobs/create?id=${$route.query.id}&option=edit`)
            "
          >
            Finalizează
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import * as JobService from "~/services/job.service";
import { formatRemoteType, formatJobType } from "~/utils/jobs";

export default Vue.extend({
  name: "JobPreview",
  middleware: "auth",

  data() {
    return {
      jobPreviewLoading: false,
      job: {},
    };
  },

  async fetch() {
    const { query } = this.$route;

    this.jobPreviewLoading = true;
    const payload = `${query.id}/${query.option}`;

    try {
      const job = await JobService.getJob(this.$axios, payload);
      this.job = { ...job };
      this.jobPreviewLoading = false;
    } catch (error) {}
  },

  methods: {
    formatRemoteType,
    formatJobType,
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
