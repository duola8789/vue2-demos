<template>
  <div class="container">
    <h1>demo18 -- 在ElementUI中插入自定义标签</h1>
    <div class="intro">
      <p>在表头插入自定义标签使用Element-UI的render-header函数</p>
      <p>在表格中插入自定义标签的方式有</p>
      <p>1. 使用template标签，在里面插入HTML标签</p>
      <p>2. 使用Element-UI的formatter方法</p>
      <p>但是上面的这两种方法都没有办法满足CRM中对表格可配置化的要求</p>
      <p>CRM中使用了一个同一个formatters方法处理各个column的formatter方法，然后统一在template中显示</p>
      <p>虽然可以在formatter方法中插入HTML标签，但是这不是VNode，没有办法绑定Vue事件，传参困难</p>
      <p>但是直接使用Vue的createElement产生的VNode作为返回值直接插入template是会报错的：</p>
      <p style="color:red">Converting circular structure to JSON</p>
      <p>推测原因就是将渲染函数没有经由render函数就不恰当的嵌入模板中了</p>
      <p>解决方法就是将要插入的标签声明为一个组件，然后在通过template插入就可以了</p>
      <p>声明组件可以通过单文件组件模板生产，也可以通过函数式的生成，参考
        <a href="https://cn.vuejs.org/v2/guide/render-function.html#函数式组件"
           target="_blank"
           rel="noopener noreferrer">官网</a></p>
    </div>

    <MyCom></MyCom>
    <el-table :data="tableData" style="width: 100%; margin: 20px">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" :formatter="insert">
        <template slot-scope="scope">
          <MyCom :prop1="insert(scope.row.name)" @del="test"></MyCom>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import Vue from 'vue'
  export const MyCom = {
    template: '<div @click="del">{{prop1}}</div>',
    props: ['prop1'],
    methods: {
      del() {
        this.$emit('del')
      }
    }
  };

  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      test(e) {
        console.log(Vue.component)
      },
      insert(name) {
        return name + '123'
      }
    },
    components: {
      MyCom,
    }
  }
</script>
<style scoped>
  .intro {
    text-align: justify;
    padding-left: 30px;
  }
</style>
