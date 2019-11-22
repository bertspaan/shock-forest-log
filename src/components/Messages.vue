<template>
  <div class="container">
    <template v-if="messages">
      <ol>
        <li v-for="data in messages" :key="data.message.message_id">
          <div class="message">
            <Message :data="data" :depth="depth"
              :hashtagMapping="hashtagMapping" />
          </div>
          <template v-if="data.replies && data.replies.length">
            <div class="thread" />
            <message-list
              :messages="data.replies" :depth="depth + 1"
              :hashtagMapping="hashtagMapping" />
          </template>
          <template v-else-if="depth > 0">
            <div class="thread" />
          </template>
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

.messages-container > .container > ol > li {
  margin: 10px;
}

@media (max-width: 768px) {
  .messages-container > .container > ol > li {
    margin: 5px;
  }
}

.thread {
  height: 1em;
  width: calc(100% - 1em);
  box-sizing: border-box;
  border-right-width: 2px;
  border-right-style: solid;
}
</style>
