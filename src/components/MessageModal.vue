<template>
  <Modal>
    <Message :data="message" />
    <File :data="message" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import Message from './Message.vue'
import File from './File.vue'

export default {
  name: 'message-modal',
  components: {
    Modal,
    Message,
    File
  },
  props: {
    message: Object
    // messages: Array,
    // hashtags: Array,
    // locations: Object,
    // messagesById: Object
  },
  computed: {
    // message: function () {
    //   return this.messagesById[this.$route.params.id]
    // }
  }
}
</script>

<style scoped>

</style>
