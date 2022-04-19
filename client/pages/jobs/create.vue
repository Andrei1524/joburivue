<template>
  <div class="create-job">
    <h1 class="title is-2 has-text-centered mt-5">Adauga un job</h1>
    <div class="container is-max-desktop">
      <AppProgress
        class="mt-6"
        :steps="progressSteps"
        :current-step="currentStep"
      />
      <div class="box mt-5">
        <div class="sections">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <div class="position w-100">
              <h5 class="title is-5 mt-0 mb-4">Pozitie</h5>
              <hr class="mt-0" />

              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="job_title"
                class="d-block mb-5"
              >
                <b-field
                  label="Titlu Job"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="form.title"
                    placeholder="Adauga titlul"
                  ></b-input>
                </b-field>
              </ValidationProvider>

              <b-field grouped>
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  class="d-block w-100 mr-5"
                  rules="required"
                  name="job_type"
                >
                  <b-field
                    label="Tipul jobului"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="form.type"
                      placeholder="Selecteaza un nume"
                      expanded
                    >
                      <option
                        v-for="option in jobTypes"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </b-select>
                  </b-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  class="d-block w-100"
                  rules="required"
                  name="job_level"
                >
                  <b-field
                    label="Nivel/optional"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="form.level"
                      placeholder="Selecteaza un nivel"
                      expanded
                    >
                      <option
                        v-for="option in jobLevels"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </b-select>
                  </b-field>
                </ValidationProvider>
              </b-field>

              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="job_description"
                class="d-block mb-5"
              >
                <b-field
                  label="Descriere job"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="form.description"
                    maxlength="500"
                    type="textarea"
                    placeholder="Descrie jobul cat mai clar!"
                  ></b-input>
                </b-field>
              </ValidationProvider>

              <div class="tags-section mb-5">
                <b-field label="Taguri" grouped group-multiline>
                  <b-field class="w-100 mb-2">
                    <div v-for="tag in form.tags" :key="tag.id" class="control">
                      <b-tag
                        type="is-primary"
                        attached
                        aria-close-label="Close tag"
                        closable
                        @close="removeTag(tag.id)"
                      >
                        {{ tag.value }}
                      </b-tag>
                    </div>
                  </b-field>

                  <b-field expanded>
                    <b-autocomplete
                      v-model="tagSearch"
                      :data="tagsData"
                      placeholder="e.g. Vue.js"
                      icon="magnify"
                      clearable
                      selectable-header
                      @select-header="handleSelectHeaderTag"
                      @select="handleSelectTag"
                    >
                      <template #header>
                        <a><span> Add new... </span></a>
                      </template>
                      <template #empty>No results found</template>
                    </b-autocomplete>
                  </b-field>
                </b-field>
              </div>

              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="job_location"
                class="d-block mb-52"
              >
                <b-field
                  label="Locatia jobului"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="form.location"
                    placeholder="Introdu o locatie"
                  ></b-input>
                </b-field>
              </ValidationProvider>
            </div>
            <div class="application w-100">
              <h5 class="title is-5 mt-6 mb-4">Aplicare</h5>
              <hr class="mt-0" />

              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                name="job_application_target"
                class="d-block mb-5"
              >
                <b-field
                  label="Application target"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="form.applicationTarget"
                    placeholder="Trimiteți aplicațiile la această adresă de e-mail sau furnizați adrese URL."
                  ></b-input>
                </b-field>
              </ValidationProvider>
            </div>
            <div class="compensation w-100">
              <h5 class="title is-5 mt-6 mb-4">Compensare</h5>
              <hr class="mt-0" />

              <b-field grouped>
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  class="d-block w-100 mr-5"
                  rules="required"
                  name="job_currency"
                >
                  <b-field
                    label="Valută"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="form.type"
                      placeholder="Selecteaza o valuta"
                      expanded
                    >
                      <option
                        v-for="option in jobCurrencies"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </b-select>
                  </b-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  class="d-block w-100 mr-5"
                  rules="required"
                  name="job_min_salary"
                >
                  <b-field
                    label="Salariu Minim"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input
                      v-model="form.minSalary"
                      placeholder="Adauga salariu minim"
                      expanded
                    ></b-input>
                  </b-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  class="d-block w-100 mr-5"
                  rules="required"
                  name="job_max_salary"
                >
                  <b-field
                    label="Salariu Maxim"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input
                      v-model="form.maxSalary"
                      placeholder="Adauga salariu maxim"
                      expanded
                    ></b-input>
                  </b-field>
                </ValidationProvider>
              </b-field>
            </div>

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
      // TODO: get this from server
      jobTypes: [
        { value: "full_time", label: "Full-Time" },
        { value: "part_time", label: "Part-Time" },
        { value: "freelance", label: "Freelance" },
        { value: "internship", label: "Internship" },
        { value: "temporary", label: "Temporary" },
      ],
      // TODO: get this from server
      jobLevels: [
        { value: "begginner", label: "Begginer" },
        { value: "junior", label: "Junior" },
        { value: "mid_level", label: "Mid-level" },
        { value: "senior", label: "Senior" },
        { value: "lead", label: "Lead" },
      ],
      jobCurrencies: [
        { value: "euro", label: "Euro" },
        { value: "ron", label: "RON" },
      ],
      currentStep: 1,
      tagSearch: "",
      tagsData: [],
      form: {
        title: "",
        type: "",
        level: "",
        description: "",
        tags: [
          {
            id: 0,
            value: "Vue.js",
          },
          {
            id: 1,
            value: "Node",
          },
        ],
        location: "",
        applicationTarget: "",
        salaryRange: [],
        minSalary: "",
        maxSalary: "",
      },
      loading: false,
    };
  },

  mounted() {},

  methods: {
    submit(values) {
      console.log(values);
    },

    removeTag(tagId) {
      const tagIndex = this.form.tags.findIndex((tag) => tag.id === tagId);
      this.form.tags.splice(tagIndex, 1);
    },

    handleSelectTag(tag) {
      console.log(tag);
    },

    // TODO: handle tag search and add
    handleSelectHeaderTag() {
      if (this.tagSearch) {
        this.form.tags.push({
          id: this.form.tags[this.form.tags.length - 1].id + 1,
          value: this.tagSearch,
        });
        this.tagSearch = null;
      }
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
