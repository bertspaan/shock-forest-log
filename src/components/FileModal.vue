<template>
  <Modal>
    <PDF :url="url" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import PDF from './PDF.vue'

export default {
  name: 'hashtag-modal',
  components: {
    Modal,
    PDF
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object,
    messagesById: Object
  },
  computed: {
    message: function () {
      return this.messagesById[this.$route.params.id]
    },
    url: function () {
      const path = this.message.files[0].path
      return `https://shock-forest-group.s3.eu-central-1.amazonaws.com/${path}`
    }
  }
}
</script>

<style scoped>

</style>
