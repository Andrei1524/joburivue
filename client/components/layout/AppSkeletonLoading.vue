<template>
  <section v-if="loading">
    <b-skeleton
      v-for="(bar, i) in bars"
      :key="i"
      :width="`${(i / bars) * 100}%`"
      :animated="loading"
    ></b-skeleton>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppSkeletonLoading",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },

    bars: {
      type: Number,
      default: 3,
    },
  },
});
</script>
