<template>
  <!-- <iframe :src="`https://mozilla.github.com/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}`" /> -->
  <iframe src="https://mozilla.github.io/pdf.js/web/viewer.html" />
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
