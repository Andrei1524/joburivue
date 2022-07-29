<template>
  <section>
    <JobItem v-for="job in jobs" :key="job._id" class="mb-3" :job="job" />
    <b-loading
      :active="loading"
      :is-full-page="false"
      :can-cancel="false"
    ></b-loading>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import JobItem from "~/components/_shared/JobItem.vue";

export default Vue.extend({
  name: "IndexPage",

  components: {
    JobItem,
  },

  props: {
    jobs: {
      type: Array,
      required: false,
      default: () => [],
    },

    loading: {
      type: Boolean,
    },
  },

  data() {
    return {};
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
