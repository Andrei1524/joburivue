<template>
  <section>
    <JobItem v-for="job in jobs" :key="job.id" class="mb-3" :job="job" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import JobItem from '~/components/_shared/JobItem.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    JobItem
  },
  data () {
    return {
      jobs: [{
        id: 0,
        title: 'Frontend Developer - Vue/Typescript',
        type: 'Full Time',
        currency: 'euros',
        minSalary: '1500',
        maxSalary: '2000',
        location: 'Romania',
        company: {
          name: 'Streem',
          icon: '#'
        }
      },
      {
        id: 1,
        title: 'Frontend Developer - Vue/Typescript',
        type: 'Full Time',
        currency: 'euros',
        minSalary: '1500',
        maxSalary: '2000',
        location: 'Romania',
        company: {
          name: 'Streem',
          icon: '#'
        }
      }

      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
