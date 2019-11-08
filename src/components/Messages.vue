<template>
  <div class="container">
    <template v-if="messages">
      <ol>
        <li v-for="data in messages" :key="data.message.message_id">
          <div class="message">
            <Message :data="data" />
          </div>
          <div class="thread" v-if="depth > 0" />
          <message-list
            v-if="data.replies && data.replies.length"
            :messages="data.replies" :depth="depth + 1" />
        </li>
      </ol>
    </template>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'message-list',
  components: {
    Message
  },
  props: {
    messages: Array,
    depth: {
      type: Number,
      default: 0
    },
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1000px;
}

ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  padding-bottom: 1em;
}

.message {
  padding: 1em;
}

.thread {
  /* height: 1em;
  width: 100%;
  background-color: red; */
}
</style>
