<template>
	<div>
		<h1>demo10 非父子组件之间的通信</h1>
    <div class="wrap">
      <LeftChild class="child"></LeftChild>
      <RightChild class="child"></RightChild>
    </div>
	</div>
</template>

<script>
  import LeftChild from './demo10-1'
  import RightChild from './demo10-2'

  export default {
    data() {
      return {

      }
    },
    computed: {},
    methods: {},
    components: {
      LeftChild,
      RightChild
    }
  }
</script>

<style>
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 50px;
    margin: 50px 0 0 50px;
    border: 1px solid grey;
  }
  .child {
    width: 40%;
    border: 1px solid red;
    height: 120px;
  }
</style>
