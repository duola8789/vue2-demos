<template>
  <div class="drag-container">
    <h1>Demo45 - 自定义指令 - 拖动</h1>
    <el-button type="primary" @click="visible = true">Show Dialog</el-button>
    <div class="box" v-robo-drag="'#boxBar'">
      <div class="box-bar" id="boxBar">拖动这里</div>
      <p class="box-content">Hello</p>
      <p class="box-content">Hello</p>
      <p class="box-content">Hello</p>
    </div>
    <el-dialog
      v-robo-drag.el="'.el-dialog__header'"
      :visible.sync="visible"
      title="Dialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      :modal-append-to-body="true"
    ></el-dialog>
  </div>
</template>

<script>
export default {
  name: 'demo45',
  data() {
    return {
      visible: false
    };
  },
  props: {},

  computed: {},

  methods: {},

  mounted() {}
};
</script>

<style scoped lang="less">
.drag-container {
  .box {
    position: fixed;
    width: 200px;
    height: 200px;
    border: 1px solid grey;
    border-radius: 4px;

    .box-bar {
      height: 50px;
      line-height: 50px;
      background: #42b983;
    }
  }

  .list-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    .item {
      height: 50px;
      line-height: 50px;
      background: #42b983;
      margin-bottom: 5px;
    }
  }

  .placeholder {
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    z-index: -1;
  }
}
</style>
