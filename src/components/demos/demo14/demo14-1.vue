<template>
	<div class="inner-tab">
    <el-tabs v-model="activeName" tab-position="right">
      <el-tab-pane label="vue" name="vue"><p class="inner-content">{{vue}}</p></el-tab-pane>
      <el-tab-pane label="react" name="react"><p class="inner-content">{{react}}</p></el-tab-pane>
      <el-tab-pane label="angular" name="angular"><p class="inner-content">{{angular}}</p></el-tab-pane>
    </el-tabs>
	</div>
</template>

<script>
  export default {
    name: 'demo14-1',
    props: [],
    data() {
      return {
        activeName: 'vue',
        vue: 'Vue 是 2016 年发展最为迅速的 JS 框架之一。Vue 将自己描述为一款“用于构建直观，快速和组件化交互式界面的 MVVM 框架”。' +
        '它于 2014 年 2 月首次由 Google 前员工 Evan You 发布',
        react: 'React 被描述为 “用于构建用户界面的 JavaScript 库”。React 最初于 2013 年 3 月发布，由 Facebook 进行开发和维护，' +
        'Facebook 在多个页面上使用 React 组件（但不是作为单页应用程序）。',
        angular: 'Angular 是基于 TypeScript 的 Javascript 框架。由 Google 进行开发和维护，它被描述为“超级厉害的 JavaScript ' +
        'MVW 框架”。',
      }
    },
    mounted() {
      console.log('child1 mounted!')
    },
  }
</script>

<style scoped>
  .inner-content {
    margin: 0;
    padding: 10px;
    text-align: justify;
    line-height: 1.8;
  }
</style>
