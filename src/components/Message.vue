<template>
  <div class="message shadow" :style="{
    marginLeft: `${depth * 5}px`
  }">
    <div class="meta">
      <span class="name">{{ data.message.from.first_name }}</span>
      <span class="date">{{ formattedDate }}</span>
    </div>
    <div v-if="depth === 0 && data.hashtags.length" class="hashtags">
      <template v-for="(hashtag, index) in data.hashtags">
        <router-link :to="{name: $route.name, query: {
          hashtags: hashtag.slice(1)
        }}" :key="index">{{ hashtag }}</router-link><template v-if="index < data.hashtags.length - 1">,
        </template>
      </template>
    </div>
    <div class="contents">
      <div v-if="thumbnail">
        <img class="thumb" :src="thumbnail" />
      </div>
      <MessageText :data="data" :hashtagMapping="hashtagMapping" />
      <div v-if="data.message.files && data.message.files.length">
        <FileLink :files="data.files" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatRelative } from 'date-fns'

import MessageText from './MessageText.vue'
import FileLink from './FileLink.vue'

const FILES_URL = process.env.VUE_APP_FILES_URL

export default {
  name: 'message',
  components: {
    MessageText
  },
  props: {
    data: Object,
    depth: {
      type: Number,
      default: 0
    },
    hashtagMapping: Object
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
}

.meta {
  display: flex;
  justify-content: space-between;
}

.meta, .hashtags {
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.hashtags {
  text-align: center;
  font-weight: bold;
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

.contents, .meta > *, .hashtags {
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
