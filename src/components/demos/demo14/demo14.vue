<template>
  <div class="demo14-container">
    <h1>demo14 -- ElementUI Tabs 和 Keep-alive</h1>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="my-tabs">
      <el-tab-pane label="时间" name="time">
        {{time}}
      </el-tab-pane>
      <el-tab-pane label="内容" name="content23">
        <Child></Child>
      </el-tab-pane>
      <el-tab-pane label="姓名" name="name" :lazy="true">
        <Child2></Child2>
      </el-tab-pane>
    </el-tabs>
    <h2>原生的组件</h2>
    <div class="inner-container">
      <div class="inner-header">
        <p :class="activeClass === '2' ? 'tab-active': ''" @click="setActive('2')">Posts</p>
        <p :class="activeClass === '3' ? 'tab-active': ''" @click="setActive('3')">Archive</p>
      </div>
      <!--不用keep-alive组件包裹时，动态组件每次都会创建一个新的组件-->
      <!--用keep-alive组件包裹时，组件实例能够被在它们第一次被创建的时候缓存下来-->
      <keep-alive>
        <component class="inner-content" :is="child"></component>
      </keep-alive>
    </div>
    <h2>使用Menu</h2>
    <div class="menu-container">
      <div class="left">
        <div @click="isCollapse = !isCollapse"
             class="menu-controller"
             :class="isCollapse ? '' : 'menu-controller-collapse'">
          <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-else class="el-icon-d-arrow-right"></i>
        </div>
        <el-menu :default-active="componentName"
                 @select="handleSelect"
                 :collapse="isCollapse"
                 class="menu"
                 :collapse-transition="true">
          <el-menu-item index="Child"><span>处理中心</span></el-menu-item>
          <el-menu-item index="Child2"><span>我的工作台</span></el-menu-item>
          <el-menu-item index="Child3"><span>订单管理</span></el-menu-item>
        </el-menu>
      </div>

      <div class="right">
        <component :is="componentName"></component>
      </div>

    </div>
  </div>
</template>

<script>
import Child from './demo14-1'
import Child2 from './demo14-2'
import Child3 from './demo14-3'

export default {
  name: 'demo14',
  props: [],
  data() {
    return {
      activeName: 'time',
      time: new Date().toLocaleString(),
      activeClass: '2',
      child: 'child2',
      isCollapse: false,
      componentName: 'Child'
    }
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    setActive(index) {
      this.activeClass = index;
      this.child = `child${index}`
    },
    handleSelect(key, keyPath) {
      this.componentName = key;
    }
  },
  components: {
    Child,
    Child2,
    Child3
  }
}
</script>

<style scoped>
  .demo14-container {
    width: 800px;
    padding: 0 20px;
  }
  .my-tabs {
    margin-top: 20px;
    margin-bottom: 40px;
    min-height: 200px;
  }
  .inner-container {
    margin-top: 10px;

    height: 300px;
  }
  .inner-header {
    display: flex;
  }
  .inner-header p {
    display: block;
    border: 1px solid darkblue;
    padding: 10px 20px;
    margin: 0;
    border-bottom: none;
    cursor: pointer;
    transition: all 0.2s linear;
  }
  .inner-header p:first-child {
    border-right: none;
  }
  .inner-header p:hover {
    color: cornflowerblue;
  }
  .tab-active {
    background: silver;
  }
  .inner-content {
    border: 1px solid grey;
  }


  .menu-container {
    display: flex;
    margin-top: 20px;
    border: 1px solid black
  }
  .left {
    position: relative;
  }
  .right {
    padding: 20px;
    border-left: solid 1px #e6e6e6;
  }
  menu {
    height: 100%;
  }
  .menu:not(.el-menu--collapse) {
    width: 120px;
  }
  .menu.el-menu--collapse {
    width: 0;
    padding: 0;
  }

  .el-menu {
    border: none;
  }

  .menu-controller {
    position: absolute;
    left: 10px;
    top: 0;
    width: 20px;
    height: 20px;
    z-index: 2;
    transition: all linear 0.3s;
    cursor: pointer;
  }

  .menu-controller-collapse {
    transform: translateX(120px);
  }


</style>
