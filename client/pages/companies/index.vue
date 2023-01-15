<template>
  <div className="companies-page">
    <AppHero :title="'Companiile mele '" icon="domain" />

    <div
      class="is-flex is-flex-direction-column is-align-items-center container is-max-desktop"
    >
      <!--  CREATE A COMPANY BUTTON-->
      <div
        class="create-company-button is-flex is-align-items-center is-size-4 is-clickable p-3 mt-6"
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

export default Vue.extend({
  name: "AppCompanies",
  components: {
    AppHero,
    CreateCompanyModal,
  },
  middleware: "auth",

  data() {
    return {
      modalsConstants,
    };
  },

  methods: {
    ...mapMutations("modals", ["openModal"]),

    async submit() {
      console.log("submit");
      // const tagsIds = this.form.tags.map((tag) => tag && tag._id)
      // const payload = {
      //   ...this.form,
      //   tags: tagsIds,
      //   company: '353aaaf5b353',
      //   createdBy: this.form.createdBy || this.$auth.user._id,
      // }
      // // if form is not changed do not call POST req
      // if (_.isEqual(this.form, this.formClone)) {
      //   return this.$router.push(`/jobs/create?id=${this.form.jobId}&option=preview`)
      // }
      // try {
      //   this.loadingSubmit = true
      //   const createdJob = await JobService.createJob(this.$axios, payload)
      //   this.loadingSubmit = false
      //   await this.$router.push(`/jobs/create?id=${createdJob.jobId}&option=preview`)
      // } catch (error) {
      // }
    },
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
