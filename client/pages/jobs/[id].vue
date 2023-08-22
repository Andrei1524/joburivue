<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('http://localhost:4000/api/v1/jobs');
console.log(data);
</script>

<style scoped></style>
