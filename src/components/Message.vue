<template>
  <div>
    <div class="meta">
      <span class="name">{{ data.message.from.first_name }}</span>
      <span class="date">{{ formattedDate }}</span>
    </div>
    <div>
      <img class="thumb" :src="thumbnail" />
    </div>
    <MessageText :data="data" />
    <div v-if="data.message.document">
      <code>{{ data.message.document.file_name }}</code>
    </div>
  </div>
</template>

<script>
import { formatRelative } from 'date-fns'

import MessageText from '../components/MessageText.vue'

const FILES_URL = process.env.VUE_APP_FILES_URL

export default {
  name: 'message',
  components: {
    MessageText
  },
  props: {
    data: Object
  },
  computed: {
    thumbnail: function () {
      const thumb = this.data.files && this.data.files.filter((file) => file.thumb)[0]
      if (thumb) {
        return `${FILES_URL}/${thumb.path}`
      } else if (this.data.files) {
        const jpgs = this.data.files.filter((file) => file.mime_type === 'image/jpeg')
        if (jpgs.length) {
          const path = jpgs[jpgs.length - 1].path
          return `${FILES_URL}/${path}`
        }
      }
      return undefined
    },
    formattedDate: function () {
      return formatRelative(new Date(this.data.message.date * 1000), new Date())
    }
  }
}
</script>

<style scoped>
.meta {
  display: flex;
  justify-content: space-between;
}

.name {
  font-weight: bold;
}

.date {
  opacity: 0.4;
}

.text {
  word-break: break-word;
}

.thumb {
  width: 100%;
}
</style>
