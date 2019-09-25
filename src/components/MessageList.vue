<template>
  <div class="container">
    <template v-if="messages">
      <ol>
        <li v-for="data in messages" :key="data.message.message_id">
          <Message :data="data" />
        </li>
      </ol>
    </template>
  </div>
</template>

<script>
import Message from '../components/Message.vue'

export default {
  name: 'message-list',
  components: {
    Message
  },
  props: {
    messages: Array
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1000px;
}

ol {
  padding: 1em;
  list-style-type: none;
  margin: 0 0;
}

li {
  padding-bottom: 1em;
}
</style>
