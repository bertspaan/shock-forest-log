<template>
  <div class="file-container">
    <template v-if="type === 'pdf'">
      <PDF :url="url" />
    </template>
    <template v-else-if="type === 'video'">
      <video controls>
        <source :src="url">
      </video>
    </template>
    <template v-else-if="type === 'audio'">
      <audio controls>
        <source :src="url">
      </audio>
    </template>
    <template v-else-if="type === 'image'">
      <img :src="url" />
    </template>
    <template v-else>
      <ul>
        <li v-for="(url, index) in urls" :key="index">
          <a class="url" :href="url">{{url}}</a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import PDF from './PDF.vue'

const FILES_URL = process.env.VUE_APP_FILES_URL

export default {
  name: 'file',
  components: {
    PDF
  },
  props: {
    data: Object
  },
  computed: {
    sortedFiles: function () {
      return [...this.data.files].sort((a, b) => {
        return b.file_size - a.file_size
      })
    },
    hasFiles: function () {
      return this.data.files && this.data.files.length
    },
    firstFile: function () {
      return this.hasFiles && this.sortedFiles[0]
    },
    type: function () {
      if (this.firstFile) {
        const file = this.firstFile
        if (file.mime_type === 'application/pdf') {
          return 'pdf'
        } else if (file.mime_type.startsWith('audio')) {
          return 'audio'
        } else if (file.mime_type.startsWith('image')) {
          return 'image'
        } else if (file.mime_type.startsWith('video')) {
          return 'video'
        }
      }

      return undefined
    },
    url: function () {
      if (this.urls) {
        return this.urls[0]
      }
      return undefined
    },
    urls: function () {
      if (this.hasFiles) {
        return this.sortedFiles.map((file) => {
          const path = file.path
          return `${FILES_URL}/${path}`
        })
      }
      return undefined
    }
  }
}
</script>

<style scoped>
.file-container {
  width: 100%;
  height: 100%;
}

.file-container > * {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.file-container img {
  object-fit: contain;
}
</style>
