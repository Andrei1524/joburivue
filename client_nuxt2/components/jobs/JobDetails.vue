<template>
  <div class="job-details">
    <div class="container is-max-desktop">
      <!-- <h1 class="title is-3">Creeaza jobul!</h1> -->
      <div :loading="jobDetailsLoading" class="box mt-5">
        <b-loading
          :active="jobDetailsLoading"
          :can-cancel="false"
          :is-full-page="false"
        ></b-loading>

        <div class="sections">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <!-- company select -->
            <div class="w-100 mb-6">
              <h5 class="title is-5 mt-0 mb-4">
                {{ $t("app.general.company") }}
              </h5>
              <hr class="mt-0 mb-2" />

              <!-- dropdown select -->
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required"
                class="d-block mb-5"
              >
                <b-field
                  :label="''"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-dropdown v-model="form.company" aria-role="list">
                    <template
                      v-if="!loadingUserCompanies"
                      #trigger="{ active }"
                    >
                      <div
                        v-if="form.company?.name"
                        class="company-select media"
                      >
                        <figure class="image is-64x64 mr-2">
                          <img
                            :src="returnServerHostUrl + form.company?.logo"
                            style="height: 100%; object-fit: cover"
                          />
                        </figure>
                        <div class="media-content">
                          <h3>{{ form.company?.name }}</h3>
                          <small>{{ form.company?.website }}</small>
                        </div>

                        <b-icon :icon="active ? 'menu-up' : 'menu-down'">
                        </b-icon>
                      </div>

                      <div
                        v-else
                        class="company-select media is-align-items-center"
                      >
                        <figure>
                          <b-icon size="is-large" icon="domain"></b-icon>
                        </figure>
                        <div class="ml-2 media-content">
                          <h3>Select company</h3>
                        </div>

                        <b-icon :icon="active ? 'menu-up' : 'menu-down'">
                        </b-icon>
                      </div>
                    </template>

                    <template v-if="userCompanies.length">
                      <b-dropdown-item
                        v-for="(company, i) in userCompanies"
                        :key="i"
                        :value="company"
                        aria-role="listitem"
                      >
                        <div class="media">
                          <figure class="image is-64x64 mr-2">
                            <img
                              :src="returnServerHostUrl + company.logo"
                              style="height: 100%; object-fit: cover"
                            />
                          </figure>
                          <div class="media-content">
                            <h3>{{ company.name }}</h3>
                            <small>{{ company.website }}</small>
                          </div>
                        </div>
                      </b-dropdown-item>
                    </template>

                    <!-- dropdown option to create a modal  -->
                    <template v-else>
                      <b-dropdown-item value="undefined">
                        <div
                          class="is-flex is-align-items-center is-justify-content-space-between"
                          @click="$router.push('/companies')"
                        >
                          <b-icon icon="plus" size="is-medium" />
                          <h3 class="ml-1">Create a company</h3>
                        </div>
                      </b-dropdown-item>
                    </template>
                  </b-dropdown>
                </b-field>
              </ValidationProvider>
            </div>

            <div class="position w-100">
              <h5 class="title is-5 mt-0 mb-4">
                {{ $t("app.general.position") }}
              </h5>
              <hr class="mt-0" />

              <Input
                v-model.trim="form.title"
                :label="$t('app.general.job_title')"
                :placeholder="$t('app.general.add_title')"
                :rules="'required|min:8'"
              />

              <b-field grouped>
                <Select
                  v-model.trim="form.type"
                  :label="$t('app.general.job_type')"
                  :options="jobTypes"
                  :placeholder="$t('app.general.select_a_type')"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100 mr-5'"
                />

                <Select
                  v-model.trim="form.level"
                  :label="$t('app.general.job_level')"
                  :options="jobLevels"
                  :placeholder="$t('app.general.select_a_level')"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100'"
                />
              </b-field>

              <b-field :label="$t('app.companies.description')">
                <client-only>
                  <VueEditor
                    v-model="form.description"
                    :editor-toolbar="customToolbar"
                    :placeholder="$t('app.general.describe_job_clear')"
                  />
                </client-only>
              </b-field>

              <div class="tags-section mb-5">
                <TagSearch v-model.trim="form.tags" />
              </div>

              <Input
                v-model.trim="form.location"
                :label="$t('app.general.job_location')"
                :placeholder="$t('app.general.add_a_location')"
                :rules="'required'"
              />
            </div>
            <div class="application w-100">
              <h5 class="title is-5 mt-6 mb-4">
                {{ $t("app.general.application") }}
              </h5>
              <hr class="mt-0" />

              <Input
                v-model.trim="form.applicationTarget"
                :label="$t('app.general.application_link')"
                :placeholder="$t('app.general.application_label')"
                :rules="'required'"
              />
            </div>
            <div class="compensation w-100">
              <h5 class="title is-5 mt-6 mb-4">
                {{ $t("app.general.compensation") }}
              </h5>
              <hr class="mt-0" />

              <b-field class="currencies" grouped>
                <Select
                  v-model.trim="form.currency"
                  :label="$t('app.general.currency')"
                  :options="jobCurrencies"
                  :placeholder="$t('app.general.select_currency')"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100 mr-5'"
                />

                <Input
                  v-model.trim="form.minSalary"
                  :expanded="true"
                  :label="$t('app.general.minimum_salary')"
                  :placeholder="$t('app.general.add_min_salary')"
                  :rules="'required'"
                  :v-observer-class="'d-block w-100 mr-5'"
                />

                <Input
                  v-model.trim="form.maxSalary"
                  :expanded="true"
                  :label="$t('app.general.maximum_salary')"
                  :placeholder="$t('app.general.add_max_salary')"
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
                {{ $t("app.general.save_and_preview") }}
              </b-button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Vue from "vue";
import _ from "lodash";
import * as JobService from "~/services/job.service";
import TagSearch from "~/components/_shared/TagSearch.vue";
import Input from "~/components/_shared/form/Input.vue";
import Select from "~/components/_shared/form/Select.vue";
import { parseEscapedText } from "~/utils/jobs";
import * as CompanyService from "~/services/company.service";

export default Vue.extend({
  name: "JobDetails",
  components: {
    ValidationObserver,
    ValidationProvider,

    TagSearch,
    Input,
    Select,
  },
  middleware: "auth",

  data() {
    return {
      userCompanies: [],
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
        company: undefined,
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
      loadingUserCompanies: false,
    };
  },

  async fetch() {
    const { query } = this.$route;

    await this.fetchUserCompanies();

    if (query.id || query.option) {
      this.jobDetailsLoading = true;

      await this.fetchJob(query);
    }
  },

  computed: {
    // TODO: put global function
    returnServerHostUrl() {
      return process.env.NODE_ENV === "production"
        ? window.location.origin + "/"
        : "http://localhost:4000/";
    },
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
        company: this.form.company,
        createdBy: this.form.createdBy || this.$auth.user._id,
      };

      // if form is not changed do not call POST req
      if (_.isEqual(this.form, this.formClone)) {
        return this.$router.push(
          `/add-job?id=${this.form.jobId}&option=preview`
        );
      }

      try {
        this.loadingSubmit = true;
        const createdJob = await JobService.createJob(this.$axios, payload);
        this.loadingSubmit = false;

        await this.$router.push(
          `/add-job?id=${createdJob.jobId}&option=preview`
        );
      } catch (error) {
        this.loadingSubmit = false;
      }
    },

    async fetchUserCompanies() {
      this.loadingUserCompanies = true;
      try {
        const data = await CompanyService.getUserCompanies(this.$axios);
        this.userCompanies = data;
      } finally {
        this.loadingUserCompanies = false;
      }
    },

    async fetchJob(query) {
      const payload = `${query.id}/${query.option}`;

      try {
        const data = await JobService.getJob(this.$axios, payload);
        this.form = { ...data };
        this.form.description = this.parseEscapedText(this.form.description);
        this.form.title = this.parseEscapedText(this.form.title);

        this.formClone = _.cloneDeep(this.form);
      } finally {
        this.jobDetailsLoading = false;
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

.company-select {
  user-select: none;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #304f8c52;
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
