<template>
  <div class="circle close-messages-container padding">
    <router-link :to="to" class="shadow-white">
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
  /* margin: 20px 0; */
  margin: 14px 8px;
  width: 30px;
  height: 30px;
  box-shadow: 0 0px 20px rgba(255, 255, 255, 0.5);
}

</style>
