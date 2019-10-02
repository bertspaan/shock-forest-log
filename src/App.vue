<template>
  <div id="app">
    <header>
      <ul>
        <li><router-link :to="{ name: 'messages' }">Messages</router-link></li>
        <li><router-link :to="{ name: 'files' }">Files</router-link></li>
        <li><router-link :to="{ name: 'graph' }">
          <img class="heron" src="./assets/heron.svg" />
        </router-link></li>
        <li><router-link :to="{ name: 'urls' }">URLs</router-link></li>
        <li><router-link :to="{ name: 'locations' }">Locations</router-link></li>
      </ul>
    </header>
    <main>
      <template v-if="!loading">
        <router-view
          :messages="messages"
          :messagesById="messagesById"
          :hashtags="hashtags"
          :locations="locations"></router-view>
        <template v-if="$route.query.messageId">
          <MessageModal :message="messagesById[$route.query.messageId]" />
        </template>
        <template v-else-if="$route.query.hashtag">
          <HashtagModal :hashtag="$route.query.hashtag" />
        </template>
      </template>
    </main>
  </div>
</template>

<script>
import { groupBy } from 'ramda'
import fetch from './lib/fetch'

import WebSockets from './components/mixins/WebSockets'

import MessageModal from './components/MessageModal'
import HashtagModal from './components/HashtagModal'

export default {
  name: 'app',
  mixins: [WebSockets],
  components: {
    MessageModal,
    HashtagModal
  },
  data: function () {
    return {
      loading: true,
      messages: undefined,
      hashtags: undefined,
      locations: undefined,
      messagesById: undefined
    }
  },
  methods: {
    fetchData: async function () {
      this.messages = await fetch('/messages')
      this.locations = await fetch('/locations')
      this.hashtags = await fetch('/hashtags')
      this.messagesById = Object.fromEntries(this.messages
        .map((message) => [message.message.message_id, message]))

      this.loading = false
    }
  },
  created: function () {
    this.$on('ws:message', () => {
      this.fetchData()
    })
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;
  padding: 0;
  font-size: 16px;
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

main {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

header ul {
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #3278ff;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

header ul li {
  padding: .2em .4em;
}

header a, header a:visited {
  color: black;
}

.heron {
  width: 30px;
}
</style>
