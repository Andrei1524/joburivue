<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered mt-5">Adauga un job</h1>
    <div class="container is-max-desktop login">
      <AppProgress :steps="progressSteps" :current-step="currentStep" />
      <h5 class="title is-5 has-text-centered mt-6 mb-2">Pozitie</h5>
      <hr class="mt-0" />

      <div class="sections">
        <div class="position w-100">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required"
              name="job_title"
            >
              <b-field
                label="Titlu Job"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="form.title"></b-input>
              </b-field>
            </ValidationProvider>

            <b-button
              :loading="loading"
              type="is-primary"
              size="is-medium"
              class="orange-btn mt-5"
              icon-left="login"
              expanded
              @click="handleSubmit(submit)"
            >
              Salveaza si previzualizeaza!
            </b-button>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Vue from "vue";
import AppProgress from "@/components/_shared/Progress.vue";

export default Vue.extend({
  name: "JobCreate",
  components: { AppProgress, ValidationObserver, ValidationProvider },
  middleware: "auth",
  data() {
    return {
      progressSteps: [
        {
          title: "Detalii job",
          icon: "pencil-box-multiple",
        },
        {
          title: "Preview",
          icon: "file-find",
        },
        {
          title: "Checkout",
          icon: "credit-card",
        },
      ],
      currentStep: 1,
      form: {
        title: "",
      },
      loading: false,
    };
  },

  mounted() {},

  methods: {
    submit(values) {
      console.log(values);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.container {
  > h5 {
    color: $gray;
  }
}

.sections {
  margin: 0 auto;
  max-width: 700px;

  > div {
    width: 100%;
  }
}
</style>
