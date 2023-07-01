<template>
  <div class="search">
    <b-field :label="$t('app.general.labels.search_jobs')">
      <div class="input-group is-flex">
        <b-input
          :placeholder="$t('app.general.labels.search_label')"
          size="is-medium"
          type="search"
          :value="value"
          @input="$emit('input', $event)"
        />
        <b-button
          type="is-primary"
          icon-right="magnify"
          size="is-medium"
          class="orange-btn mb-2"
        >
          {{ $t("app.general.labels.search") }}
        </b-button>
      </div>
    </b-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppSearch",

  components: {},
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.search {
  :deep .input {
    background-color: $basic-white;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  :deep .field,
  .control {
    width: 100%;
  }

  .button {
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
  }
}
</style>
