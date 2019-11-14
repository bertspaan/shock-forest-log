<template>
  <div class="container">
    <template v-for="(textPart, index) in textParts">
      <span :key="`t${index}`">{{ textPart }}</span>
      <EntityLink v-if="index < textParts.length - 1" :key="`a${index}`"
        :hashtagMapping="hashtagMapping"
        :entity="linkParts[index].entity"
        :text="linkParts[index].text"
      />
    </template>
  </div>
</template>

<script>
import EntityLink from '../components/EntityLink.vue'

export default {
  name: 'message-text',
  props: {
    data: Object,
    hashtagMapping: Object
  },
  components: {
    EntityLink
  },
  computed: {
    textParts: function () {
      if (this.entities.length === 0) {
        return [this.text]
      }

      return [...Array(this.entities.length + 1)].map((_, index) => {
        if (index === 0) {
          const entity = this.entities[index]
          return this.text.slice(0, entity.offset)
        } else if (index === this.entities.length) {
          const previousEntity = this.entities[index - 1]
          return this.text.slice(previousEntity.offset + previousEntity.length)
        } else {
          const entity = this.entities[index]
          const previousEntity = this.entities[index - 1]
          // if (!previousEntity || !entity) {
          //   console.log(index, this.entities.length, this.entities)
          // }
          return this.text.slice(previousEntity.offset + previousEntity.length, entity.offset)
        }
      })
    },
    linkParts: function () {
      // console.log(this.textParts)
      return this.entities.map((entity) => ({
        entity,
        text: this.text.slice(entity.offset, entity.offset + entity.length)
      }))
    },
    entities: function () {
      return this.data.message.entities || this.data.message.caption_entities || []
    },
    text: function () {
      return this.data.message.text || this.data.message.caption
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1000px;
}

ol {
  padding: 1em;
  list-style-type: none;
  margin: 0 0;
}

li {
  padding-bottom: 1em;
}
</style>
