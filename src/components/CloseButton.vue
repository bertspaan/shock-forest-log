<template>
  <div class="close-messages-container">
    <div class="close-messages circle">
      <router-link class="shadow" :to="to" >✕</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: Object
  }
}
</script>

<style scoped>
.close-messages-container {
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  margin: 2em 1.5em;
  display: flex;
  justify-content: flex-end;
}

.close-messages {
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}

</style>
