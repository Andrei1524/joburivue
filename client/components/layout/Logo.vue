<template>
  <div class="logo">
    <h2 class="title is-4">
      Joburi<span>V</span>ue
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppLogo'
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.logo {
  .title {
    color: $yankees-blue;

    span {
      color: $queen-blue;
    }
  }
}
</style>
