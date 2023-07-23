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
            <span
              v-for="locale in availableLocales"
              :key="locale.code"
              class="is-clickable"
              @click="$i18n.setLocale(locale.code)"
              >{{ locale.code }}</span
            >
          </b-field>
        </b-navbar-item>

        <!-- LOGGED IN -->
        <b-navbar-dropdown
          v-show="$auth.loggedIn"
          :label="
            $store.state.auth.loggedIn ? $auth.user && $auth.user.name : ''
          "
          :trap-focus="true"
        >
          <b-navbar-item :to="{ path: '/account' }" tag="router-link">
            <b-icon class="mr-1" icon="account" />
            {{ $t("app.general.account") }}
          </b-navbar-item>
          <b-navbar-item>
            <b-icon class="mr-1" icon="code-braces" />
            {{ $t("app.general.vue_profile") }}
          </b-navbar-item>
          <hr class="dropdown-divider my-2" />
          <b-navbar-item :to="{ path: '/jobs/list' }" tag="router-link">
            <b-icon class="mr-1" icon="briefcase" />
            {{ $t("app.general.my_jobs") }}
          </b-navbar-item>
          <b-navbar-item :to="{ path: '/companies' }" tag="router-link">
            <b-icon class="mr-1" icon="domain" />
            {{ $t("app.general.companies") }}
          </b-navbar-item>
          <b-navbar-item @click="logout">
            <b-icon class="mr-1" icon="logout" />
            {{ $t("app.general.logout") }}
          </b-navbar-item>
        </b-navbar-dropdown>

        <!-- LOGGED OUT -->
        <b-navbar-item
          v-show="!$auth.loggedIn"
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
    return {};
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },

  created() {
    console.log(this.$auth.loggedIn);
  },

  methods: {
    async logout() {
      await this.$auth.logout({
        data: {
          refresh_token: this.$auth.strategy.refreshToken.get(),
        },
      });
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
