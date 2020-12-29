/**
 * Created by zh on 2020/12/29.
 */

import Vue from 'vue';

// 一旦使用全局混入对象，将会影响到 所有之后创建的 Vue 实例。
Vue.mixin({
  created() {
    console.log('全局mixin -- created');
  }
});
