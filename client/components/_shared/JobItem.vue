<template>
  <div class="columns job-item is-gapless is-align-items-center p-2">
    <div class="column is-narrow">
      <figure class="image is-48x48 mr-2">
        <img src="~assets/job-item-logo-example.png" />
      </figure>
    </div>
    <div class="column job-title is-narrow">
      <h5 class="title is-5">
        {{ job.title }}
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
          :value="`${formatMoney(job.minSalary)} - ${formatMoney(
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
        1hr ago
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { JobInterface } from "../../../server/src/ts/interfaces/job.interfaces";
import Tag from "~/components/_shared/JobItemTag.vue";

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

  methods: {
    formatMoney(value: number) {
      return Math.abs(value) > 999
        ? Math.sign(value) * Number((Math.abs(value) / 1000).toFixed(1)) + "k"
        : Math.sign(value) * Math.abs(value);
    },

    formatRemoteType(type: string) {
      if (type === "remote_allowed") {
        return "Remote Allowed";
      } else if (type === "work_remotely") {
        return "Work Remotely";
      }
    },

    // TODO: refactor to switch case
    formatJobType(jobType) {
      if (jobType === "full_time") {
        return "Full-time";
      } else if (jobType === "part_time") {
        return "Part-time";
      } else if (jobType === "freelance") {
        return "Freelance";
      } else if (jobType === "internship") {
        return "Internship";
      } else if (jobType === "temporary") {
        return "Temporary";
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
