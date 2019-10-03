<template>
  <iframe :src="`https://bertspaan.nl/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}`" />
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  props: {
    url: String
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: 0
}
</style>
