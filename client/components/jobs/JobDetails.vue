<template>
  <div class="create-job">
    <div class="container is-max-desktop">
      <div class="box mt-5">
        <div class="sections">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <div class="position w-100">
              <h5 class="title is-5 mt-0 mb-4">Pozitie</h5>
              <hr class="mt-0" />

              <Input
                v-model.trim="form.title"
                :label="'Titlu Job'"
                :rules="'required'"
                :placeholder="'Adauga Titlul'"
              />

              <b-field grouped>
                <Select
                  v-model.trim="form.type"
                  :options="jobTypes"
                  :v-observer-class="'d-block w-100 mr-5'"
                  :label="'Tipul jobului'"
                  :rules="'required'"
                  :placeholder="'Selecteaza un nume'"
                />

                <Select
                  v-model.trim="form.level"
                  :options="jobLevels"
                  :v-observer-class="'d-block w-100'"
                  :label="'Nivel/optional'"
                  :rules="'required'"
                  :placeholder="'Selecteaza un nivel'"
                />
              </b-field>

              <Input
                v-model.trim="form.description"
                :label="'Descriere job'"
                :rules="'required'"
                :placeholder="'Descrie jobul cat mai clar!'"
                :type="'textarea'"
              />

              <div class="tags-section mb-5">
                <TagSearch v-model.trim="form.tags" />
              </div>

              <Input
                v-model.trim="form.location"
                :label="'Locatia jobului'"
                :rules="'required'"
                :placeholder="'Introdu o locatie'"
              />
            </div>
            <div class="application w-100">
              <h5 class="title is-5 mt-6 mb-4">Aplicare</h5>
              <hr class="mt-0" />

              <Input
                v-model.trim="form.applicationTarget"
                :label="'Link Aplicatie'"
                :rules="'required'"
                :placeholder="'Trimiteți aplicațiile la această adresă de e-mail sau furnizați adrese URL.'"
              />
            </div>
            <div class="compensation w-100">
              <h5 class="title is-5 mt-6 mb-4">Compensare</h5>
              <hr class="mt-0" />

              <b-field grouped>
                <Select
                  v-model.trim="form.currency"
                  :options="jobCurrencies"
                  :v-observer-class="'d-block w-100 mr-5'"
                  :label="'Valută'"
                  :rules="'required'"
                  :placeholder="'Selecteaza o valuta'"
                />

                <Input
                  v-model.trim="form.minSalary"
                  :v-observer-class="'d-block w-100 mr-5'"
                  :label="'Salariu Minim'"
                  :rules="'required'"
                  :placeholder="'Adauga salariu minim'"
                  :expanded="true"
                />

                <Input
                  v-model.trim="form.maxSalary"
                  :v-observer-class="'d-block w-100 mr-5'"
                  :label="'Salariu Maxim'"
                  :rules="'required'"
                  :placeholder="'Adauga salariu maxim'"
                  :expanded="true"
                />
              </b-field>
            </div>

            <div class="buttons is-flex">
              <b-button
                :loading="loading"
                type="is-primary"
                size="is-medium"
                class="orange-btn mt-5 ml-auto"
                icon-left="login"
                @click="handleSubmit(submit)"
              >
                Salveaza si previzualizeaza!
              </b-button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationObserver } from "vee-validate";
import Vue from "vue";
import _ from "lodash";
import * as JobService from "~/services/job.service";
import TagSearch from "~/components/_shared/TagSearch.vue";
import Input from "~/components/_shared/form/Input.vue";
import Select from "~/components/_shared/form/Select.vue";

export default Vue.extend({
  name: "JobDetails",
  components: {
    ValidationObserver,

    TagSearch,
    Input,
    Select,
  },
  middleware: "auth",

  // TODO: refactor whole component into smaller ones
  data() {
    return {
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
      tagSearch: "",

      form: {
        title: "",
        type: "",
        level: "",
        description: "",

        // TODO: get Tags from BE
        tags: [],
        location: "",
        applicationTarget: "",
        salaryRange: [],

        // TODO: handle remoteType
        remoteType: "remote_allowed",
        currency: "",
        minSalary: "",
        maxSalary: "",
      },
      loading: false,
    };
  },

  async created() {
    const { query } = this.$route;

    if (!_.isEmpty(query) && query.id.length > 0 && query.option.length > 0) {
      // TODO: handle get one job by id
      const job = await JobService.getJob(this.$axios, query.id);
      this.form = { ...job };
    }
  },

  methods: {
    async submit() {
      // TODO: handle company ID from actual company

      const tagsIds = this.form.tags.map((tag) => tag && tag._id);
      const payload = {
        ...this.form,
        tags: tagsIds,
        company: "353aaaf5b353",
      };

      try {
        const createdJob = await JobService.createJob(this.$axios, payload);
        this.$router.push(`/jobs/create?id=${createdJob.jobId}&option=preview`);

        this.$emit("submitJobDetails");
      } catch (error) {}
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
