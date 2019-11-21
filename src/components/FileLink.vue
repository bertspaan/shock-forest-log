<template>
  <ul>
    <li v-for="(file, index) in data.files" :key="index">
      <code>
       <router-link
          class="url"
          :to="{name: $route.name, query: {
            ...$route.query,
            file: data.message.message_id
          }}">
        {{ file.file_name }}
        </router-link>
      </code>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'file-link',
  components: {

  },
  props: {
    data: Object
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-top: 1em;
}
</style>
