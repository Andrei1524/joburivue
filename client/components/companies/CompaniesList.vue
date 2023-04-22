<template>
  <section class="section">
    <div
      v-for="company in data"
      :key="company._id"
      class="box company-item columns is-gapless is-align-items-center"
    >
      <div class="column is-narrow">
        <figure class="image is-64x64 mr-2">
          <img :src="returnServerHostUrl + company.logo" />
        </figure>
      </div>

      <div class="column job-title is-narrow">
        <h5 class="title is-5">{{ company.name }}</h5>
      </div>

      <div
        class="column job-info is-flex is-flex-direction-column is-justify-content-space-between ml-6"
      >
        <div class="tags is-align-self-flex-end">
          <a :href="company.website" class="is-underlined" target="_blank"
            >website</a
          >
        </div>
        <div class="job-info-text is-align-self-flex-end">
          <div class="buttons is-flex">
            <b-button
              class="mx-auto"
              icon-left="login"
              size="is-small"
              type="is-primary"
              @click="openEditCompanyModal(company)"
            >
              Editeaza
            </b-button>
            <b-button
              class="orange-btn ml-2"
              icon-left="delete"
              size="is-small"
              type="is-primary"
              @click="confirmDelete(company)"
            >
              Delete
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import * as CompanyService from "~/services/company.service";
import { modalsConstants } from "~/utils/constants";

export default Vue.extend({
  name: "CompaniesList",

  data() {
    return {
      loading: false,
      data: [],

      modalsConstants,
    };
  },

  async fetch() {
    await this.fetchCompanies();
  },

  computed: {
    // TODO: put global function
    returnServerHostUrl() {
      return process.env.NODE_ENV === "production"
        ? window.location.host
        : "http://localhost:4000/";
    },
  },

  created() {
    this.$nuxt.$on("refreshCompaniesList", this.fetchCompanies);
  },

  methods: {
    ...mapMutations("modals", ["openModal"]),

    fetchCompanies() {
      this.loading = true;

      CompanyService.getUserCompanies(this.$axios)
        .then((data) => {
          this.data = data;
        })
        .finally(() => (this.loading = false));
    },

    openEditCompanyModal(company) {
      this.openModal({
        constantName: modalsConstants.EDIT_COMPANY_MODAL,
        open: true,
        data: company,
      });
    },

    confirmDelete(company) {
      const deleteCompany = async (company) => {
        await CompanyService.deleteUserCompany(this.$axios, company);
        await this.fetchCompanies();
      };

      this.$buefy.dialog.confirm({
        title: "Deleting company",
        message:
          "Are you sure you want to <b>delete</b> this company? This action cannot be undone.",
        confirmText: "Delete Company",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => deleteCompany(company),
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

img {
  width: 100%;
  height: 100%;
}

.company-item {
}
</style>
