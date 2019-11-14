<template>
  <MessageList :messages="messages" />
</template>

<script>
import MessageList from '../components/MessageList.vue'

export default {
  name: 'messages',
  components: {
    MessageList
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object,
    messagesById: Object
  }
}
</script>

<style scoped>

</style>
