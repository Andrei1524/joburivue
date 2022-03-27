<template>
  <div class="search">
    <b-field label="Caută job">
      <div class="input-group is-flex">
        <b-input placeholder="Locatie, tip de job..." size="is-medium" />
        <b-button
          type="is-primary"
          icon-right="magnify"
          size="is-medium"
          class="orange-btn mb-2"
        >
          Caută
        </b-button>
      </div>
    </b-field>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppSearch',

  components: {
  },
  props: {
  },

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.search {
  ::v-deep .input {
    background-color: $basic-white;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  ::v-deep .field, .control {
    width: 100%;
  }

  .button {
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
  }
}
</style>
