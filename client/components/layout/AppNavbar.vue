<template>
  <b-navbar class="py-2" transparent>
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
            Adauga Job
          </b-button>
        </b-navbar-item>

        <b-dropdown class="nav-dropdown" aria-role="list" position="is-bottom-left" append-to-body :trap-focus="true">
          <template #trigger="{ active }">
            <b-button
              type="is-primary"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            >
              <span class="is-flex is-align-items-center">
                <figure class="image is-32x32 mr-2">
                  <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
                Mandrican Andrei
              </span>
            </b-button>
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

<style lang="scss" scoped>
@import './design/variables';
</style>
