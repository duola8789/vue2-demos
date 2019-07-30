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
    computed: {
      tableData() {
        let result = this.tableBody.map(v => [...v.map(val => ({value: val}))]);

        console.log(result);

        let initIndex = 0;
        for (let j = 0; j < this.tableHead.length; j++) {
          for (let i = 0; i < result.length; i++) {
            let rowSpanName = result[initIndex][j].value;
            const value = result[i][j].value;
            if (rowSpanName === value && i > 0) {
              if (!result[i][j - 1] || (result[i][j - 1].value === result[initIndex][j - 1].value)) {
                result[initIndex][j].rowspan = result[initIndex][j].rowspan ? result[initIndex][j].rowspan + 1 : 2;
                result[i][j].hidden = true;
              }  else {
                initIndex = i
              }
            } else {
              initIndex = i
            }
          }
        }


        return result.map(v => ({
          data: v,
          key: v[v.length - 2].value + v[v.length - 1].value
        }));
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
