<template>
  <div
    v-if="plan"
    :class="[
      'plan is-flex is-flex-direction-column',
      plan.title === 'PRO' ? 'pro-plan' : '',
    ]"
  >
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

    <div class="bottom has-text-centered mt-auto py-2">
      <b-button
        type="is-primary"
        size="is-medium"
        class="orange-btn mb-2"
        icon-right="notebook"
        @click="choosePlan"
      >
        Alege plan
      </b-button>
    </div>

    <Checkout :plan="plan" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Checkout from "~/components/_shared/Checkout.vue";

export default Vue.extend({
  name: "PricePlan",
  components: { Checkout },

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

  methods: {
    choosePlan() {
      const plan = this.plan;
      this.$nuxt.$emit("choosePlan", plan);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.plan {
  background: $basic-white;
  max-width: 340px;
  min-width: 250px;
  border-radius: 10px;
  box-shadow: 4px 7px 8px 0px #00000021;

  color: $yankees-blue;

  .feature {
    width: 80%;
    font-family: cursive;
  }

  .check-icon {
    color: $green;
  }
}

.pro-plan {
  background: $queen-blue;
  color: $basic-white;
}

.orange-btn {
  box-shadow: 4px 7px 8px 0px #00000021;
}
</style>
