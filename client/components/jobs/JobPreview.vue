<template>
  <div class="job-preview">
    <div class="container is-max-desktop">
      <h1 class="title is-3">Previzualizeaza !</h1>
      <b-loading
        :active="jobPreviewLoading"
        :is-full-page="false"
        :can-cancel="false"
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

  computed: {
    parseDescriptionWithBulmaTags() {
      const description = parseEscapedText(this.job.description);
      let parsedDecr;
      if (description) {
        parsedDecr = description
          .replaceAll("<h1>", "<h1 class='is-size-2'>")
          .replaceAll("<h2>", "<h2 class='is-size-3'>")
          .replaceAll("<h3>", "<h2 class='is-size-4'>")
          .replaceAll("<h4>", "<h2 class='is-size-5'>")
          .replaceAll("<h5>", "<h2 class='is-size-6'>");
      }
      return parsedDecr;
    },
  },

  watch: {
    $route() {
      if (this.$route.query.id) {
        this.fetchJob();
      }
    },
  },

  mounted() {
    this.fetchJob();
  },

  methods: {
    formatRemoteType,
    formatJobType,
    parseEscapedText,

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
