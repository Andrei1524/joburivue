<template>
  <div>
    <AppHero>
      <div class="is-flex is-justify-content-space-between">
        <div class="is-flex">
          <figure class="image is-48x48 mr-2">
            <img src="~assets/job-item-logo-example.png" />
          </figure>
          <div>
            <h2 class="title is-4 mb-0">Vue Web Developer [Remote / WFH]</h2>
            <h3 class="is-3">
              <span>Streem</span> |
              <span>WFH ☝ Remote Allowed</span>
            </h3>
          </div>
        </div>
        <div>
          <h2 class="title is-4 mb-0">Full-time</h2>
          <h3 class="is-3">€50k - €70k</h3>
        </div>
      </div>
    </AppHero>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHero from "~/components/layout/AppHero.vue";

export default Vue.extend({
  name: "AppJobPage",
  components: {
    AppHero,
  },

  data() {
    return {};
  },

  async created() {},

  methods: {},
});
</script>
