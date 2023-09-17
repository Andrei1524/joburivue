<template>
  <div class="login-page">
    <h1 class="text-4xl text-center mt-8">
      {{ $t('app.account.account_settings') }}
    </h1>
    <div class="container mx-auto py-6">
      <div class="box mt-4">
        <div class="account">Account page</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>
