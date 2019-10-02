<template>
  <div class="modal">
    <div class="container">
      <slot></slot>
      <router-link :to="{
        name: $route.name
      }" tag="button">Close</router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  components: {

  },
  props: {

  }
}
</script>

<style scoped>
.modal {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1em;
}

.container {
  background-color: white;
  width: 100%;
  height: 100%;
}

</style>
