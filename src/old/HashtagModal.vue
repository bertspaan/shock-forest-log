<template>
  <Modal>
    {{selectedHashtags.join(', ')}}
    <MessageList :messages="selectedMessages" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import MessageList from './MessageList.vue'

export default {
  name: 'hashtag-modal',
  components: {
    Modal,
    MessageList
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object,
    messagesById: Object,
    selectedHashtags: Array
  },
  computed: {
    selectedMessages: function () {
      const selectedMessages = new Set(this.hashtags
        .filter((hashtag) => this.selectedHashtags.includes(hashtag.hashtag))
        .map((hashtag) => hashtag.messages.map((message) => ([message.message_id, message.reply_to])))
        .flat(2).filter((messageId) => messageId))

      return [...selectedMessages].map((messageId) => this.messagesById[messageId])
    }
  }
}
</script>

<style scoped>

</style>
