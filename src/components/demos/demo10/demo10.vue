<template>
	<div>
		<h1>demo10 非父子组件之间的通信(添加一个ImageMaker的例子）</h1>
    <div class='wrap'>
      <LeftChild class='child'></LeftChild>
      <RightChild class='child'></RightChild>
    </div>
    <button @click='capture'>click</button>
    <p>图片：</p>
    <div class="image-container">
      <img v-if="src" :src='src' class="image">
    </div>
    <img v-for="img in images" :src="img" :key="img" class="insert">
	</div>
</template>

<script>
  import axios from 'axios'
  import LeftChild from './demo10-1'
  import RightChild from './demo10-2'

  const context = require.context('.', false, /.*\.(jpg|png)$/);
  const images = context.keys().map(v => context(v));

  export default {
    data() {
      return {
        src: '',
        content: '',
        images,
      }
    },
    computed: {},
    methods: {
      capture() {
        const params = {
          'meta': {
            'path': '易龙智投/CRM文字转微信图片',
            'theme': { 'name': '图片', 'ext': 'png', 'captureOptions': {} }
          },
          'data': {
            'style': { 'color': '#CF3A3A', 'backgroundColor': '#fff' },
            'fontFamily': 'PingFang-SC-Regular',
            'fontSize': 32,
            'color': '#CF3A3A',
            'backgroundColor': '#fff',
            'text': '%'
          }
        };
        // const url = 'http://image-maker.nfop.ms.netease.com/api/capture/robot';
        const url = 'http://localhost:3000/api/capture/robot';

        axios.post(url, params, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(v => {
          this.src = v.data;
          console.log(v.data)
        })
      },
    },
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
  .editable {
    margin-left: 30px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #333;
  }
  .image-container {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    margin: 0 auto;
  }
  .image {
    width: 100%;
    height: 100%;
  }
  .insert {
    width: 200px;
    vertical-align: top;
  }
</style>
