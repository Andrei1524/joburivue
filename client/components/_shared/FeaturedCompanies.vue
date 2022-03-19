<template>
  <div class="columns is-centered">
    <div class="column is-6 featured-companies">
      <h6 class="title is-6 has-text-left">
        Companii Recomandate
      </h6>
      <JobItem />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JobItem from '~/components/_shared/JobItem.vue'

export default Vue.extend({
  name: 'AppFeaturedCompanies',
  components: {
    JobItem
  },

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.featured-companies {
  background: linear-gradient(#3B668C, #3b668c00);
  border-radius: 5px;
}
</style>
