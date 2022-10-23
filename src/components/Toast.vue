<template>
  <div class="toast-wrap">
    <div v-if="mask" class="mask"></div>
    <div class="toast" ref="toast" :style="style">{{ title }}</div>
  </div>
</template>

<script setup> 
defineProps({
  title: { type: String },
  mask: { type: Boolean },
}); 
</script>
<style>
.toast-wrap .mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3001;
}

.toast-wrap .toast {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  -webkit-transform-origin-y: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
  padding: 10px 20px;
  background: rgba(245, 2, 2, 0.7);
  z-index: 3000;
}
</style>
