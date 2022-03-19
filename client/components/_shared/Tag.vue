<template>
  <div :class="{'tag': true, 'salary-range-tag': tagType === 'salary-range'}">
    tag
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TagType } from '~/types/TagType'

export default Vue.extend({
  name: 'AppTag',
  props: {
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
</style>
