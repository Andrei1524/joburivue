<template>
  <div class="jobs-list-page">
    <AppHero :title="$t('app.jobs.created_jobs')" />

    <div class="container is-max-desktop login">
      <div class="box mt-4">
        <b-tabs v-model="activeTab" type="is-boxed" @input="handleGetJobs">
          <b-tab-item
            :label="$t('app.jobs.jobs')"
            value="true"
            icon="check-all"
          >
            <JobsList v-if="jobs.length" :jobs="jobs" :loading="loading" />
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import AppHero from "~/components/layout/AppHero.vue";
import JobsList from "~/components/_shared/JobsList.vue";

export default Vue.extend({
  name: "AppJobsList",
  components: {
    AppHero,
    JobsList,
  },

  data() {
    return {
      activeTab: 0,
      jobs: [],
      loading: false,
    };
  },

  async created() {
    await this.handleGetJobs(false); // planStatus isActive -> true
  },

  methods: {
    async handleGetJobs(planStatus: boolean) {
      this.loading = true;
      const response = await this.$axios.get(
        `jobs/userJobs?userJobs=true&createdBy=${this.$auth.user._id}`
      );

      this.jobs = response.data.data.sort((a, b) => {
        return (
          new Date(b.plan?.expireDate).valueOf() -
          new Date(a.plan?.expireDate).valueOf()
        );
      });

      this.loading = false;
    },
  },
});
</script>
