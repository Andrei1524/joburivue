<template>
  <b-modal
    :active="modals[modalConstant].open"
    :destroy-on-hide="false"
    aria-label="Example Modal"
    aria-modal
    aria-role="dialog"
    close-button-aria-label="Close"
    has-modal-card
    trap-focus
    @close="closeModal(modalConstant)"
  >
    <template #default="props">
      <div
        style="border-radius: 8px"
        class="modal-card create-company-box columns is-gapless is-flex-direction-column p-3 mt-4"
      >
        <div class="is-flex column is-narrow">
          <figure class="image is-64x64 mr-2">
            <img
              :src="companyPreviewUrl"
              style="height: 100%; object-fit: cover"
            />
          </figure>
          <div>
            <h3
              :style="form.name === '' ? 'padding-bottom: 24px;' : ''"
              class="is-size-6 has-text-weight-bold"
            >
              {{ form.name }}
            </h3>
            <h5 class="is-size-7">
              <a :href="form.website" target="_blank"> company website ↗</a>
            </h5>
          </div>
        </div>
        <div class="mt-5">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <Input
              v-model.trim="form.name"
              :expanded="true"
              :label="'Numele companiei'"
              :placeholder="'...numele companiei'"
              :rules="'required'"
            />

            <Input
              v-model.trim="form.website"
              :expanded="true"
              :label="'Website'"
              :placeholder="'ex: https://www.mywebsite.ro/'"
            />

            <b-field>
              <b-upload
                v-model="logo"
                accept=".jpg,.png,.jpeg,.webp,.svg"
                drag-drop
                expanded
                @input="fileLoaded"
              >
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>UPLOAD LOGO (48x48 size preferable)</p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <b-field :label="'Descriere'">
              <client-only>
                <VueEditor
                  v-model="form.description"
                  :editor-toolbar="customToolbar"
                  :placeholder="'...descriere companie'"
                />
              </client-only>
            </b-field>

            <div class="buttons is-flex">
              <b-button
                :loading="loadingSubmit"
                class="orange-btn mt-5 mx-auto"
                icon-left="login"
                size="is-medium"
                type="is-primary"
                @click="handleSubmit(submit)"
              >
                {{
                  modalConstant === modalsConstants.CREATE_COMPANY_MODAL
                    ? "Salveaza"
                    : "Editeaza"
                }}
              </b-button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";

import { ValidationObserver } from "vee-validate";
import { mapMutations, mapState } from "vuex";
import { modalsConstants } from "~/utils/constants";
import Input from "~/components/_shared/form/Input.vue";

import * as CompanyService from "~/services/company.service";

export default Vue.extend({
  name: "CreateEditCompanyModal",
  components: { ValidationObserver, Input },

  props: {
    modalConstant: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }, "bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "code-block"],
      ],

      form: {
        name: "",
        website: "",
        description: "",
      },

      loadingSubmit: false,
      logo: null,
      companyPreviewUrl: "",
      storageId: null,

      modalsConstants,
    };
  },

  computed: {
    ...mapState("modals", ["modals"]),

    // TODO: put global function
    returnServerHostUrl() {
      return process.env.NODE_ENV === "production"
        ? window.location.host
        : "http://localhost:4000/";
    },
  },

  watch: {
    modals: {
      handler() {
        if (
          this.modals[this.modalConstant].open &&
          this.modalConstant === modalsConstants.EDIT_COMPANY_MODAL
        ) {
          this.form = { ...this.modals[this.modalConstant].data };
          this.companyPreviewUrl = this.returnServerHostUrl + this.form.logo;
          this.storageId = this.form.storageId;
        }
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations("modals", ["closeModal"]),

    fileLoaded() {
      this.companyPreviewUrl = URL.createObjectURL(this.logo);
    },

    deleteDropFile(index) {},

    async submit() {
      const payload = {
        ...this.form,
        logoFile: this.logo,
        companyStorageId: this.companyStorageId,
      };

      try {
        this.loadingSubmit = true;

        await CompanyService.createCompany(this.$axios, payload);
        this.loadingSubmit = false;

        this.closeModal(this.modalConstant);
        this.$nuxt.$emit("refreshCompaniesList");
        this.clearForm();
      } catch (error) {
        this.loadingSubmit = false;
      }
    },

    clearForm() {
      this.form.name = "";
      this.form.website = "";
      this.form.description = "";
      this.logo = null;
      this.companyPreviewUrl = "";
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.create-company-box {
  background: $white;
  border: 1px solid rgb(33 41 64 / 39%);
}
</style>
