<template>
  <div class="message">
    <div class="meta">
      <span class="name">{{ data.message.from.first_name }}</span>
      <span class="date">{{ formattedDate }}</span>
      <span class="hashtags">
        <template v-for="(hashtag, index) in data.hashtags">
          <router-link :to="{name: $route.name, query: {
            hashtags: hashtag.slice(1)
          }}" :key="index">{{ hashtag }}</router-link><template v-if="index < data.hashtags.length - 1">,
          </template>
        </template>
      </span>
    </div>
    <div class="contents">
      <div>
        <img class="thumb" :src="thumbnail" />
      </div>
      <MessageText :data="data" />
      <div v-if="data.message.document">
        <code>{{ data.message.document.file_name }}</code>
      </div>

        <!-- <router-link :to="{name: $route.name, query: {
            messageId: data.message.message_id
        }}">
        Details…
        </router-link> -->

    </div>
  </div>
</template>

<script>
import { formatRelative } from 'date-fns'

import MessageText from './MessageText.vue'

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
.message {
  background-color: white;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
}

.meta {
  display: flex;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.meta > * {
  width: 100%;
}

.meta a, .meta a:visited {
  color: black;
}

.meta > *:not(:last-child) {
  border-right-style: solid;
  border-right-width: 1px;
}

.contents, .meta > * {
  padding: 1em;
}

.name {
  font-weight: bold;
}

.text {
  word-break: break-word;
}

.thumb {
  width: 100%;
}
</style>
