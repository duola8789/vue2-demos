<template>
  <div>
    <h1>demo20 Mixins</h1>
    <CompOut text="bye"/>
    <!--<CompBase />-->
  </div>
</template>

<script>
import CompBase from '@/components/demos/demo20/demo20-1';

// 当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。
const CompOut = {
  extends: CompBase,
  // 数据对象在内部会进行浅合并 (一层属性深度)，在和组件的数据发生冲突时以组件数据优先。
  data() {
    return {
      name: 'jay',
      obj: {
        age: {
          value: 10001
        }
      }
    }
  },
  methods: {
    // 值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。
    refresh() {
      console.log('outer refresh')
    }
  },
  // 不同名的组件仍然按照生命周期的顺序执行
  created() {
    console.log('outer created')
  },
  // 同名钩子函数将混合为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
  mounted() {
    console.log('outer mounted')
  }
};
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: {
    CompOut,
    CompBase
  }
}
</script>

<style scoped>
.inner-mixin {
  margin: 20px auto;
  font-size: 18px;
}
</style>
