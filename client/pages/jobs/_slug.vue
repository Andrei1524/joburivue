<template>
  <div>
    <AppHero>
      <div>
        <div v-if="!loading" class="is-flex is-justify-content-space-between">
          <div class="is-flex">
            <figure class="image is-48x48 mr-2">
              <img src="~assets/job-item-logo-example.png" />
            </figure>
            <div>
              <h2 class="title is-4 mb-0">{{ parseEscapedText(job.title) }}</h2>
              <h3 class="is-3">
                <span>{{ job.company }}</span> |
                <span>☝ {{ formatRemoteType(job.remoteType) }}</span>
              </h3>
            </div>
          </div>
          <div>
            <h2 class="title is-4 mb-0">{{ formatJobType(job.type) }}</h2>
            <h3 class="is-3">
              {{
                `${formatCurrencySign(job.currency)}${formatMoney(
                  job.minSalary
                )} - ${formatCurrencySign(job.currency)}${formatMoney(
                  job.maxSalary
                )}`
              }}
            </h3>
          </div>
        </div>
        <AppSkeletonLoading :loading="loading" />
      </div>
    </AppHero>

    <!-- job content -->
    <div class="container is-max-desktop">
      <div v-if="!loading">
        <div>
          <h3 class="is-size-4 mb-0 mt-2">Descriere companie</h3>
          <hr class="my-1" />
          <p>job company description</p>
        </div>
        <div class="mt-4">
          <h3 class="is-size-4 mb-0 mt-2">Descriere job</h3>
          <hr class="my-1" />
          <p v-html="parseTextWithBulmaTags(job.description)"></p>
        </div>
      </div>

      <AppSkeletonLoading class="mt-4" :loading="loading" />

      <!-- skills & apply -->
      <div
        v-if="!loading"
        class="is-flex is-justify-content-space-between is-align-items-center mt-6"
      >
        <div class="skills w-50">
          <h3 class="is-size-4">Skills</h3>
          <hr class="my-1" />
          <!-- TODO: move tags to own component -->
          <div>
            <b-tag
              v-for="tag in job.tags"
              :key="tag._id"
              class="mr-1"
              type="is-primary"
              attached
              aria-close-label="Close tag"
            >
              {{ tag.name }}
            </b-tag>
          </div>
        </div>

        <div class="position-relative">
          <img class="apply-drawing" src="~assets/apply_drawing.png" alt="" />
          <b-button
            type="is-primary"
            class="orange-btn px-5 ml-6"
            tag="a"
            :href="formatApplicationTarget(job.applicationTarget)"
            target="_blank"
          >
            Aplica
          </b-button>
        </div>
      </div>
      <AppSkeletonLoading :loading="loading" :bars="3" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHero from "~/components/layout/AppHero.vue";
import AppSkeletonLoading from "~/components/layout/AppSkeletonLoading.vue";

import * as JobService from "~/services/job.service";
import {
  parseEscapedText,
  formatJobType,
  formatRemoteType,
  parseTextWithBulmaTags,
  formatCurrencySign,
  formatMoney,
} from "~/utils/jobs";

export default Vue.extend({
  name: "AppJobPage",
  components: {
    AppHero,
    AppSkeletonLoading,
  },
  transition: {
    mode: "out-in",
  },

  // TODO: to be improved with asyncData
  asyncData({ route }) {
    console.log(route);
  },

  data() {
    return {
      job: null,
      loading: true,
    };
  },

  methods: {
    parseEscapedText,
    formatJobType,
    formatRemoteType,
    parseTextWithBulmaTags,
    formatCurrencySign,
    formatMoney,

    async handleGetData() {
      try {
        const jobId = this.$route.hash.substr(1);
        const job = await JobService.getJob(this.$axios, jobId);
        this.job = job;
      } catch (error) {}
    },

    /* Check if string is email */
    checkIfEmail(str) {
      // Regular expression to check if string is email
      const regexExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

      return regexExp.test(str);
    },

    formatApplicationTarget(applicationTarget) {
      return this.checkIfEmail(applicationTarget)
        ? `mailto:${applicationTarget}`
        : applicationTarget;
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
