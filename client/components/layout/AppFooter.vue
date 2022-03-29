<template>
  <footer class="footer py-6">
    <div class="content container is-max-desktop">
      <div class="columns is-vcentered">
        <div class="column is-one-fifth">
          <Logo :invert-colors="true" :font-size="'3'" />
        </div>

        <div class="column links is-flex">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Terms & Policy</a></li>
          </ul>
          <ul>
            <li><a href="#">Affiliate</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms and conditions</a></li>
          </ul>
        </div>

        <div class="column has-text-right">
          <h4 class="lets-talk mb-0">
            Let's talk!
          </h4>
          <a class="mail" href="#">hello@joburivue.ro</a>
          <div class="icons mt-2">
            <a href="#">
              <b-icon
                icon="facebook"
                size="is-medium"
              />
            </a>
            <a href="#">
              <b-icon
                icon="linkedin"
                size="is-medium"
              />
            </a>
            <a href="#">
              <b-icon
                icon="twitter"
                size="is-medium"
              />
            </a>
          </div>
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

  ul {
    list-style-type: none;

    &:first-child {
      margin-left: 0;
    }
  }

  a {
    color: $white;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
    }
  }

  .lets-talk {
    color: $orange;
  }

  .icons {
    a {
      margin-left: 5px;
      transition: 0.4s;

      &:hover {
        color: $orange;
      }
    }
  }
}
</style>
