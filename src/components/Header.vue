<template>
  <header :class="{
    active: active
    }">
    <template v-if="!active">
      <div class="circle">
        <a href="#" v-on:click="active = true">SFG</a>
      </div>
    </template>
    <template v-else>
      <div class="full">
        <a href="#" v-on:click="active = false">Shock Forest Group</a>
      </div>
      <ul class="menu">
        <li v-for="(filter, index) in contentFilters" :key="index">
          <router-link :to="{name: $route.name, query: {
            type: filter.type
          }}">
          {{ filter.text }}
          </router-link>
        </li>
      </ul>
    </template>
  </header>
</template>

<script>

export default {
  data: function () {
    return {
      fontSize: '50px',
      active: false,
      contentFilters: [
        {
          text: 'messages',
          type: undefined
        },
        {
          text: 'images',
          type: 'images'
        },
        {
          text: 'audio',
          type: 'audio'
        },
        {
          text: 'videos',
          type: 'videos'
        },
        {
          text: 'links',
          type: 'links'
        }
      ]
    }
  }
}
</script>

<style scoped>
header {
  z-index: 1001;
  color: white;
  padding: 10px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;

  line-height: 100px;
  font-size: 30px;
  transition: background-color .25s;

  pointer-events: none;
}

header a, header a:visited {
  color: white;
  text-decoration: none;
}

header.active {
  background-color: black;
  pointer-events: all;
}

.full {
  padding-left: 20px;
}

.circle {
  pointer-events: all;
  width: 100px;
  height: 100px;
  display: inline-block;
  cursor: pointer;
}

.circle a {
  position: relative;
  text-align: center;
  display: inline-block;
  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: black;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.menu li {
  padding-right: .5em;
}
</style>
