<template>
  <MessageList :messages="filteredMessages" />
</template>

<script>
import MessageList from '../components/MessageList.vue'

export default {
  name: 'files',
  components: {
    MessageList
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object
  },
  computed: {
    filteredMessages: function () {
      return this.messages
        .filter((message) => message.files && message.files.length)
    }
  }
}
</script>

<style scoped>

</style>
