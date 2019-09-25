<template>
  <div>
    <div id="map">
    </div>
  </div>
</template>

<script>
export default {
  name: 'locations',
  components: {
  },
  props: {
    messages: Array,
    locations: Object
  },
  created: function () {

  }
}
</script>

<style scoped>
#map {
  width: 100%;
}
</style>
