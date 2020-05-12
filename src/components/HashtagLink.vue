<template>
  <router-link :to="{name: 'main', query: {hashtags: t}}">#{{ t }}</router-link>
</template>

<script>
export default {
  name: 'hashtag-link',
  props: {
    t: String
  }
}
</script>

<style>
</style>