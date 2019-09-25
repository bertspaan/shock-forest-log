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
        <router-view class="view"
          :messages="messages"
          :hashtags="hashtags"
          :locations="locations"></router-view>
      </template>
    </main>
  </div>
</template>

<script>
import fetch from './lib/fetch'

export default {
  name: 'app',
  components: {

  },
  data: function () {
    return {
      loading: true,
      messages: undefined,
      hashtags: undefined,
      locations: undefined
    }
  },
  mounted: async function () {
    this.messages = await fetch('/messages')
    this.locations = await fetch('/locations')
    this.hashtags = await fetch('/hashtags')
    this.loading = false
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;
  padding: 0;
  font-size: 18px;
}

header, main {
  top: 0;
  left: 0;
}

header {
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  padding: 10px;
  z-index: 1001;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

main {
  position: absolute;
  width: 100%;
  height: 100%;
}

header ul {
  margin: 0;
  padding: 0;
  background-color: #3278ff;
  opacity: 0.95;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0 2em;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

header ul li {
  padding: .5em 1em;
}

header a, header a:visited {
  color: black;
}

.heron {
  width: 60px;
}
</style>
