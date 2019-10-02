<template>
  <MessageList :messages="filteredMessages" />
</template>

<script>
import MessageList from '../components/MessageList.vue'

export default {
  name: 'urls',
  components: {
    MessageList
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object,
    messagesById: Object
  },
  computed: {
    filteredMessages: function () {
      return this.messages
        .filter((message) => {
          if (message.message.entities) {
            const urlEntities = message.message.entities
              .filter((entity) => entity.type === 'url' || entity.type === 'text_link')
            return urlEntities.length > 0
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
