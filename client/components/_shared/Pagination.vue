<template>
  <div class="pagination">
    <b-pagination v-model="current" :total="total" :size="'is-small'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";

export default Vue.extend({
  name: "AppPagination",

  components: {},
  props: {
    search: {
      type: String,
      required: true,
      default: null,
    },
  },

  data() {
    return {
      current: 0,
      total: 0,
    };
  },

  async fetch() {
    await this.handleGetData();
  },

  watch: {
    search() {
      this.searchDebounce();
    },
  },

  methods: {
    computedQueryUrl() {
      let queryUrl = "";

      if (this.search) {
        queryUrl = `?search=${this.search}`;
      }

      return queryUrl;
    },

    async handleGetData() {
      const response = await this.$axios.get(`/jobs${this.computedQueryUrl()}`);

      this.$emit("data", response.data);
    },

    searchDebounce: _.debounce(function () {
      this.handleGetData();
    }, 300),
  },
  fetchOnServer: false,
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

::v-deep .pagination-link.is-current {
  background-color: $chambray-blue;
}
</style>
