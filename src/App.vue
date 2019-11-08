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
import filters from './lib/filters'

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
      const activeFilters = Object.entries(this.filters)
        .filter(([filter, value]) => value !== undefined)
        .filter(([filter, value]) => filters[filter])

      if (!activeFilters.length) {
        return this.messages
      }

      return this.messages
        .filter((message) =>
          activeFilters
            .every(([filter, value]) => filters[filter](value, message)))
    }
  },
  methods: {
    fetchData: async function () {
      this.messages = await fetch('/messages')
      this.hashtags = await fetch('/hashtags')
      this.loading = false
    },
    setFilter: function (filter, value) {
      this.filters = {
        ...this.filters,
        [filter]: value
      }
    }
  },
  watch: {
    '$route.query.type': function (type) {
      this.setFilter('type', type)
    },
    '$route.query.hashtags': function (hashtags) {
      if (hashtags) {
        this.setFilter('hashtags', hashtags.split(',').map((hashtag) => `#${hashtag}`))
      } else {
        this.setFilter('hashtags')
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
