<template>
  <div class="main">

    <el-table :data="tableData">


      <el-table-column width="55">
        <template slot-scope="scope">
          <el-button v-if="!['start', 'end'].includes(scope.row.rowId)"
                     :class="handlerSelector"
                     icon="el-icon-rank"
                     size="small"
                     type="text">
          </el-button>
        </template>
      </el-table-column>

      <el-table-column type="index" width="100" :index="indexMethod"></el-table-column>

      <el-table-column v-for="column in columns"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"
                       :min-width="column.minWidth">
        <template slot-scope="scope">
          <template v-if="scope.row.isEditing">
            <!--
            <el-form ref="form" :model="editingRow" label-width="80px">
              <el-form-item>
                <el-input v-model="editingRow[column.prop]"></el-input>
              </el-form-item>
            </el-form>
            -->


            <el-input size="mini" v-model.trim="editingRow[column.prop]"></el-input>
          </template>
          <template v-else>
            {{scope.row[column.prop]}}
          </template>
        </template>
      </el-table-column>


      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">

          <template v-if="scope.row.isEditing">
            <el-button @click="saveEdit(scope.$index)"
                       type="text"
                       size="small">
              保存
            </el-button>
            <el-button @click="cancelEdit(scope.$index)" type="text" size="small">取消</el-button>
          </template>
          <template v-else>
            <el-button @click="editRow(scope.$index)"
                       type="text"
                       size="small"
                       :disabled="isOtherBtnDisabled">
              编辑
            </el-button>
            <el-button @click="deleteRow(scope.$index, scope)"
                       type="text"
                       size="small"
                       :disabled="isOtherBtnDisabled">
              删除
            </el-button>
          </template>


        </template>
      </el-table-column>

      <template slot="append">
        <div class="append-row">
          <el-button class="button"
                     @click="insertRow"
                     type="text"
                     :disabled="isOtherBtnDisabled"
                     icon="el-icon-plus">插入
          </el-button>
        </div>
      </template>
    </el-table>

    <div>
      <pre>{{tableData}}</pre>
    </div>

  </div>
</template>

<script>
// TODO: 同时插入多个
import Sortable from 'sortablejs'


export default {
  name: 'demo0',
  data() {
    return {
      tableData: [],

      handlerSelector: 'sortable-move-handler',

      rowEditingState: '',

      editingRow: {},

      columns: [
        { label: '名称', prop: 'name', rowId: 'rowId' },
        { label: 'X', prop: 'x', rowId: 'rowId' },
        { label: 'Y', prop: 'y', rowId: 'rowId' },
        { label: 'Z', prop: 'z', rowId: 'rowId' },
      ]
    }
  },

  mounted() {
    this.fetchData().then(v => {
      this.tableData = this.initTableData(v);
      console.log(this.tableData)
    });


    // 可拖动
    this.$nextTick(() => {
      const table = document.querySelector('.el-table__body-wrapper tbody');
      const self = this;

      Sortable.create(table, {
        handle: `.${self.handlerSelector}`,
        onEnd({ newIndex, oldIndex }) {
          const targetRow = self.tableData.splice(oldIndex, 1)[0];
          self.tableData.splice(newIndex, 0, targetRow)
        }
      })
    })
  },

  methods: {
    indexMethod(index) {
      if (index === 0) {
        return '起点';
      }
      if (index === this.tableData.length - 1) {
        return '终点';
      }
      return index + 1;
    },
    fetchData() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([])
        }, 1000)
      }).then(v => {
        let startPoint = {},
          endPoint = {},
          middlePoints = [];

        if (v.length > 0) {
          startPoint = { ...v.splice(0, 1)[0] };
          endPoint = { ...v.splice(v.length - 1, 1)[0] };
          middlePoints = [...v];
        }

        return ({ startPoint, endPoint, middlePoints });
      })
    },

    // 数据初始化
    initTableData({ startPoint, endPoint, middlePoints }) {
      let tempStartPoint = {
          rowId: 'start',
          ...startPoint
        },
        tempEndPoint = { rowId: 'end', ...endPoint };

      return [tempStartPoint, ...middlePoints, tempEndPoint].map((v, index) => (
        {
          name: v.name || '',
          x: v.x || '',
          y: v.y || '',
          z: v.z || '',
          rowId: v.rowId || index,
          isEditing: false,
        }
      ));
    },

    deleteRow(index, scope) {
      console.log(scope);
      this.tableData.splice(index, 1)
    },

    insertRow() {
      this.rowEditingState = 'insert';
      this.tableData.splice(this.tableData.length - 2, 0, {
        x: '',
        y: '',
        z: '',
        name: '',
        rowId: this.tableData.length - 2,
        isEditing: true
      });
    },

    editRow(index) {
      this.rowEditingState = 'edit';
      this.editingRow = Object.assign({}, this.tableData[index]);
      this.$set(this.tableData[index], 'isEditing', true);
    },

    saveEdit(index) {
      this.tableData[index] = {
        ...this.editingRow,
        isEditing: false,
      };

      this.rowEditingState = '';
      this.editingRow = {};
    },

    cancelEdit(index) {
      this.editingRow = {};
      this.tableData[index].isEditing = false;
      this.rowEditingState = '';
    },
  },

  computed: {
    isOtherBtnDisabled() {
      return this.rowEditingState === 'edit' || this.rowEditingState === 'insert'
    },

    isSaveBtnDisabled() {
      return this.rowEditingState
    }
  },

  components: {}
}
</script>

<style scoped>
  .main {
    font-size: 16px;
    color: darkcyan;
  }
  button {
    cursor: pointer;
    transition: all 0.1s;
  }
  button:focus {
    /*background: darkcyan;*/
  }
  pre {
    text-align: left;
  }
  .button {
    width: 100%
  }
  .append-row {
    height: 80px;
    line-height: 80px;
  }
</style>
