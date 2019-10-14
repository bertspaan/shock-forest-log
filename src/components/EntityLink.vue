<template>
  <router-link v-if="entity.type==='hashtag'"
   :to="{name: $route.name, query: {
    hashtags: text.slice(1)
  }}">{{ text }}</router-link>
  <a v-else-if="entity.type==='url'" :href="text">{{ text }}</a>
  <a v-else-if="entity.type==='url'" :href="entity.url">{{ text }}</a>
  <span v-else>{{ text }}</span>
</template>

<script>

export default {
  name: 'entity-link',
  props: {
    text: String,
    entity: Object
  },
  methods: {}
      // linkFromEntity: function () {
      // if (entity.type === 'hashtag') {
      //     const hashtag = this.text.slice(entity.offset, entity.offset + entity.length).slice(1)
      //     return this.insertLink(entity, `#/?hashtags=${hashtag}`)
      //   } else if (entity.type === 'url') {
      //     const url = this.text.slice(entity.offset, entity.offset + entity.length)
      //     return this.insertLink(entity, url)
      //   } else if (entity.type === 'text_link') {
      //     return this.insertLink(entity, entity.url)
      //   } else {
      //     // console.log({...entity})
      //   }

      //   return html
    // }
}
</script>

<style scoped>

</style>
