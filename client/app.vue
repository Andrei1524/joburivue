<template>
  <div>
    <ClientOnly><Alert /></ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

if (!authStore.isAuthenticated()) {
  authStore.setUser(useCookie('user'));
  authStore.setAccessToken(useCookie('accessToken'));
  authStore.setRefreshToken(useCookie('refreshToken'));
}

// VEE VALIDATE SETUP
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
</script>
