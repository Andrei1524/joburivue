<template>
  <div class="register-page">
    <h1 class="title is-1 has-text-centered mt-6">Creează-ti un cont!</h1>
    <div class="container is-max-desktop register">
      <div class="box mt-4">
        <div class="register">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required"
              name="Nume"
            >
              <b-field
                label="Nume"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="form.name" placeholder="ex: john doe" />
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|email"
              name="Email"
            >
              <b-field
                label="Email"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="form.email" type="email"></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              vid="password"
              rules="required|min:8"
              name="Parola"
            >
              <b-field
                label="Parola"
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

            <ValidationProvider
              v-slot="{ errors, valid }"
              rules="required|confirmed:password"
              name="Confirmă Parola"
            >
              <b-field
                label="Confirmă Parola"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="form.confirmPassword"
                  password-reveal
                  placeholder="123456"
                  type="password"
                />
              </b-field>
            </ValidationProvider>

            <b-field class="mt-5">
              <b-checkbox v-model="form.weeklyJobAlerts">
                Trimite-mi săptămânal alerte de locuri de muncă și alte
                e-mailuri legate de Vue.js
              </b-checkbox>
            </b-field>

            <b-button
              :loading="loading"
              type="is-primary"
              size="is-medium"
              class="orange-btn mt-5"
              icon-left="login"
              expanded
              @click="handleSubmit(submit)"
            >
              Creează cont
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        weeklyJobAlerts: false,
      },

      loading: false,
    };
  },

  methods: {
    async submit() {
      this.loading = true;
      try {
        await AuthService.registerUser(this, this.$axios, this.form);
        this.$router.push("/");
      } catch (error) {}
      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.register {
  max-width: 400px;
}
</style>
