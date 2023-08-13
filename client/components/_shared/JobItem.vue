<template>
  <NuxtLink
    :to="goToJobPage()"
    class="columns job-item is-gapless is-align-items-center p-2"
    :class="{
      'job-item > active':
        new Date(job.plan?.expireDate) >= new Date() && showPlanExpireDate,
      'job-item > inactive':
        job.plan !== undefined && new Date(job.plan?.expireDate) < new Date(),
    }"
  >
    <div class="column is-narrow">
      <figure class="image is-64x64 mr-2">
        <img
          style="height: 100%; object-fit: cover"
          :src="returnServerHostUrl + job.company?.logo"
        />
      </figure>
    </div>
    <div class="column job-title is-narrow">
      <h5 class="title is-5">
        {{ parseEscapedText(job.title) }}

        <template v-if="showPlanExpireDate">
          <span
            v-if="
              planTimeRemaining && new Date(job.plan?.expireDate) >= new Date()
            "
            class="plan-time-diff > active"
            >Active &#183; {{ planTimeRemaining }} days remaining
          </span>
          <span v-else class="plan-time-diff > inactive">Expired</span>
        </template>
      </h5>
      <h6 class="subtitle has-text-left is-6">
        <span class="has-text-weight-bold">{{ job.company?.name }}</span>
        {{ job.location }} <span class="hand">&#9757;</span>
        {{ formatRemoteType(job.remoteType) }}
      </h6>
    </div>
    <div
      class="column job-info is-flex is-flex-direction-column is-justify-content-space-between"
    >
      <div class="tags is-align-self-flex-end">
        <Tag
          :tag-type="'salary-range'"
          :value="`${formatCurrencySign(job.currency)}${formatMoney(
            job.minSalary
          )} - ${formatCurrencySign(job.currency)}${formatMoney(
            job.maxSalary
          )}`"
          class="mr-2"
        />
        <Tag :tag-type="'location'" :value="'Romania'" />
      </div>
      <div class="job-info-text is-align-self-flex-end">
        <span class="has-text-weight-bold mr-2">{{
          formatJobType(job.type)
        }}</span>
        {{ formattedCreatedAt }}
      </div>
    </div>
  </NuxtLink>
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
    planTimeRemaining() {
      if (!this.job.plan) return "";

      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(
        Math.abs(
          (new Date(this.job.plan.expireDate).getTime() -
            new Date().getTime()) /
            oneDay
        )
      );

      return diffDays;
    },

    showPlanExpireDate() {
      return this.job.plan && this.$route.path !== "/";
    },

    formattedCreatedAt() {
      return this.job.plan?.planRenewed
        ? this.$dayjs(this.job.plan?.planRenewed).fromNow()
        : "";
    },

    // TODO: put global function
    returnServerHostUrl() {
      return process.env.NODE_ENV === "production"
        ? window.location.origin + "/"
        : "http://localhost:4000/";
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
        case "account-jobs-list":
          return `/add-job?id=${this.job.jobId}&option=preview`;

        default:
          return `/jobs/${decodeEntity(this.job.title)
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/-{1,}/g, "-")}#${this.job.jobId}`;
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
  border-radius: 5px;
  box-shadow: 3px 1px 5px #00000008;
  transition: all 0.5s;
  border: 1px solid #37648a24;

  &:hover {
    box-shadow: 3px 4px 5px #00000030;
    border: 1px solid #37648ab0;
  }

  &.active {
    border: 1px solid green;
  }

  &.inactive {
    border: 1px solid red;
  }
}

@media only screen and (max-width: 769px) {
  .job-title {
    text-align: center;
    margin: 1em 0 !important;
  }

  .job-item {
    height: fit-content;
    display: block;

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

.plan-time-diff {
  font-weight: bold;
  font-size: 14px;

  &.active {
    color: green;
  }

  &.inactive {
    color: red;
  }
}
</style>
