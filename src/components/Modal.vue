<template>
  <div class="modal padding" @click="close" ref="modal">
    <div :class="{
      contents: true,
      padding: true,
      scroll: scroll
    }">
      <CloseButton :to="destination" />
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
  },
  props: {
    closeRouteName: String,
    scroll: Boolean
  },
  computed: {
    destination: function () {
      return {
        name: this.closeRouteName || this.$route.name,
        query: {
          ...this.$route.query,
          file: undefined,
          messageId: undefined
        }
      }
    }
  },
  methods: {
    close: function (event) {
      if (event.target === this.$refs.modal) {
        this.$router.push(this.destination)
      }
    }
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

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px 20px;
}

.contents {
  background-color: white;
  width: 100%;
  height: 100%;
  max-width: 900px;
  max-height: 95%;
  display: flex;
  flex-direction: column;
}

.scroll {
  overflow-y: auto;
}
</style>
