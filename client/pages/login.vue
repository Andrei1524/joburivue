<template>
  <div class="login-page">
    <h1 class="title is-1 has-text-centered mt-6">Intră în contul tău</h1>
    <div class="container is-max-desktop login">
      <div class="box mt-4">
        <div class="login">
          <b-field label="Email" :message="''">
            <b-input
              v-model="email"
              placeholder="ex: your@gmail.com"
              type="email"
            />
          </b-field>

          <b-field label="Password" :message="''">
            <b-input
              v-model="password"
              placeholder="123456"
              password-reveal
              type="password"
            />
          </b-field>

          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-left="login"
            expanded
          >
            Intră in cont
          </b-button>
        </div>

        <div class="reset-pass">
          <p class="mt-4">
            Ti-ai uitat parola? <a href="#">Resetați parola aici!</a>
          </p>
        </div>

        <hr />

        <div class="register-acc">
          <h5 class="title is-5 mt-2 mb-3">Nu ai un cont?</h5>
          <b-button
            tag="router-link"
            to="register"
            type="is-primary"
            size="is-medium"
            icon-left="account-plus"
            expanded
          >
            Creează cont
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppLogin",

  data() {
    return {
      email: "",
      password: "",
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.login {
  max-width: 400px;
}
</style>
