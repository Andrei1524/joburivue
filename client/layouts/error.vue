<template>
  <div>
    <h1 v-if="error.statusCode === 404 || error.statusCode === 401">
      Page not found
    </h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "error",
  props: ["error"],
});
</script>
