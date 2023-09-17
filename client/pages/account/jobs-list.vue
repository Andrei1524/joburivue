<template>
  <div class="jobs-list-page">
    <AppHero :title="$t('app.jobs.created_jobs')" />

    <div class="container mx-auto my-4">
      <div class="tabs">
        <div class="tab tab-lifted tab-active">{{ $t('app.jobs.jobs') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthStore();
const { $api } = useNuxtApp();

const activeTab = ref(0);
const jobs = ref([]);
const loading = ref(false);

try {
  loading.value = true;
  const { data } = await $api.JobService.getJobsCreatedByUser(user);

  const rawJobs = JSON.parse(JSON.stringify(data))._value.data;
  jobs.value = rawJobs.sort((a, b) => {
    return (
      new Date(b.plan?.expireDate).valueOf() -
      new Date(a.plan?.expireDate).valueOf()
    );
  });
} catch (error) {
  console.log(error);
} finally {
  loading.value = false;
}
</script>
