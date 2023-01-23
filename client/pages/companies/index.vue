<template>
  <div className="companies-page">
    <AppHero :title="'Companiile mele '" icon="domain" />

    <div
      class="is-flex is-flex-direction-column is-align-items-center container is-max-desktop"
    >
      <!--   COMPANIES LIST   -->
      <CompaniesList class="mb-0" />

      <!--  CREATE A COMPANY BUTTON-->
      <div
        class="create-company-button is-flex is-align-items-center is-size-4 is-clickable p-3"
        @click="openModal(modalsConstants.CREATE_COMPANY_MODAL)"
      >
        Creeaza o companie
        <b-icon class="ml-1" icon="plus-box" size="is-medium" />
      </div>

      <!--  CREATE A COMPANY MODAL BOX-->
      <CreateCompanyModal
        :modal-constant="modalsConstants.CREATE_COMPANY_MODAL"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { modalsConstants } from "~/utils/constants";

import AppHero from "~/components/layout/AppHero.vue";
import CreateCompanyModal from "~/components/modals/CreateCompanyModal.vue";
import CompaniesList from "~/components/companies/CompaniesList.vue";

export default Vue.extend({
  name: "AppCompanies",
  components: {
    AppHero,
    CreateCompanyModal,
    CompaniesList,
  },
  middleware: "auth",

  data() {
    return {
      modalsConstants,
    };
  },

  methods: {
    ...mapMutations("modals", ["openModal"]),
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.create-company-button {
  border: 1px solid rgb(33 41 64 / 39%);
  width: fit-content;
  background: #fff;
  border-radius: 4px;
  box-shadow: 3px 1px 5px #0000002e;
}

.companyLogo {
  height: 100%;
  object-fit: cover;
}
</style>
