<template>
  <div class="pagination">
    <b-pagination
      v-model="current"
      :total="total"
      :size="'is-small'"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppPagination',

  components: {
  },
  props: {
  },

  data () {
    return {
      current: 0,
      total: 0
    }
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

::v-deep .pagination-link.is-current {
  background-color: $chambray-blue;
}
</style>
