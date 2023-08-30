<template>
  <div class="login-page container mx-auto">
    <h1 class="text-3xl text-center">
      {{ $t('app.auth.sign_in_account_message') }}
    </h1>
    <div>
      <Form v-slot="{ errors }" @submit="onSubmit">
        <Field name="email" :rules="required" />

        <span>{{ errors.email }}</span>

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
          <AppButton
            :btn-bg="'bg-orange'"
            :text="$t('app.auth.create_an_account')"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
// const { $api } = useNuxtApp();
// const data = await $api.AuthService.registerUser();

import { Field, Form } from 'vee-validate';

// Validation, or use `yup` or `zod`
function required(value) {
  return value ? true : 'This field is required';
}

// Submit handler
function onSubmit(values) {
  // Submit to API
  console.log(values);
}
</script>

<style scoped></style>
