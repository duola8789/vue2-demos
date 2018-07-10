<template>
	<div class="demo14-container">
		<h1>demo14 -- ElementUI Tabs 和 Keep-alive</h1>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="my-tabs">
      <el-tab-pane label="时间" name="time">
       {{time}}
      </el-tab-pane>
      <el-tab-pane label="内容" name="content">
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
        <p :class="activeClass === '3' ? 'tab-active': ''"  @click="setActive('3')">Archive</p>
      </div>
      <!--不用keep-alive组件包裹时，动态组件每次都会创建一个新的组件-->
      <!--用keep-alive组件包裹时，组件实例能够被在它们第一次被创建的时候缓存下来-->
      <keep-alive>
        <component class="inner-content" :is="child"></component>
      </keep-alive>
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
        child: 'child2'
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

    height: 200px;
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
</style>
