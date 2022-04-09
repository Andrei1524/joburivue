<template>
  <b-navbar class="py-2" :close-on-click="false">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <Logo />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#"> Joburi </b-navbar-item>
      <b-navbar-item href="#"> Despre </b-navbar-item>
      <b-navbar-item href="#"> Preturi </b-navbar-item>
    </template>

    <template #end>
      <div class="is-flex is-align-items-center">
        <b-navbar-item tag="router-link" :to="{ path: '/jobs/create' }">
          <b-button type="is-primary"> Adauga Job </b-button>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <b-field>
            <b-select
              v-model="selectedLanguage"
              :placeholder="selectedLanguage"
              icon="earth"
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
          :label="$store.state.auth.loggedIn ? $auth.user.name : ''"
          :trap-focus="true"
        >
          <b-navbar-item tag="router-link" :to="{ path: '/account' }">
            Account</b-navbar-item
          >
          <b-navbar-item> - </b-navbar-item>
          <b-navbar-item @click="logout">Logout</b-navbar-item>
        </b-navbar-dropdown>
        <!-- LOGGED OUT -->
        <b-navbar-item
          v-show="!$store.state.auth.loggedIn"
          tag="router-link"
          :to="{ path: '/login' }"
        >
          <b-button type="is-primary" icon-left="account-plus">
            Intră in cont / Creează cont
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
      selectedLanguage: "ro",
      languages: ["ro", "en"],
    };
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
