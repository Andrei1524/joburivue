<template>
  <div
    class="columns job-item is-gapless is-align-items-center p-2"
    @click="goToJobPage"
  >
    <div class="column is-narrow">
      <figure class="image is-48x48 mr-2">
        <img src="~assets/job-item-logo-example.png" />
      </figure>
    </div>
    <div class="column job-title is-narrow">
      <h5 class="title is-5">
        {{ parseEscapedText(job.title) }}
      </h5>
      <h6 class="subtitle has-text-left is-6">
        <span class="has-text-weight-bold">{{ job.company.name }}</span>
        {{ job.location }} <span class="hand">&#9757;</span>
        {{ formatRemoteType(job.remoteType) }}
      </h6>
    </div>
    <div
      class="column job-info is-flex is-flex-direction-column is-justify-content-space-between"
    >
      <div class="tags is-align-self-flex-end">
        <Tag
          class="mr-2"
          :value="`${formatCurrencySign(job.currency)}${formatMoney(
            job.minSalary
          )} - ${formatCurrencySign(job.currency)}${formatMoney(
            job.maxSalary
          )}`"
          :tag-type="'salary-range'"
        />
        <Tag :value="'Romania'" :tag-type="'location'" />
      </div>
      <div class="job-info-text is-align-self-flex-end">
        <span class="has-text-weight-bold mr-2">{{
          formatJobType(job.type)
        }}</span>
        {{ formattedCreatedAt }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tag from "~/components/_shared/JobItemTag.vue";
import {
  formatRemoteType,
  formatJobType,
  parseEscapedText,
  formatCurrencySign,
  formatMoney,
} from "~/utils/jobs";

export default Vue.extend({
  name: "JobItem",

  components: {
    Tag,
  },

  props: {
    job: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    formattedCreatedAt() {
      const updatedAt = this.job.plan._id
        ? this.job.plan._id.updatedAt
        : this.job.createdAt;

      return this.$dayjs(updatedAt).fromNow();
    },
  },

  methods: {
    formatRemoteType,
    formatJobType,
    parseEscapedText,
    formatCurrencySign,
    formatMoney,

    goToJobPage() {
      const routeName = this.$route.name;

      function decodeEntity(inputStr) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
      }

      switch (routeName) {
        case "jobs-list":
          this.$router.push(`/jobs/create?id=${this.job.jobId}&option=preview`);
          break;

        default:
          this.$router.push(
            `/jobs/${decodeEntity(this.job.title)
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/-{1,}/g, "-")}#${this.job.jobId}`
          );
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.tags,
.tag {
  margin-bottom: 0;
}

.column:last-child {
  height: 100%;
}

.title {
  color: $yankees-blue !important;
}

.subtitle,
.job-info {
  color: $gray !important;
}

.job-item {
  height: 80px;
  background-color: $basic-white;
  cursor: pointer;
}

@media only screen and (max-width: 769px) {
  .job-title {
    text-align: center;
    margin: 1em 0 !important;
  }

  .job-item {
    height: fit-content;

    .subtitle {
      text-align: center !important;
    }

    .image {
      margin: 0 auto !important;
    }
  }

  .job-info {
    align-items: center;

    .tags,
    .job-info-text {
      align-self: unset !important;
    }
  }
}
</style>
