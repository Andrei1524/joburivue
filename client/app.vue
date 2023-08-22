<template>
  <div>
    <ClientOnly><Alert :alert="generalStore.alert" /></ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const generalStore = useGeneralStore();
</script>
