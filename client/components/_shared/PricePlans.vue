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
            "Job activ timp de 35 zile.",
            "Inclus in campaniile de promovare (facebook, twitter, instagram)",
            "Listat in weekly newsletter.",
          ],
        },
        {
          api_id: "",
          title: "BOOSTED",
          price: 160,
          features: [
            "Job activ timp de 60 zile.",
            "Inclus in campaniile de promovare (facebook, twitter, instagram)",
            "Promovare in weekly newsletter.",
            "Job “fixat” in primele cautari bazat pe cautari relevante",
          ],
        },
        {
          api_id: "",
          title: "PRO",
          price: 250,
          features: [
            "Job activ timp de 60 zile.",
            "Inclus in campaniile de promovare (facebook, twitter, instagram)",
            "Promovare in weekly newsletter.",
            "Job “fixat” in primele cautari bazat pe cautari relevante",
            "Afisat in “Companii recomandate” pe prima pagina",
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
