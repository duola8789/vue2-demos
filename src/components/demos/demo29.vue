<template>
  <div>
    <h1>导出Excel表格</h1>
    <div>
      <el-button @click="output">导出</el-button>
    </div>
  </div>
</template>

<script>
import zip from 'zipcelx';

export default {
  name: 'demo29',
  props: [],
  data() {
    return {
      data: [
        {id: 1, name: 'a'},
        {id: 2, name: 'a'},
        {id: 3, name: 'b'},
        {id: 4, name: 'b'}
      ]
    };
  },
  mounted() {},
  methods: {
    output() {
      const config = {
        filename: 'hello',
        sheet: {
          data: [
            [
              {value: 'Income - Webshop', type: 'string'},
              {value: 1000, type: 'number'}
            ],
            [{value: 'hello'}]
          ]
        }
      };

      zip(config);
    }
  },
  computed: {}
};
</script>
<style scoped>
.outer-circle {
  display: inline-block;
  padding: 150px;
  margin: 50px auto;
  text-align: center;
  border-radius: 100%;
  background: palegoldenrod;
}
.circle {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: cadetblue;
  border-radius: 100%;
  animation: rotate 5s infinite linear;
  backface-visibility: hidden;
  perspective: 1000px;
}
@keyframes rotate {
  from {
    transform: rotate(0turn) translateY(-150px) translateY(50%) rotate(1turn);
  }
  to {
    transform: rotate(1turn) translateY(-150px) translateY(50%) rotate(0turn);
  }
}
</style>
