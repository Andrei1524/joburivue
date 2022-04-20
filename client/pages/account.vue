<template>
  <div class="login-page">
    <h1 class="title is-1 has-text-centered">Setările contului</h1>
    <div class="container is-max-desktop login">
      <div class="box mt-4">
        <div class="account">Account page</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { ValidationObserver, ValidationProvider } from "vee-validate";
import Vue from "vue";

export default Vue.extend({
  name: "AppLogin",
  middleware: "auth",
  // components: {
  //   ValidationObserver,
  //   ValidationProvider,
  // },

  data() {
    return {};
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
