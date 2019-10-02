<template>
  <div class="container">
  <template v-if="type==='pdf'">
    <PDF :url="url" />
  </template>
  </div>
</template>

<script>
import PDF from './PDF.vue'

export default {
  name: 'file',
  components: {
    PDF
  },
  props: {
    data: Object
  },
  computed: {
    type: function () {
      if (this.data.files.length === 1) {
        const file = this.data.files[0]
        if (file.mime_type === 'application/pdf') {
          return 'pdf'
        }
      } else {

      }
    },
    url: function () {
      const path = this.data.files[0].path
      return `https://shock-forest-group.s3.eu-central-1.amazonaws.com/${path}`
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
}
</style>
