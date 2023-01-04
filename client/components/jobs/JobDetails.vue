<template>
  <div class="job-details">
    <div class="container is-max-desktop">
      <h1 class="title is-3">Creeaza jobul!</h1>
      <div :loading="jobDetailsLoading" class="box mt-5">
        <b-loading
          :active="jobDetailsLoading"
          :can-cancel="false"
          :is-full-page="false"
        ></b-loading>

        <div class="sections">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <div class="position w-100">
              <h5 class="title is-5 mt-0 mb-4">Pozitie</h5>
              <hr class="mt-0" />

              <Input
                v-model.trim="form.title"
                :label="'Titlu Job'"
                :placeholder="'Adauga Titlul'"
                :rules="'required|min:8'"
              />

              <b-field grouped>
                <Select
                  v-model.trim="form.type"
                  :label="'Tipul jobului'"
                  :options="jobTypes"
                  :placeholder="'Selecteaza un nume'"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100 mr-5'"
                />

                <Select
                  v-model.trim="form.level"
                  :label="'Nivel/optional'"
                  :options="jobLevels"
                  :placeholder="'Selecteaza un nivel'"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100'"
                />
              </b-field>

              <b-field :label="'Descriere'">
                <client-only>
                  <VueEditor
                    v-model="form.description"
                    :editor-toolbar="customToolbar"
                    :placeholder="'Descrie jobul cat mai clar!'"
                  />
                </client-only>
              </b-field>

              <div class="tags-section mb-5">
                <TagSearch v-model.trim="form.tags" />
              </div>

              <Input
                v-model.trim="form.location"
                :label="'Locatia jobului'"
                :placeholder="'Introdu o locatie'"
                :rules="'required'"
              />
            </div>
            <div class="application w-100">
              <h5 class="title is-5 mt-6 mb-4">Aplicare</h5>
              <hr class="mt-0" />

              <Input
                v-model.trim="form.applicationTarget"
                :label="'Link Aplicatie'"
                :placeholder="'Trimiteți aplicațiile la această adresă de e-mail sau furnizați adrese URL.'"
                :rules="'required'"
              />
            </div>
            <div class="compensation w-100">
              <h5 class="title is-5 mt-6 mb-4">Compensare</h5>
              <hr class="mt-0" />

              <b-field class="currencies" grouped>
                <Select
                  v-model.trim="form.currency"
                  :label="'Valută'"
                  :options="jobCurrencies"
                  :placeholder="'Selecteaza o valuta'"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100 mr-5'"
                />

                <Input
                  v-model.trim="form.minSalary"
                  :expanded="true"
                  :label="'Salariu Minim'"
                  :placeholder="'Adauga salariu minim'"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100 mr-5'"
                />

                <Input
                  v-model.trim="form.maxSalary"
                  :expanded="true"
                  :label="'Salariu Maxim'"
                  :placeholder="'Adauga salariu maxim'"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100'"
                />
              </b-field>
            </div>

            <div class="buttons is-flex">
              <b-button
                :loading="loadingSubmit"
                class="orange-btn mt-5 ml-auto"
                icon-left="login"
                size="is-medium"
                type="is-primary"
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
import { parseEscapedText } from "~/utils/jobs";

export default Vue.extend({
  name: "JobDetails",
  components: {
    ValidationObserver,

    TagSearch,
    Input,
    Select,
  },
  middleware: "auth",

  data() {
    return {
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }, "bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "code-block"],
      ],

      jobTypes: [
        {
          value: "full_time",
          label: "Full-Time",
        },
        {
          value: "part_time",
          label: "Part-Time",
        },
        {
          value: "freelance",
          label: "Freelance",
        },
        {
          value: "internship",
          label: "Internship",
        },
        {
          value: "temporary",
          label: "Temporary",
        },
      ],
      jobLevels: [
        {
          value: "begginner",
          label: "Begginer",
        },
        {
          value: "junior",
          label: "Junior",
        },
        {
          value: "mid_level",
          label: "Mid-level",
        },
        {
          value: "senior",
          label: "Senior",
        },
        {
          value: "lead",
          label: "Lead",
        },
      ],
      jobCurrencies: [
        {
          value: "euro",
          label: "Euro",
        },
        {
          value: "ron",
          label: "RON",
        },
      ],
      tagSearch: "",

      form: {
        title: "",
        type: "",
        level: "",
        description: "",

        tags: [],
        location: "",
        applicationTarget: "",
        // TODO: add input dropdown: remote, remote_allowed
        remoteType: "remote_allowed",
        currency: "",
        minSalary: "",
        maxSalary: "",
      },
      formClone: {},

      jobDetailsLoading: false,
      loadingSubmit: false,
    };
  },

  fetch() {
    const { query } = this.$route;

    const payload = `${query.id}/${query.option}`;

    if (query.id || query.option) {
      this.jobDetailsLoading = true;

      JobService.getJob(this.$axios, payload)
        .then((data) => {
          this.form = { ...data };
          this.form.description = this.parseEscapedText(this.form.description);
          this.form.title = this.parseEscapedText(this.form.title);

          this.formClone = _.cloneDeep(this.form);
        })
        .finally(() => (this.jobDetailsLoading = false));
    }
  },

  watch: {
    $route() {
      if (!this.$route.query.id) {
        // TODO: clear form
        this.form = {};
      }
    },
  },

  methods: {
    parseEscapedText,

    async submit() {
      // TODO: handle companies ID from actual companies
      const tagsIds = this.form.tags.map((tag) => tag && tag._id);
      const payload = {
        ...this.form,
        tags: tagsIds,
        company: "353aaaf5b353",
        createdBy: this.form.createdBy || this.$auth.user._id,
      };

      // if form is not changed do not call POST req
      if (_.isEqual(this.form, this.formClone)) {
        return this.$router.push(
          `/jobs/create?id=${this.form.jobId}&option=preview`
        );
      }

      try {
        this.loadingSubmit = true;
        const createdJob = await JobService.createJob(this.$axios, payload);
        this.loadingSubmit = false;

        await this.$router.push(
          `/jobs/create?id=${createdJob.jobId}&option=preview`
        );
      } catch (error) {
        this.loadingSubmit = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
@import "include-media";

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

@include media("<phone") {
  :deep .currencies {
    .is-grouped {
      flex-wrap: wrap;

      > span {
        margin-right: 0 !important;
      }
    }
  }

  .buttons {
    .button {
      margin: 0 auto;
    }
  }
}
</style>
