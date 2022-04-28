<template>
  <div class="pricing-page">
    <section class="hero is-success position-relative">
      <div class="hero-wrapper" />
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">Lista servicii si beneficii</p>
          <p class="subtitle mt-2">Alege un plan care ti se potriveste</p>
        </div>
      </div>
    </section>

    <div
      class="price-plans container is-flex-wrap-wrap mt-6 is-flex is-justify-content-center"
    >
      <PricePlan
        v-for="plan in plans"
        :key="plan.title"
        :plan="plan"
        class="mx-2 mb-2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PricePlan from "~/components/_shared/PricePlan.vue";

export default Vue.extend({
  name: "AppPricing",
  components: {
    PricePlan,
  },

  data() {
    return {
      plans: [
        {
          title: "NORMAL",
          price: 75,
          features: [
            "Job activ timp de 35 zile.",
            "Inclus in campaniile de promovare (facebook, twitter, instagram)",
            "Listat in weekly newsletter.",
          ],
        },
        {
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

.hero-wrapper {
  background: #212940d9;
  height: 100%;
  width: 100%;
  position: absolute;
}

.hero-body {
  background: url("~assets/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
