<template>
  <div :class="{'tag': true, 'salary-range-tag': tagType === 'salary-range', 'location-tag': tagType === 'location'}">
    {{ value }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TagType } from '~/types/TagType'

export default Vue.extend({
  name: 'AppTag',
  props: {
    value: {
      type: String,
      required: true
    },
    tagType: {
      type: String as PropType<TagType>,
      required: true
    }
  },

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

.salary-range-tag {
  background-color: $queen-blue;
  color: $basic-white;
}

.location-tag {
  background-color: $gray;
  color: $basic-white;
}
</style>
