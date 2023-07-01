<template>
  <b-navbar :close-on-click="true" class="py-2">
    <template #brand>
      <b-navbar-item :to="{ path: '/' }" tag="router-link">
        <Logo />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#">{{ $t("app.navbar.jobs") }}</b-navbar-item>
      <b-navbar-item href="#">{{ $t("app.navbar.about") }}</b-navbar-item>
      <b-navbar-item :to="{ path: '/pricing' }" tag="router-link">{{
        $t("app.navbar.prices")
      }}</b-navbar-item>
    </template>

    <template #end>
      <div class="is-flex is-align-items-center">
        <b-navbar-item :to="{ path: '/jobs/create' }" tag="router-link">
          <b-button type="is-primary">
            {{ $t("app.buttons.add_job") }}
          </b-button>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <b-field>
            <b-select
              v-model="selectedLanguage"
              :placeholder="selectedLanguage"
              icon="earth"
              @input="changeLanguage"
            >
              <option v-for="lng in languages" :key="lng" :value="lng">
                {{ lng }}
              </option>
            </b-select>
          </b-field>
        </b-navbar-item>

        <!-- LOGGED IN -->
        <b-navbar-dropdown
          v-show="$store.state.auth.loggedIn"
          :label="
            $store.state.auth.loggedIn ? $auth.user && $auth.user.name : ''
          "
          :trap-focus="true"
        >
          <b-navbar-item :to="{ path: '/account' }" tag="router-link">
            <b-icon class="mr-1" icon="account" />
            Cont
          </b-navbar-item>
          <b-navbar-item>
            <b-icon class="mr-1" icon="code-braces" />
            Profil Vue.js
          </b-navbar-item>
          <hr class="dropdown-divider my-2" />
          <b-navbar-item :to="{ path: '/jobs/list' }" tag="router-link">
            <b-icon class="mr-1" icon="briefcase" />
            Joburile mele
          </b-navbar-item>
          <b-navbar-item :to="{ path: '/companies' }" tag="router-link">
            <b-icon class="mr-1" icon="domain" />
            Companii
          </b-navbar-item>
          <b-navbar-item @click="logout">
            <b-icon class="mr-1" icon="logout" />
            Logout
          </b-navbar-item>
        </b-navbar-dropdown>

        <!-- LOGGED OUT -->
        <b-navbar-item
          v-show="!$store.state.auth.loggedIn"
          :to="{ path: '/login' }"
          tag="router-link"
        >
          <b-button icon-left="account-plus" type="is-primary">
            {{ $t("app.buttons.login_signup") }}
          </b-button>
        </b-navbar-item>
      </div>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import Logo from "~/components/layout/Logo.vue";

export default Vue.extend({
  name: "AppNavbar",
  components: {
    Logo,
  },

  data() {
    return {
      selectedLanguage: "en",
      languages: ["ro", "en"],
    };
  },

  created() {
    this.selectedLanguage =
      this.$i18n.getLocaleCookie() || this.$i18n.defaultLocale;
  },

  methods: {
    async logout() {
      await this.$auth.logout({
        data: {
          refresh_token: this.$auth.strategy.refreshToken.get(),
        },
      });
    },

    changeLanguage(langCode) {
      this.$i18n.setLocale(langCode);
      this.$i18n.setLocaleCookie(langCode);
      this.$i18n.locale = langCode;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
@import "include-media";

@include media("<tablet") {
  .navbar-end {
    > div {
      display: block !important;
    }
  }
}
</style>
