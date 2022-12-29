<template>
  <div className="companies-page">
    <AppHero :title="'Companiile mele'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHero from "~/components/layout/AppHero.vue";

export default Vue.extend({
  name: "AppLogin",
  components: {
    AppHero,
  },
  middleware: "auth",

  data() {
    return {};
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
  @import "./design/variables";
</style>
