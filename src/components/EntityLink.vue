<template>
  <router-link v-if="entity.type === 'hashtag'"
   :to="{name: $route.name, query: {
    hashtags: formatHashtag(text.slice(1))
  }}">{{ formatHashtag(text) }}</router-link>
  <a v-else-if="entity.type==='url'"
    class="url"
    :href="text">{{ text }}</a>
  <a v-else-if="entity.type==='text_link'"
    class="url"
    :href="entity.url">{{ text }}</a>
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
      const mappedHashtag = this.hashtagMapping[hashtag]
      if (mappedHashtag !== undefined) {
        return mappedHashtag
      }

      return hashtag
    }
  }
}
</script>

<style scoped>

</style>
