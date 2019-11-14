<template>
  <div class="container">
    <div id="map" ref="map">
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVydHNwYWFuIiwiYSI6ImR3dERiQk0ifQ.DLbScmbRohc3Sqv7prfhqw'

export default {
  name: 'locations',
  components: {
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object,
    messagesById: Object
  },
  watch: {
    locations: function () {
      this.addData()
    }
  },
  methods: {
    addData: function () {
      if (!this.map) {
        return
      }

      this.map.getSource('locations')
        .setData(this.locations)
    }
  },
  mounted: function () {
    const map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/bertspaan/cjxdmn9tr08xh1cl7ttmaeaqn',
      center: [4.8359, 52.4200],
      zoom: 13
    })

    map.on('load', () => {
      map.addSource('locations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })

      map.addLayer({
        id: 'locations-lines',
        type: 'line',
        source: 'locations',
        paint: {
          'line-color': '#3278ff',
          'line-opacity': 0.8,
          'line-width': 2
        },
        filter: ['==', '$type', 'LineString']
      })

      map.addLayer({
        id: 'locations-points',
        type: 'circle',
        source: 'locations',
        paint: {
          'circle-radius': 6,
          'circle-color': '#3278ff'
        },
        filter: ['==', '$type', 'Point']
      })

      this.map = map
      this.addData()
    })
  }
}
</script>

<style scoped>
.container, #map {
  width: 100%;
  height: 100%;
}
</style>
