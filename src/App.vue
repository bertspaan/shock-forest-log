<template>
  <div id="app">
    <Header :toggled="headerToggled" @toggle="toggleHeader" />
    <main>
      <template v-if="$route.name === 'about'">
        <Modal>
          <About />
        </Modal>
      </template>
      <template v-if="!loading">
        <div class="hashtags-container">
          <Hashtags :hashtags="hashtags"
            :selected="this.filters.hashtags" />
        </div>
        <div v-if="$route.query.hashtags || $route.query.type" class="messages-container">
          <CloseButton :to="{
            name: $route.name,
          }" />
          <Messages :messages="filteredMessages"
            :hashtagMapping="hashtagMapping" />
        </div>
        <template v-if="$route.query.file">
          <Modal>
            <File :data="messagesById[$route.query.file]" />
          </Modal>
        </template>
        <template v-else-if="$route.query.messageId && messagesById[$route.query.messageId]">
          <Modal>
            <Message
              :hashtagMapping="hashtagMapping"
              :data="messagesById[$route.query.messageId]" />
          </Modal>
        </template>
      </template>
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import fetch from './lib/fetch'
import filters from './lib/filters'

import Header from './components/Header'
import About from './components/About'
import Hashtags from './components/Hashtags'
import Message from './components/Message'
import Messages from './components/Messages'
import File from './components/File'
import Modal from './components/Modal'
import CloseButton from './components/CloseButton'

export default {
  name: 'app',
  components: {
    Header,
    About,
    Hashtags,
    Message,
    Messages,
    Modal,
    File,
    CloseButton
  },
  data: function () {
    return {
      loading: true,
      headerToggled: false,
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
    toggleHeader: function (toggled) {
      this.headerToggled = toggled
    },
    fetchData: async function () {
      this.messages = await fetch('/messages')
      this.hashtags = await fetch('/hashtags')

      this.hashtags = this.hashtags.filter((hashtag) => hashtag.messages.length > 1)
      this.hashtagMapping = await fetch('/hashtag-mapping')
      this.loading = false
    },
    updateFilters: function () {
      this.headerToggled = false

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
    '$route.query.type': function () {
      this.updateFilters()
    },
    '$route.query.hashtags': function () {
      this.updateFilters()
    }
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
  src: local('Helvetia Neue'), url('assets/fonts/helvetica-neue-roman.otf') format('opentype');
}

body {
  font-family: "Helvetica Neue";
  line-height: 1.3;
  letter-spacing: 0.3px;
  webkit-font-smooth: antialiased;
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
  width: 100%;
  height: 100%;
}

a, a:visited {
  color: black;
}

a.url {
  word-break: break-all;
}

.shadow {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
}

.padding {
  padding: 10px;
}

.margin {
  margin: 10px;
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
  overflow-y: auto;
  width: 50%;
  max-width: 100%;
}

.circle a {
  pointer-events: all;
  cursor: pointer;
  border-radius: 50%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.circle a span {
  padding-top: 4px;
}

.circle a, .circle a:visited {
  color: white;
  text-decoration: none;
}

@media (max-width: 768px) {
  .messages-container {
    width: 100%;
  }

  .close-messages-container {
    /* margin: 1em; */
  }

  .padding {
   padding: 5px;
  }

  .margin {
   padding: 5px;
  }
}

@media (min-width: 1400px){
 .messages-container {
    width: 700px;
  }
}
</style>
