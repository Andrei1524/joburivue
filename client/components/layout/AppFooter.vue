<template>
  <footer class="footer">
    <div class="content">
      <div class="columns">
        <div class="column">
          <Logo :invert-colors="true" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/layout/Logo.vue'

export default Vue.extend({
  name: 'AppFooter',
  components: {
    Logo
  },

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.footer {
  background-color: $yankees-blue;
}
</style>
