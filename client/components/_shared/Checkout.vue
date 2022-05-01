<template>
  <div class="checkout">
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppCheckout",

  data() {
    return {
      publishableKey: process.env.STRIPE_PK,
      lineItems: [
        {
          price: "some-price-id", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      // TODO: update redirect links to /jobs
      successURL: "http://localhost:3000",
      cancelURL: "http://localhost:3000",
      loading: false,
    };
  },

  mounted() {
    const { query } = this.$route;

    this.$nuxt.$on("choosePlan", (plan) => {
      // console.log(plan);
      this.cancelURL = `http://localhost:3000/jobs/create?id=${query.id}&option=checkout`;
      this.lineItems[0].price = plan.api_id;
      this.$refs.checkoutRef.redirectToCheckout();
    });
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
