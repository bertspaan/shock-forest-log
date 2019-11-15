<template>
  <router-link v-if="entity.type === 'hashtag'"
   :to="{name: $route.name, query: {
    hashtags: formatHashtag(text.slice(1))
  }}">{{ formatHashtag(text) }}</router-link>
  <a v-else-if="entity.type==='url'" :href="text">{{ text }}</a>
  <a v-else-if="entity.type==='url'" :href="entity.url">{{ text }}</a>
  <span v-else>{{ text }}</span>
</template>

<script>

export default {
  name: 'entity-link',
  props: {
    text: String,
    entity: Object,
    hashtagMapping: Object
  },
  methods: {
    formatHashtag: function (hashtag) {
      hashtag = this.hashtagMapping[hashtag] || hashtag
      return hashtag.toLowerCase().replace('_', '')
    }
  }
}
</script>

<style scoped>
 a {
   word-break: break-all;
 }
</style>
