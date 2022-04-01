<template>
  <div class="container is-max-desktop login">
    <h1 class="title is-1 has-text-centered mt-6 mb-5">
      Intră în contul tău
    </h1>

    <div class="box mt-4">
      <b-field
        label="Email"
        :message="''"
      >
        <b-input
          v-model="email"
          placeholder="ex: your@gmail.com"
          type="email"
        />
      </b-field>

      <b-field
        label="Password"
        :message="''"
      >
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
        expanded
      >
        Login
      </b-button>

      <p class="mt-4">
        Ti-ai uitat parola? <a href="#">Resetați parola aici!</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppLogin',

  data () {
    return {
      email: '',
      password: ''
    }
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.login {
  max-width: 400px;
}
</style>
