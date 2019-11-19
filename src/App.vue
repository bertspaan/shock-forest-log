<template>
  <div id="app">
    <Header />
    <main>
      <template v-if="!loading">
        <div class="hashtags-container">
          <Hashtags :hashtags="hashtags" />
        </div>
        <div v-if="$route.query.hashtags || $route.query.type" class="messages-container">
          <!-- <div class="close-messages shadow">
            <router-link :to="{
              name: $route.name,
            }" >Close</router-link>
          </div> -->
          <Messages :messages="filteredMessages"
            :hashtagMapping="hashtagMapping" />
        </div>

        <template v-if="$route.query.file">
          <Modal>
            <File :data="messagesById[$route.query.file]" />
          </Modal>
        </template>
        <template v-else-if="$route.query.messageId">
          <Modal>
          </Modal>
        </template>
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
import File from './components/File'
import Modal from './components/Modal'

export default {
  name: 'app',
  mixins: [WebSockets],
  components: {
    Header,
    Hashtags,
    Messages,
    Modal,
    File
  },
  data: function () {
    return {
      loading: true,
      messages: undefined,
      hashtags: undefined,
      hashtagMapping: undefined,
      filters: {},
      showMessages: false
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

      this.hashtags = this.hashtags.filter((hashtag) => hashtag.messages.length > 1)
      this.hashtagMapping = await fetch('/hashtag-mapping')
      this.loading = false
    },
    updateFilters: function () {
      if (this.$route.query.hashtags) {
        const hashtags = this.$route.query.hashtags
        this.setFilter('hashtags', hashtags.split(',').map((hashtag) => `#${hashtag}`))
      } else {
        this.setFilter('hashtags')
      }

      this.setFilter('type', this.$route.query.type)
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
      this.updateFilters()
    },
    '$route.query.hashtags': function (hashtags) {
      this.updateFilters()
    }
  },
  created: function () {
    this.$on('ws:message', () => {
      this.fetchData()
    })
  },
  mounted: function () {
    this.updateFilters()
    this.fetchData()
  }
}
</script>

<style>

@font-face {
  font-family: "Helvetica Neue";
  font-style: normal;
  font-weight: normal;
  src: local('Helvetia Neue'), url('assets/fonts/helvetica-neue-roman.otf') format('otf');
}

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

.shadow {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
}

.hashtags-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.messages-container {
  position: absolute;
  z-index: 500;
  top: 0;
  right: 0;
  max-height: 100%;
  overflow-y: scroll;
  width: 50%;
  max-width: 100%;
}

@media (max-width: 768px){
  .messages-container {
    width: 100%;
  }
}

@media (min-width: 1400px){
 .messages-container {
    width: 700px;
  }
}

a, a:visited {
  color: black;
}

.close-messages {
  margin: 1em;
  padding: 1em;
  background-color: white;
  display: flex;
  justify-content: flex-end;
}

</style>
