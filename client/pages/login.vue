<template>
  <div class="container is-max-desktop login">
    <h1 class="title is-1 has-text-centered mt-6">
      Intră în contul tău
    </h1>

    <div class="box">
      <b-field
        label="Email"
        :message="''"
      >
        <b-input
          v-model="email"
          type="email"
        />
      </b-field>

      <b-field
        label="Password"
        :message="''"
      >
        <b-input
          v-model="password"
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
