<template>
  <div class="job-preview">
    <div class="container is-max-desktop">
      <div class="box mt-5">
        <div class="buttons is-flex is-justify-content-space-between">
          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-right="arrow-left-bold"
            @click="$router.replace(`create?id=${$route.query.id}&option=edit`)"
          >
            Editeaza jobul
          </b-button>
          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-left="arrow-right-bold"
            @click="$router.replace(`create?id=${$route.query.id}&option=edit`)"
          >
            Finalizează
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";

export default Vue.extend({
  name: "JobDetails",
  middleware: "auth",

  data() {
    return {};
  },

  async created() {},

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
