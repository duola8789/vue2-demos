<template>
	<div class="inner-tab">
    <ul class="inner-left">
      <li v-for="val in arr" :key="val" @click="changeContent(val)" :class="currentValue === val ? 'active-tab' : ''">
        {{val}}
      </li>
    </ul>
    <span class="inner-right">{{text}}</span>
	</div>
</template>

<script>
  export default {
    name: 'demo14-1',
    props: [],
    data() {
      return {
        arr: ['vue', 'react', 'angular'],
        activeName: 'vue',
        content: {
          vue: 'Vue 是 2016 年发展最为迅速的 JS 框架之一。Vue 将自己描述为一款“用于构建直观，快速和组件化交互式界面的 MVVM 框架”。' +
          '它于 2014 年 2 月首次由 Google 前员工 Evan You 发布',
          react: 'React 被描述为 “用于构建用户界面的 JavaScript 库”。React 最初于 2013 年 3 月发布，由 Facebook 进行开发和维护，' +
          'Facebook 在多个页面上使用 React 组件（但不是作为单页应用程序）。',
          angular: 'Angular 是基于 TypeScript 的 Javascript 框架。由 Google 进行开发和维护，它被描述为“超级厉害的 JavaScript ' +
          'MVW 框架”。'
        },
        currentValue: ''
      }
    },
    activated() {
      console.log('child2 activated')
    },
    deactivated() {
      console.log('child2 deactivated')
    },
    mounted() {
      console.log('child2 mounted!')
    },
    computed: {
      text() {
        if(!this.currentValue) {
          return 'choose one on the left'
        }
        return this.content[this.currentValue]
      }
    },
    methods: {
      changeContent(value) {
        this.currentValue = value
      }
    }
  }
</script>

<style scoped>
  .inner-tab {
    display: flex;
    align-items: center;
    padding: 20px 0 ;
  }
  .inner-left {
    border-right: 1px solid cornflowerblue;
    width: 150px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .inner-left li {
    padding: 10px 20px ;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .inner-left li:hover {
    color: cornflowerblue;
  }
  .inner-right {
    flex-grow: 0;
    flex-shrink: 1;
    text-align: justify;
    padding: 20px;
  }
  .active-tab {
    background: bisque;
  }
</style>
