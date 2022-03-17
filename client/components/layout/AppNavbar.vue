<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        JoburiVue
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#">
        Joburi
      </b-navbar-item>
      <b-navbar-item href="#">
        Despre
      </b-navbar-item>
      <b-navbar-item href="#">
        Preturi
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppNavbar',

  data () {
    return {}
  }
})
</script>
