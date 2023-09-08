<template>
  <div>
    <section class="mt-4">
      <JobItem
        v-for="job in data.data"
        :key="job._id"
        class="mb-3"
        :job="job"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const { data } = await $api.JobService.getJobs();
</script>

<style scoped></style>
