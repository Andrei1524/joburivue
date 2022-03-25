<template>
  <div id="map-wrap" style="height: 600px">
    <client-only>
      <l-map ref="myMap" :zoom="13" :center="[55.9464418,8.1277591]">
        <l-tile-layer url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=jptvrcCyLPSDDAHfJvLx" />
      </l-map>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'JobsMap',

  data () {
    return {}
  },

  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'
        }
      ]
    }
  },

  mounted () {
    this.$nextTick(() => {
      // disable map scrolling
      this.$refs.myMap.mapObject.scrollWheelZoom.disable()

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.$refs.myMap.mapObject.setView([position.coords.latitude, position.coords.longitude], 8)
        })
      } else {
        // Geolocation is not supported by this browser.
      }
    })
  }
})
</script>

<style lang="scss" scoped>
@import './design/variables';

</style>
