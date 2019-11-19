<template>
  <div class="container">
    <template v-if="messages">
      <ol>
        <li v-for="data in messages" :key="data.message.message_id">
          <div class="message">
            <Message :data="data" :depth="depth"
              :hashtagMapping="hashtagMapping" />
          </div>
          <!-- <div class="thread" v-if="depth > 0" /> -->
          <message-list
            v-if="data.replies && data.replies.length"
            :messages="data.replies" :depth="depth + 1"
            :hashtagMapping="hashtagMapping" />
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
    hashtagMapping: Object,
    depth: {
      type: Number,
      default: 0
    },
  }
}
</script>

<style scoped>
.container {
  pointer-events: all;
}

ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.container > ol > li > .message {
  margin: 1em;
}

.thread {
  height: 1em;
  width: 100%;
}
</style>
