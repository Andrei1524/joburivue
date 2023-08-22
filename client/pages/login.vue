<template>
  <div class="login-page">
    <h1 class="title is-1 has-text-centered">
      {{ $t('app.auth.sign_in_account_message') }}
    </h1>
    <div class="container is-max-desktop login">
      <div class="box mt-4">
        <div class="login">
          email input password input button

          <div class="reset-pass">
            <p class="mt-4">
              {{ $t('app.auth.forgot_password') }}
              <a href="#">{{ $t('app.auth.reset_password_here') }}</a>
            </p>
          </div>

          <hr />

          <div class="register-acc">
            <h5 class="title is-5 mt-2 mb-3">
              {{ $t('app.auth.no_account') }}
            </h5>
            create acc butn
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const data = await $api.AuthService.registerUser();
</script>

<style scoped></style>
