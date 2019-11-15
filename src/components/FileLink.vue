<template>
  <ul>
    <li v-for="(file, index) in data.files" :key="index">
      <code>
       <router-link
          @click.native="active = false"
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

</style>
