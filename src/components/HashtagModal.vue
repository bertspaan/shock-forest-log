<template>
  <Modal>
    {{hashtag}}
  </Modal>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'hashtag-modal',
  components: {
    Modal
  },
  props: {
    hashtag: String
  }
}
</script>

<style scoped>

</style>
