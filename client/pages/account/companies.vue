<template>
  <div className="companies-page">
    <AppHero :title="$t('app.companies.my_companies')" icon="domain" />

    <div
      class="is-flex is-flex-direction-column is-align-items-center container is-max-desktop"
    >
      <!--   COMPANIES LIST   -->
      <CompaniesList class="mb-0" />

      <!--  CREATE A COMPANY BUTTON-->
      <div
        class="create-company-button is-flex is-align-items-center is-size-4 is-clickable p-3"
        @click="
          openModal({
            constantName: modalsConstants.CREATE_COMPANY_MODAL,
            open: true,
          })
        "
      >
        {{ $t("app.companies.create_a_comapny") }}
        <b-icon class="ml-1" icon="plus-box" size="is-medium" />
      </div>

      <!--  CREATE A COMPANY MODAL BOX-->
      <CreateEditCompanyModal
        v-show="modals[modalsConstants.CREATE_COMPANY_MODAL].open"
        :modal-constant="modalsConstants.CREATE_COMPANY_MODAL"
      />

      <!--      EDIT A COMPANY MODAL BOX-->
      <CreateEditCompanyModal
        v-show="modals[modalsConstants.EDIT_COMPANY_MODAL].open"
        :modal-constant="modalsConstants.EDIT_COMPANY_MODAL"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { modalsConstants } from "~/utils/constants";

import AppHero from "~/components/layout/AppHero.vue";
import CreateEditCompanyModal from "~/components/modals/CreateEditCompanyModal.vue";
import CompaniesList from "~/components/companies/CompaniesList.vue";

export default Vue.extend({
  name: "AppCompanies",
  components: {
    AppHero,
    CreateEditCompanyModal,
    CompaniesList,
  },
  middleware: "auth",

  data() {
    return {
      modalsConstants,
    };
  },

  computed: {
    ...mapState("modals", ["modals"]),
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
