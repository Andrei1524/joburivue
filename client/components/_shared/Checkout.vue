<template>
  <div class="checkout">
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :client-reference-id="`${$route.query.id}/${selectedPlan}`"
      :pk="'pk_test_51Ktg3YKpfWtEKcAOnRPZGA3eT9w8ehxrqqUTIn2AycSyrTDh1aUqjZIp4QhzxTHWZJfda2sEOBOAtRre32opAzAa00M4JzJdVB'"
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
      selectedPlan: null,
      lineItems: [
        {
          price: "some-price-id", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      // TODO: update redirect links to /jobs
      successURL: location.origin,
      cancelURL: location.origin,
      loading: false,
    };
  },

  mounted() {
    const { query } = this.$route;

    this.$nuxt.$on("choosePlan", (plan) => {
      // console.log(plan);
      this.cancelURL = `${location.origin}/add-job?id=${query.id}&option=checkout`;
      this.lineItems[0].price = plan.api_id;
      this.selectedPlan = plan.title;
      this.$refs.checkoutRef.redirectToCheckout();
    });
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
</style>
