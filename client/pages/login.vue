<template>
  <div class="login-page container mx-auto">
    <h1 class="text-5xl mt-5 text-center font-bold">
      {{ $t('app.auth.sign_in_account_message') }}
    </h1>
    <div>
      <div class="hero min-h-[60vh]">
        <div class="hero-content flex-col w-full">
          <div
            class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:w-[400px]"
          >
            <div class="card-body">
              <Form v-slot="{ errors }" @submit="onSubmit">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Email</span>
                    <span class="text-orange text-sm">{{ errors.email }}</span>
                  </label>

                  <Field
                    class="input input-bordered"
                    name="email"
                    rules="required|email"
                    placeholder="johndoe@gmail.com"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold">Password</span>
                    <span class="text-orange text-sm">{{
                      errors.password
                    }}</span>
                  </label>

                  <Field
                    class="input input-bordered"
                    name="password"
                    rules="required|min:6"
                    placeholder="password123"
                  />
                  <label class="label">
                    <a href="#" class="label-text-alt link link-hover"
                      >Forgot password?</a
                    >
                  </label>
                </div>
                <div class="form-control mt-2">
                  <AppButton
                    :btn-bg="'bg-orange'"
                    :text="$t('app.auth.login')"
                  />
                </div>

                <div class="divider"></div>

                <div>
                  <h5 class="text-lg font-bold">
                    {{ $t('app.auth.no_account') }}
                  </h5>

                  <div class="form-control mt-2">
                    <AppButton
                      :btn-bg="'bg-chambray-blue'"
                      :text="$t('app.auth.create_an_account')"
                    />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();

import { Field, Form } from 'vee-validate';

// Submit handler
async function onSubmit(values) {
  // Submit to API
  const res = await $api.AuthService.registerUser({ ...values });

  console.log(res);
}
</script>

<style scoped></style>
