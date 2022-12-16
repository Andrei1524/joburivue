<template>
  <div class="job-preview">
    <div class="container is-max-desktop">
      <h1 class="title is-3">Previzualizeaza !</h1>
      <b-loading
        :active="jobPreviewLoading"
        :can-cancel="false"
        :is-full-page="false"
      ></b-loading>

      <div v-if="job" class="box mt-5">
        <div class="sections">
          <div class="is-flex is-justify-content-space-between">
            <h2 class="title is-4 mb-0">{{ job.title }}</h2>
            <h2 class="is-size-5">{{ formatJobType(job.type) }}</h2>
          </div>
          <h2 class="is-size-5">{{ job.location }}</h2>

          <h3 class="title is-size-4 mb-0 mt-6">Descriere</h3>
          <hr class="my-1" />
          <div v-html="parseTextWithBulmaTags(job.description)"></div>
        </div>

        <div class="buttons is-flex is-justify-content-space-between">
          <b-button
            class="orange-btn mt-5"
            icon-right="arrow-left-bold"
            size="is-medium"
            type="is-primary"
            @click="
              $router.push(`/jobs/create?id=${$route.query.id}&option=edit`)
            "
          >
            Editeaza jobul
          </b-button>
          <b-button
            class="orange-btn mt-5"
            icon-left="arrow-right-bold"
            size="is-medium"
            type="is-primary"
            @click="
              $router.push(`/jobs/create?id=${$route.query.id}&option=checkout`)
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
import * as JobService from "~/services/job.service";
import {
  formatRemoteType,
  formatJobType,
  parseEscapedText,
  parseTextWithBulmaTags,
} from "~/utils/jobs";

export default Vue.extend({
  name: "JobPreview",
  middleware: "auth",

  data() {
    return {
      jobPreviewLoading: false,
      job: null,
    };
  },

  watch: {
    $route: {
      handler() {
        if (this.$route.query.id) {
          this.fetchJob();
        }
      },
      immediate: true
    },
  },

  methods: {
    formatRemoteType,
    formatJobType,
    parseEscapedText,
    parseTextWithBulmaTags,

    fetchJob() {
      const { query } = this.$route;

      const payload = `${query.id}/${query.option}`;

      if (query.id || query.option) {
        this.jobPreviewLoading = true;

        JobService.getJob(this.$axios, payload)
          .then((data) => {
            this.job = { ...data };
            this.job.title = parseEscapedText(data.title);

          })
          .finally(() => (this.jobPreviewLoading = false));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

:deep ul {
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
