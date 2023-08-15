<template>
  <div class="login-page">
    <h1 class="title is-1 has-text-centered">
      {{ $t("app.auth.sign_in_account_message") }}
    </h1>
    <div class="container is-max-desktop login">
      <div class="box mt-4">
        <div class="login">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|email"
              name="Email"
            >
              <b-field
                :label="$t('app.auth.email')"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="form.email" type="email"></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              vid="password"
              rules="required|password:8"
              name="Parola"
            >
              <b-field
                :label="$t('app.auth.password')"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="form.password"
                  placeholder="123456"
                  password-reveal
                  type="password"
                />
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
              {{ $t("app.auth.login") }}
            </b-button>

            <div class="reset-pass">
              <p class="mt-4">
                {{ $t("app.auth.forgot_password") }}
                <a href="#">{{ $t("app.auth.reset_password_here") }}</a>
              </p>
            </div>

            <hr />

            <div class="register-acc">
              <h5 class="title is-5 mt-2 mb-3">
                {{ $t("app.auth.no_account") }}
              </h5>
              <b-button
                tag="router-link"
                to="register"
                type="is-primary"
                size="is-medium"
                icon-left="account-plus"
                expanded
              >
                {{ $t("app.auth.create_an_account") }}
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
import * as AuthService from "../services/auth.service";

export default Vue.extend({
  name: "AppLogin",
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      loading: false,
    };
  },

  methods: {
    async submit() {
      this.loading = true;
      try {
        await AuthService.loginUser(this, this.form);
        this.$router.replace("/");
      } catch (error) {}
      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.login {
  max-width: 400px;
}
</style>
