<template>
  <ul class="process-steps is-flex is-justify-content-space-between">
    <li
      v-for="step in steps"
      :key="step.title"
      class="is-flex is-flex-direction-column is-align-items-center"
    >
      <b-icon :icon="step.icon" size="is-medium" />
      <span>{{ step.title }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppProgress",
  middleware: "auth",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },

  watch: {
    currentStep() {
      this.initProgress();
    },
  },

  mounted() {
    this.initProgress();
  },

  methods: {
    initProgress() {
      const maxWidth = 600;
      const liList = document.querySelectorAll(".process-steps li");
      const limit = liList.length - 1;
      let liItem: any = null;
      let lineSpan: any = null;
      const stepsToFill = Array.from(Array(this.steps.length).keys());
      const step = this.currentStep - 1;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      liList.forEach((li, i) => {
        liItem = liList.item(i);
        if (i < limit) {
          const liWidth = liItem.getBoundingClientRect().width;
          lineSpan = document.createElement("span");
          lineSpan.classList.add("line");
          lineSpan.style.width = maxWidth / 2 - liWidth - liWidth / 2 + "px";
          lineSpan.style.left = liWidth + "px";

          liItem.appendChild(lineSpan);
        }
        if (i <= step) {
          if (stepsToFill.includes(i)) {
            liItem.style.color = "#D9665B";
            lineSpan.style.background =
              "linear-gradient(90deg, #D9665B, #D9665B)";
            lineSpan.style.opacity = "0.9";
          }
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./design/variables";

.process-steps {
  max-width: 600px;
  margin: 0 auto;

  li {
    position: relative;
    width: 72px;
  }
}

::v-deep .line {
  height: 6px;
  background: linear-gradient(90deg, #5c627354, #5c6273);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.4;
  border-radius: 52px;
}
</style>
