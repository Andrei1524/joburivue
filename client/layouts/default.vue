<template>
  <div class="app">
    <b-loading :active="loading" :is-full-page="true"></b-loading>

    <div v-show="!loading">
      <div class="navbar-wrapper position-relative">
        <div class="container">
          <AppNavbar />
        </div>
      </div>
      <Nuxt :key="$route.fullPath" />
      <AppFooter class="mt-6" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppNavbar from "~/components/layout/AppNavbar.vue";
import AppFooter from "~/components/layout/AppFooter.vue";
import { notificationServiceMixin } from "~/mixins/notificationService";

export default Vue.extend({
  components: {
    AppNavbar,
    AppFooter,
  },

  mixins: [notificationServiceMixin],
  data() {
    return {
      loading: true,
    };
  },

  async created() {
    // TODO: fix fetching user 2 times
    try {
      await this.$auth.fetchUser();
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
@import "include-media";

.navbar-wrapper {
  background: $basic-white;
  box-shadow: 0px 1px 7px #0000001a;
}

@include media("<tablet") {
  .homepage {
    :deep .container {
      padding: 0px 15px;
    }
  }
}
</style>
