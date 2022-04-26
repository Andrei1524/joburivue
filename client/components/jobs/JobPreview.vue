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
          <div class="is-flex is-justify-content-space-between">
            <h2 class="title is-4 mb-0">{{ job.title }}</h2>
            <h2 class="is-size-5">{{ formatJobType(job.type) }}</h2>
          </div>
          <hr class="my-1" />
          <h2 class="is-size-5">{{ job.location }}</h2>

          <h3 class="is-size-3 mt-5">Descriere</h3>
          <hr class="my-1" />
          <div v-html="parseDescriptionWithBulmaTags"></div>
        </div>

        <div class="buttons is-flex is-justify-content-space-between">
          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-right="arrow-left-bold"
            @click="
              $router.push(`/jobs/create?id=${$route.query.id}&option=edit`)
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
              $router.push(`/jobs/create?id=${$route.query.id}&option=edit`)
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

  computed: {
    parseDescriptionWithBulmaTags() {
      const description = this.job.description;
      let parsedDecr;
      if (description) {
        parsedDecr = description
          .replace("<h1>", "<h1 class='is-size-1'>")
          .replace("<h2>", "<h2 class='is-size-2'>")
          .replace("<h3>", "<h2 class='is-size-3'>")
          .replace("<h4>", "<h2 class='is-size-4'>")
          .replace("<h5>", "<h2 class='is-size-5'>");
      }

      return parsedDecr;
    },
  },

  methods: {
    formatRemoteType,
    formatJobType,
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

::v-deep ul {
  padding-left: 0;

  li {
    padding-left: 1.5em;

    &::before {
      content: "\2022";
      display: inline-block;
      white-space: nowrap;
      width: 1.2em;

      margin-left: -1.5em;
      margin-right: 0.3em;
      text-align: right;
    }
  }
}
</style>
