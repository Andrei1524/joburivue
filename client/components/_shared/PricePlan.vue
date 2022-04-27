<template>
  <div class="plan">
    <div class="header has-text-centered py-2">
      <h4 class="has-text-weight-bold is-size-4">{{ plan.title }}</h4>
      <h4 class="has-text-weight-bold is-size-4">{{ plan.price }}€</h4>
    </div>
    <hr class="my-0" />
    <div
      class="features is-flex is-align-items-center is-flex-direction-column py-4"
    >
      <div v-for="feature in plan.features" :key="feature" class="feature py-2">
        <b-icon class="check-icon mr-1" icon="checkbox-marked" />
        {{ feature }}
      </div>
    </div>

    <div class="bottom has-text-centered">
      <b-button type="is-primary" size="is-medium" class="orange-btn mb-2">
        Vezi toate joburile
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PricePlan",

  props: {
    plan: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },

  mounted() {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.plan {
  background: $basic-white;
  max-width: 380px;
  min-width: 250px;

  color: $yankees-blue;

  .feature {
    width: 80%;
    font-family: cursive;
  }

  .check-icon {
    color: $green;
  }
}
</style>
