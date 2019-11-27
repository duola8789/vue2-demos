<template>
  <div class="tooltip-container">
    <button @click="toggle">{{text}}Tooltip</button>
    <div class="tooltip" v-if="isVisible">
      <button @click="isVisible = false">X</button>
    </div>
  </div>
</template>

<script>
import Toggle from './ToggleMixin'
export default {
  extends: Toggle,
}
</script>

<style scoped>
  .tooltip-container {
    position: relative;
  }
  .tooltip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tooltip button {
    width: 100px;
    height: 50px;
  }
</style>
