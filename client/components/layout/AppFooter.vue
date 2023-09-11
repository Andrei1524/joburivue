<template>
  <footer class="footer py-6 bg-yankees-blue">
    <div class="content container mx-auto py-6">
      <div class="flex items-center w-full columns-4 gap-8">
        <Logo :invert-colors="true" />
        <ul>
          <li>
            <a href="#">{{ $t('app.footer.about_vuejobs') }}</a>
          </li>
          <li>
            <a href="#">{{ $t('app.navbar.prices') }}</a>
          </li>
          <li>
            <a href="#">{{ $t('app.footer.terms_and_policies') }}</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">{{ $t('app.footer.referal') }}</a>
          </li>
          <li>
            <a href="#">{{ $t('app.footer.contact') }}</a>
          </li>
          <li>
            <a href="#">{{ $t('app.footer.terms_and_conditions') }}</a>
          </li>
        </ul>

        <div class="ml-auto">
          <h4 class="text-orange mb-0 text-2xl font-bold">
            {{ $t('app.footer.lets_talk') }}
          </h4>
          <a class="text-base !text-basic-white" href="#">hello@joburivue.ro</a>
          <div class="icons mt-2">
            <a href="#">
              <!-- <b-icon icon="facebook" size="is-medium" /> -->
            </a>
            <a href="#">
              <!-- <b-icon icon="linkedin" size="is-medium" /> -->
            </a>
            <a href="#">
              <!-- <b-icon icon="twitter" size="is-medium" /> -->
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './design/variables';

.footer {
  ul li a {
    color: $white;
    font-weight: 300;
    display: block;
    margin: 10px 0;
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
