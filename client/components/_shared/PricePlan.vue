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
        :loading="planLoading"
        @click="choosePlan"
      >
        {{ $t("app.pricing.choose_plan") }}
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
    return {
      planLoading: false,
    };
  },

  mounted() {},

  methods: {
    choosePlan() {
      const plan = this.plan;
      const { query } = this.$route;
      if (query && query.option === "checkout") {
        this.planLoading = true;

        this.$nuxt.$emit("choosePlan", plan);
      } else {
        this.$router.push("/add-job");
      }
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
    font-weight: 500;
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
