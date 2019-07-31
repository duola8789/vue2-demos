<template>
  <div>
    <h1>demo11</h1>
    <table class="table">
      <thead>
        <tr>
          <th v-for="head in tableHead" :key="head">{{head}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.key">
          <td v-for="data in item.data"
              :key="data.value"
              :rowspan="data.rowspan"
              v-if="!data.hidden">{{data.value}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'demo36',
    props: [],
    data() {
      return {
        tableHead: ['省份', '市', '区'],
        tableBody: [
          ['四川', '成都市', '温江区'],
          ['四川', '宜宾市', '全部市区'],
          ['四川', '宜宾市', '全部市区2'],
          ['四川1', '宜宾市', '全部市区3'],
          ['四川2', '宜宾市', '全部市区4'],
          ['四川2', '宜宾市4', '全部市区4'],
        ],
      }
    },
    methods: {
      // 合并表格数据
      // 将二维数组转换为二维对象数组，如果表格一列的内容相同，则为相同内容的首行添加 rowspan 属性，相同内容的当前行添加 hidden 属性
      // 两层遍历，外层遍历列（省份 → 市 → 区），内层遍历行
      handleTableData(tableBody, tableHead) {

        // 判断左侧列的数据是否相同，全部相同返回 true，否则返回 false
        function prevSame(result, i, j, startRowIndex) {
          while (j >= 1) {
            if (result[i][j - 1].value === result[startRowIndex][j - 1].value) {
              j--;
            }
            else {
              return false
            }
          }
          return true
        }

        // 将数组转换为 [[{value: '四川'}] 这种形式
        let result = tableBody.map(v => [...v.map(val => ({ value: val }))]);
        // 相同内容的起始行的序列
        let startRowIndex = 0;
        // 外层遍历列
        for (let j = 0; j < tableHead.length; j++) {
          // 内层遍历行
          for (let i = 0; i < result.length; i++) {
            // 起始行的表格内容
            let rowSpanName = result[startRowIndex][j].value;
            // 当前行的表格内容
            const value = result[i][j].value;
            // 如果内容相同并且不是首行
            if (rowSpanName === value && i > 0) {
              // 如果不是第一列，则只有在前面所有列内容相同的情况下才会合并
              if (!result[i][j - 1] || prevSame(result, i, j, startRowIndex)) {
                // 取起始行的 rowspan 属性
                let { rowspan } = result[startRowIndex][j];
                // 取起始行的 rowspan 属性如果有初值则 +1， 如果没有的话初值赋予 2
                result[startRowIndex][j].rowspan = rowspan ? rowspan + 1 : 2;
                // 当前行表格隐藏
                result[i][j].hidden = true;
              } else {
                // 如果不相同则重置其实行
                startRowIndex = i
              }
            } else {
              // 如果不相同则重置其实行
              startRowIndex = i
            }
          }
        }

        // 返回值放到 data 属性中，并且将后两项的值合并作为列表循环时的 key 值
        return result.map(v => ({
          data: v,
          key: v.map(v => v.value).join('')
        }));
      }
    },
    computed: {
      tableData() {
        return this.handleTableData(this.tableBody, this.tableHead)
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin: 20px 0
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
  }


</style>
