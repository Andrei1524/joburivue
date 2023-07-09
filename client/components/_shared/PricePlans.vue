<template>
  <div class="price-plans container mt-6 is-flex is-justify-content-center">
    <PricePlan
      v-for="plan in plans"
      :key="plan.title"
      :plan="plan"
      class="mx-2 mb-5"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PricePlan from "~/components/_shared/PricePlan.vue";

export default Vue.extend({
  name: "PricePlans",
  components: {
    PricePlan,
  },

  data() {
    return {
      plans: [
        {
          api_id: "price_1KtztRKpfWtEKcAOHCV2QfKb",
          title: "NORMAL",
          price: 75,
          features: [
            this.$t("app.pricing.plans.job_active_35_days"),
            this.$t("app.pricing.plans.included_in_promovation_campaigns"),
            this.$t("app.pricing.plans.listed_in_weekly_newsletter"),
          ],
        },
        {
          api_id: "price_1Ku0CuKpfWtEKcAOO35LAOnk",
          title: "BOOSTED",
          price: 160,
          features: [
            this.$t("app.pricing.plans.job_active_60_days"),
            this.$t("app.pricing.plans.included_in_promovation_campaigns"),
            this.$t("app.pricing.plans.listed_in_weekly_newsletter"),
            this.$t(
              "app.pricing.plans.job_fixed_in_search_based_by_relevant_searches"
            ),
          ],
        },
        {
          api_id: "price_1Ku0DEKpfWtEKcAOyzCZdyh5",
          title: "PRO",
          price: 250,
          features: [
            this.$t("app.pricing.plans.job_active_60_days"),
            this.$t("app.pricing.plans.included_in_promovation_campaigns"),
            this.$t("app.pricing.plans.listed_in_weekly_newsletter"),
            this.$t(
              "app.pricing.plans.job_fixed_in_search_based_by_relevant_searches"
            ),
            this.$t("app.pricing.plans.job_in_recommended_comapnies"),
          ],
        },
      ],
    };
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
@import "./design/variables";
@import "include-media";

@include media("<tablet") {
  .price-plans {
    flex-wrap: wrap;
  }
}
</style>
