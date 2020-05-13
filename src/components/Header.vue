<template>
  <header :class="{
    padding: true,
    toggled: toggled
    }">
    <template v-if="!toggled">
      <div class="circle">
        <router-link @click.native="$emit('toggle', true)"
          :to="{name: $route.name, query: $route.query}">
          <span>SFG</span>
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="full">
        <router-link class="shadow" @click.native="$emit('toggle', false)"
          :to="{name: $route.name, query: $route.query}">
          Shock Forest Group</router-link>
      </div>
      <div class="menu">
        <ul>
          <li v-for="(filter, index) in contentFilters" :key="index">
            <router-link
              :class="{
                active: filter.type === $route.query.type
              }"
              @click.native="$emit('toggle', false)"
              :to="{name: $route.name, query: {
                type: filter.type,
              }}">
            {{ filter.text }}
            </router-link>
          </li>
        </ul>
        <span>
          —
        </span>
        <ul>
          <li>
            <router-link :class="{
                active: $route.name === 'about'
              }" :to="{name: 'about'}">about</router-link>
          </li>
        </ul>
      </div>
    </template>
  </header>
</template>

<script>
export default {
  props: {
    toggled: Boolean
  },
  data: function () {
    return {
      fontSize: '50px',
      contentFilters: [
        {
          text: 'images',
          type: 'images'
        },
        {
          text: 'documents',
          type: 'documents'
        },
        {
          text: 'audio',
          type: 'audio'
        },
        {
          text: 'video',
          type: 'video'
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
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;

  line-height: 64px;
  /* font-size: 20px; */
  transition: background-color .25s;

  pointer-events: none;
}

header a, header a:visited {
  color: white;
  text-decoration: none;
}

header.toggled {
  background-color: black;
  pointer-events: all;
}

.full {
  padding-left: 20px;
}

.circle a {
  width: 60px;
  height: 60px;
}

.menu {
  display: flex;
  flex-direction: row;
}

.menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.menu ul li, .menu span {
  padding-right: .5em;
}

.menu ul li a {
  opacity: 0.5;
}

.menu ul li a:hover {
  opacity: 0.75;
}

.menu ul li a.active {
  opacity: 1;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    /* font-size: 20px; */
    line-height: 75px;
  }

  .circle {
    width: 75px;
    height: 75px;
  }

  .menu {
    flex-direction: column;
    padding-left: 20px;
    line-height: 1.5em;
    margin-bottom: 10px;
  }
}

</style>
