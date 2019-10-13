<template>
  <div>
    <div class="meta">
      <span class="name">{{ data.message.from.first_name }}</span>
      <span class="date">{{ formattedDate }}</span>
    </div>
    <div>
      <img :src="thumbnail" />
    </div>
    <div class="text" v-html="html"></div>
    <div v-if="data.message.document">
      <code>{{ data.message.document.file_name }}</code>
    </div>
  </div>
</template>

<script>
import { formatRelative } from 'date-fns'

const FILES_URL = process.env.VUE_APP_FILES_URL

export default {
  name: 'message',
  props: {
    data: Object
  },
  methods: {
    insertLink: function (entity, href) {
      const before = this.text.slice(0, entity.offset)
      const contents = this.text.slice(entity.offset, entity.offset + entity.length)
      const after = this.text.slice(entity.offset + entity.length)

      return `${before}<a href="${href}">${contents}</a>${after}`
    }
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
    html: function () {
      if (!this.entities) {
        return this.text
      }


//       Vue.component('anchored-heading', {
//   render: function (createElement) {
//     // create kebab-case id
//     var headingId = getChildrenTextContent(this.$slots.default)
//       .toLowerCase()
//       .replace(/\W+/g, '-')
//       .replace(/(^-|-$)/g, '')

//     return createElement(
//       'h' + this.level,
//       [
//         createElement('a', {
//           attrs: {
//             name: headingId,
//             href: '#' + headingId
//           }
//         }, this.$slots.default)
//       ]
//     )
//   },
//   props: {
//     level: {
//       type: Number,
//       required: true
//     }
//   }
// })

      const html = this.entities.reduce((html, entity) => {
        if (entity.type === 'hashtag') {
          const hashtag = this.text.slice(entity.offset, entity.offset + entity.length).slice(1)
          return this.insertLink(entity, `#/?hashtags=${hashtag}`)
        } else if (entity.type === 'url') {
          const url = this.text.slice(entity.offset, entity.offset + entity.length)
          return this.insertLink(entity, url)
        } else if (entity.type === 'text_link') {
          return this.insertLink(entity, entity.url)
        } else {
          // console.log({...entity})
        }

        return html
      }, this.text)

      return html
    },
    entities: function () {
      return this.data.message.entities || this.data.message.caption_entities
    },
    text: function () {
      return this.data.message.text || this.data.message.caption
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
</style>
