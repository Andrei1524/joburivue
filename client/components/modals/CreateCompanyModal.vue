<template>
  <b-modal
    :active="modals[modalsConstants.CREATE_COMPANY_MODAL]"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-label="Example Modal"
    close-button-aria-label="Close"
    aria-modal
    @close="closeModal(modalConstant)"
  >
    <template #default="props">
      <div
        class="modal-card create-company-box columns is-gapless is-flex-direction-column p-3 mt-4"
      >
        <div class="is-flex column is-narrow">
          <figure class="image is-48x48 mr-2">
            <img class="companyLogo" :src="companyPreviewUrl" />
          </figure>
          <div>
            <h3 class="is-size-6 has-text-weight-bold">PolkaDot</h3>
            <h5 class="is-size-7">company website ↗</h5>
          </div>
        </div>
        <div class="mt-5">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <Input
              v-model.trim="form.companyName"
              :label="'Numele companiei'"
              :placeholder="'...numele companiei'"
              :rules="'required'"
              :expanded="true"
            />

            <Input
              v-model.trim="form.companyWebsite"
              :label="'Website'"
              :placeholder="'...link site companie'"
              :expanded="true"
            />

            <b-field>
              <b-upload
                v-model="companyLogo"
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
                Salveaza
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

export default Vue.extend({
  name: "CreateCompanyModal",
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
        companyName: "",
        companyWebsite: "",
        description: "",
      },

      loadingSubmit: false,
      companyLogo: null,
      companyPreviewUrl: "",

      modalsConstants,
    };
  },

  computed: {
    ...mapState("modals", ["modals"]),
  },

  methods: {
    ...mapMutations("modals", ["closeModal"]),

    fileLoaded() {
      this.companyPreviewUrl = URL.createObjectURL(this.companyLogo);
    },

    deleteDropFile(index) {},

    async submit() {
      const payload = {
        ...this.form,
      };

      try {
        this.loadingSubmit = true;
        // const createdJob = await JobService.createJob(this.$axios, payload);
        // this.loadingSubmit = false;
      } catch (error) {}
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
