<template>
  <div class="modal">
    <div class="container">
      <CloseButton :to="{
        name: $route.name,
        query: {
          ...$route.query,
          file: undefined,
          messageId: undefined
        }
      }" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import CloseButton from './CloseButton'

export default {
  name: 'modal',
  components: {
    CloseButton
  }
}
</script>

<style scoped>
.modal {
  z-index: 2000;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background-color: white;
  width: 100%;
  height: 100%;
  max-width: 95%;
  max-height: 95%;
  display: flex;
  flex-direction: column;
  padding: 1em;
}

</style>
