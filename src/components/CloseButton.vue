<template>
  <div class="circle close-messages-container padding">
    <router-link :to="to" >
      <span>
      ✕
      </span>
    </router-link>
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
  display: flex;
  justify-content: flex-end;
}

.circle a {
  width: 50px;
  height: 50px;
  /* line-height: 50px; */
  /* font-size: 20px; */
}

</style>
