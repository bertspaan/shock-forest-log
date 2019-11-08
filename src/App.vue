<template>
  <div id="app">
    <Header />
    <main>
      <template v-if="!loading">
        <Hashtags :hashtags="hashtags" />
        <Messages :messages="filteredMessages" />
        <!-- <router-view
          :messages="messages"
          :messagesById="messagesById"
          :hashtags="hashtags"
          :locations="locations"></router-view>
        <template v-if="$route.query.messageId">
          <MessageModal :message="messagesById[$route.query.messageId]" />
        </template>
        <template v-else-if="$route.query.hashtags">
          <HashtagModal
            :messages="messages"
            :messagesById="messagesById"
            :hashtags="hashtags"
            :selectedHashtags="$route.query.hashtags.split(',').map((hashtag) => `#${hashtag}`)" />
        </template> -->
      </template>
    </main>
  </div>
</template>

<script>
import fetch from './lib/fetch'

import WebSockets from './components/mixins/WebSockets'

import Header from './components/Header'
import Hashtags from './components/Hashtags'
import Messages from './components/Messages'

export default {
  name: 'app',
  mixins: [WebSockets],
  components: {
    Header,
    Hashtags,
    Messages
  },
  data: function () {
    return {
      loading: true,
      messages: undefined,
      hashtags: undefined,
      filters: {}
    }
  },
  computed: {
    messagesById: function () {
      return Object.fromEntries(this.messages
        .map((message) => [message.message.message_id, message]))
    },
    filteredMessages: function () {
      return this.messages
        .filter((message) => {
          if (this.filters.hashtags) {
            // console.log(this.filters.hashtags, message.hashtags)
            // console.log(message.hashtags
            //   .filter((hashtag) => this.filters.hashtags.includes(hashtag)))
            return message.hashtags
              .filter((hashtag) => this.filters.hashtags.includes(hashtag)).length
          }
          return true
        })
    }
  },
  methods: {
    fetchData: async function () {
      this.messages = await fetch('/messages')
      this.hashtags = await fetch('/hashtags')
      this.loading = false
    }
  },
  watch: {
    '$route.query.hashtags': function (hashtags) {
      if (hashtags) {
        this.filters = {
          ...this.filters,
          hashtags: hashtags.split(',').map((hashtag) => `#${hashtag}`)
        }
      } else {
        this.filters = {
          ...this.filters,
          hashtags: undefined
        }
      }
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

@font-face {
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: normal;
  src: local('Helvetia Neue'), url('assets/fonts/HelveticaNeueLTStd-Roman.otf') format('otf');
}

/* HelveticaNeueLTStd-Roman.otf
HelveticaNeueLTStd-ExO.otf
HelveticaNeueLTStd-Ex.otf
HelveticaNeueLTStd-It.otf */

body {
  font-family: "Helvetica Neue";
  margin: 0;
  padding: 0;
  font-size: 16px;
  width: 100%;
  height: 100%;

  background-color: rgb(230, 230, 230);
}

#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

/* header {
  display: flex;
  flex-direction: row;
  justify-content: center;
} */

main {
  overflow-y: auto;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

main > * {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

a, a:visited {
  color: black;
}

</style>
