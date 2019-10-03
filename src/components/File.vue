<template>
  <div class="container">
  <ul>
    <li v-for="(url, index) in urls" :key="index">
      <a :href="url">{{url}}</a>
    </li>
  </ul>
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
    hasFiles: function () {
      return this.data.files && this.data.files.length
    },
    type: function () {
      if (this.hasFiles && this.data.files.length === 1) {
        const file = this.data.files[0]
        if (file.mime_type === 'application/pdf') {
          return 'pdf'
        }
      }
    },
    url: function () {
      if (this.urls) {
        return this.urls[0]
      }
    },
    urls: function () {
      if (this.hasFiles) {
        return this.data.files.map((file) => {
          const path = file.path
          return `https://shock-forest-group.s3.eu-central-1.amazonaws.com/${path}`
        })
      }
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
