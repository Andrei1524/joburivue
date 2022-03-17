<template>
  <b-navbar class="py-2">
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
      <div class="is-flex is-align-items-center">
        <b-navbar-item>
          <b-button
            type="is-primary"
          >
            Delete
          </b-button>
        </b-navbar-item>

        <b-dropdown class="nav-dropdown" aria-role="list" position="is-bottom-left">
          <template #trigger="{ active }">
            <b-button
              label="Click me!"
              type="is-primary"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item aria-role="listitem">
            Action
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            Another action
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            Something else
          </b-dropdown-item>
        </b-dropdown>
      </div>
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
