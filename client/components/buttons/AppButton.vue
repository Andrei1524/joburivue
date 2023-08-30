<template>
  <button
    class="btn btn-primary text-white border-bg-chambray-blue border-0 hover:bg-yankees-blue"
    :class="btnBg"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, default: '', required: true },
  btnBg: { type: String, default: 'bg-chambray-blue' },
});
</script>

<style scoped></style>
