<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :class="vObserverClass"
    rules="required"
    name="job_type"
  >
    <b-field
      :label="label"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
    >
      <b-select
        :value="value"
        :placeholder="placeholder"
        expanded
        @input="$emit('input', $event)"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </b-select>
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import { ValidationProvider } from "vee-validate";

export default Vue.extend({
  name: "AppFormSelect",

  components: { ValidationProvider },
  props: {
    value: {
      type: String,
      default: "",
    },

    options: {
      type: Array,
      default: () => [],
    },

    vObserverClass: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      default: "",
    },
  },

  data() {
    return {};
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
