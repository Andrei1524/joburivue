<template>
  <div class="pagination">
    <b-pagination v-model="current" :total="total" :per-page="limit" />
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
      current: 1,
      total: 0,
      limit: 10,
      loading: false,
    };
  },

  async fetch() {
    await this.handleGetData();
  },

  watch: {
    search() {
      this.searchDebounce();
    },

    current() {
      this.handleGetData();
    },

    loading() {
      this.$emit("loading", this.loading);
    },
  },

  methods: {
    computedQueryUrl() {
      let queryUrl = "";

      if (this.search) {
        queryUrl = `?search=${this.search}`;
      }

      if (!this.search) {
        queryUrl += `?page=${this.current}`;
      } else {
        queryUrl += `&page=${this.current}`;
      }

      return queryUrl;
    },

    async handleGetData() {
      this.loading = true;
      const response = await this.$axios.get(`/jobs${this.computedQueryUrl()}`);
      this.total = response.data.total_items;

      this.$emit("data", response.data.data);
      this.loading = false;
    },

    searchDebounce: _.debounce(function () {
      this.current = 1;
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
