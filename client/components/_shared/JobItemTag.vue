<template>
  <div
    class="px-2 py-1 rounded"
    :class="{
      'salary-range-tag': tagType === 'salary-range',
      'location-tag': tagType === 'location',
    }"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
  tagType: { type: String, required: true },
});
</script>

<style lang="scss" scoped>
.salary-range-tag {
  background-color: #3b668c; // TODO: replace with variable
  color: #fbfbfb; // TODO: replace with variable
}

.location-tag {
  background-color: #5c6273; // TODO: replace with variable
  color: #fbfbfb; // TODO: replace with variable
}
</style>
