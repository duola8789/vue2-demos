<template>
  <div class="modal-container">
    <button @click="toggle">{{text}}Modal</button>
    <div class="modal" v-if="isVisible">
      <button @click="isVisible = false">X</button>
    </div>
  </div>
</template>

<script>
import Toggle from './ToggleMixin'
export default {
  extends: Toggle,
  mounted() {
    console.log('Modal mounted');
  }
}
</script>

<style scoped>
  .modal-container {
  }
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  .modal button {
    width: 100px;
    height: 50px;
  }
</style>
