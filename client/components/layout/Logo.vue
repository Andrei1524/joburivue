<template>
  <div>
    <h1
      :class="[
        invertColors ? 'text-basic-white' : 'text-yankees-blue',
        'text-3xl',
      ]"
    >
      Joburi<span :class="invertColors ? 'text-basic-white' : 'text-queen-blue'"
        >V</span
      >ue
    </h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  invertColors: { type: Boolean, default: false },
  fontSize: { type: String, default: '4' },
});
</script>

<style lang="scss" scoped></style>
