<template>
  <div class="register-page">
    <h1 class="title is-1 has-text-centered mt-6">
      Intră în contul tău
    </h1>
    <div class="container is-max-desktop register">
      <div class="box mt-4">
        <div class="register">
          <b-field
            label="Nume"
            :message="''"
          >
            <b-input
              v-model="name"
              placeholder="ex: john doe"
            />
          </b-field>

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
            label="Parola"
            :message="''"
          >
            <b-input
              v-model="password"
              placeholder="123456"
              password-reveal
              type="password"
            />
          </b-field>

          <b-field
            label="Confirmă Parola"
            :message="''"
          >
            <b-input
              v-model="passwordConfirm"
              placeholder="123456"
              type="password"
            />
          </b-field>

          <b-field class="mt-5">
            <b-checkbox v-model="weeklyJobAlerts">
              Trimite-mi săptămânal alerte de locuri de muncă și alte e-mailuri legate de Vue.js
            </b-checkbox>
          </b-field>

          <b-button
            type="is-primary"
            size="is-medium"
            class="orange-btn mt-5"
            icon-left="login"
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
import Vue from 'vue'

export default Vue.extend({
  name: 'AppLogin',

  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      weeklyJobAlerts: false
    }
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.register {
  max-width: 400px;
}
</style>
