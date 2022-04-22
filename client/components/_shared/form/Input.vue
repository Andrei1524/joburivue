<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :rules="rules"
    class="d-block mb-5"
    :class="vObserverClass"
  >
    <b-field
      :label="label"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
    >
      <b-input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :expanded="expanded"
        @input="$emit('input', $event)"
      ></b-input>
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import { ValidationProvider } from "vee-validate";

export default Vue.extend({
  name: "AppFormInput",

  components: { ValidationProvider },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },

    label: {
      type: String,
      default: "",
    },

    rules: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    expanded: {
      type: Boolean,
      default: false,
    },

    vObserverClass: {
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
