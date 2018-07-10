<template>
	<div class="inner-tab">
    <span class="inner-right">{{text}}</span>
	</div>
</template>

<script>
  export default {
    name: 'demo14-1',
    props: [],
    data() {
      return {
        text: '分隔内容上有关联但属于不同类别的数据集合。'
      }
    },
    activated() {
      console.log('child3 activated')
    },
    deactivated() {
      console.log('child3 deactivated')
    },
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
