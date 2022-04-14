<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered mt-5">Adauga un job</h1>
    <div class="container is-max-desktop login">
      <ul class="process-steps is-flex is-justify-content-space-evenly">
        <li class="is-flex is-flex-direction-column is-align-items-center">
          <b-icon icon="pencil-box-multiple" size="is-medium" />
          Detalii job
        </li>
        <li class="is-flex is-flex-direction-column is-align-items-center">
          <b-icon icon="file-find" size="is-medium" />
          Preview
        </li>
        <li class="is-flex is-flex-direction-column is-align-items-center">
          <b-icon icon="credit-card" size="is-medium" />
          Checkout
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "JobCreate",
  components: {},
  middleware: "auth",
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
