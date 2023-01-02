<template>
  <div className="companies-page">
    <AppHero :title="'Companiile mele '" icon="domain" />

    <!--  CREATE A COMPANY BOX-->
    <div class="is-flex is-justify-content-center container is-max-desktop">
      <div
        class="create-company-box is-flex is-align-items-center is-size-4 is-clickable p-3 mt-6"
      >
        Creeaza o companie
        <b-icon class="ml-1" icon="plus-box" size="is-medium" />
      </div>
    </div>
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

.create-company-box {
  border: 1px solid rgb(33 41 64 / 39%);
  width: fit-content;
  background: #fff;
  border-radius: 4px;
  box-shadow: 3px 1px 5px #0000002e;
}
</style>
