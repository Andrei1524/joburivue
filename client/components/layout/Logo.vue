<template>
  <div :class="invertColors ? 'logo-inversed' : 'logo-normal'">
    <h2 class="title is-4">
      Joburi<span>V</span>ue
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppLogo',
  props: {
    invertColors: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.logo-normal {
  .title {
    color: $yankees-blue;

    span {
      color: $queen-blue;
    }
  }
}

.logo-inversed {
  .title {
    color: $basic-white;

    span {
      color: $queen-blue;
    }
  }
}
</style>
