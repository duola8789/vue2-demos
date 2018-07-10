<template>
  <div>
    <h1>demo12 -- 表格展开</h1>
    <el-table class="my-table" :data="tableData5" :row-class-name="setClassName" style="width: 100%">
      <el-table-column type="expand" v-if="canExpand">
        <template slot-scope="props">
          <el-form label-position="left" inline
                   class="demo-table-expand" v-for="child in props.row.children" :key="child.id">
            <el-form-item :label="child.id"></el-form-item>
            <el-form-item :label="child.name"></el-form-item>
            <el-form-item :label="child.desc"></el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品 ID" prop="id"></el-table-column>
      <el-table-column align="center" label="商品名称" prop="name"></el-table-column>
      <el-table-column align="center" label="描述" prop="desc"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'demo12',
    data: function () {
      return {
        canExpand: true,
        tableData5: [{
          id: '111',
          name: '啊啊啊',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          children: [
            { id: '333', name: '阿发分', desc: '阿斯顿飞' },
            { id: '444', name: '个人股', desc: '扎实的发' }
          ]
        },
          {
            id: '222',
            name: '哈哈哈',
            desc: '阿斯顿飞阿斯顿飞',
          }]
      }
    },
    computed: {},
    methods: {
      setClassName({ row, index }) {
        console.log(123);
        // 通过自己的逻辑返回一个class或者空
        return row.children ? '' : 'collapse';
      },
    },
    components: {}
  }
</script>

<style>
  .my-table {
    margin-top: 20px;
  }
  .my-table .el-table__expanded-cell {
    padding: 0;
  }
  .my-table .demo-table-expand {
    font-size: 0;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ebeef5;
    padding: 0 0 0 50px;
  }
  .my-table .demo-table-expand label {
    color: #606266;
    padding: 12px 0;
    line-height: 23px;
  }
  .my-table .demo-table-expand .el-form-item {
    margin: 0;
    flex: 1 0 0;
    text-align: center;
  }
  .collapse .el-table__expand-column .cell {
    display: none;
  }
</style>
