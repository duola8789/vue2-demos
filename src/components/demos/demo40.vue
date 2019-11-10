<template>
  <div class="main">

    <el-table :data="tableData" row-key="rowId" :row-class-name="setRowClassName" @row-dblclick="dbClickHandler">

      <!-- 拖拽手柄 -->
      <el-table-column width="50">
        <template slot-scope="scope">
          <el-button v-if="!isStartOrEndRow(scope.row.rowId)"
                     :class="handlerSelector"
                     icon="el-icon-rank"
                     size="small"
                     type="text">
          </el-button>
        </template>
      </el-table-column>

      <!-- 序号 -->
      <el-table-column type="index" width="80" :index="indexMethod"></el-table-column>


      <!-- 实际内容 -->
      <el-table-column v-for="column in columns"
                       :key="column.prop"
                       :prop="column.prop"
                       :label="column.label"
                       :min-width="column.minWidth">
        <template slot-scope="scope">
          <template v-if="scope.row.isEditing">

            <el-input size="mini" v-model.trim="editingRow[column.prop]"></el-input>
          </template>
          <template v-else>
            {{scope.row[column.prop]}}
          </template>
        </template>
      </el-table-column>


      <!-- 操作 -->
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.isEditing">
            <el-button @click="saveEdit(scope.$index)"
                       type="text"
                       size="small"
                       :disabled="isRowSaveBtnDisabled">
              保存
            </el-button>
            <el-button @click="cancelEdit(scope.$index)" type="text" size="small">
              取消
            </el-button>
          </template>
          <template v-else>
            <el-button @click="editRow(scope.$index)" type="text" size="small" :disabled="isRowEditing">
              编辑
            </el-button>
            <el-button v-if="!isStartOrEndRow(scope.row.rowId)"
                       @click="deleteRow(scope.$index)"
                       type="text"
                       size="small"
                       :disabled="isRowEditing">
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
                     :disabled="isRowEditing"
                     icon="el-icon-plus">
            插入
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
import Sortable from 'sortablejs';

const START_ROW_ID = 'start';
const END_ROW_ID = 'end';

export default {
  name: 'demo40',
  data() {
    return {
      tableData: [],

      handlerSelector: 'sortable-move-handler',

      uuRowId: 1,

      editingRow: {
        isEditing: false,
        isNew: false,
      },

      columns: [
        {label: '名称', prop: 'name'},
        {label: 'X', prop: 'x'},
        {label: 'Y', prop: 'y'},
        {label: 'Z', prop: 'z'},
      ]
    }
  },

  mounted() {
    this.fetchData().then(v => {
      this.tableData = this.initTableData(v);
    });

    const a1 = [0, 5, 0, 14];
    const a2 = [1, 2, 10, 4];
    const a3 = [0, 23, 13, 4];

    let max = [a1, a2, a3].reduce((total, current) => {
      current.forEach((num, day) => {
        if (!total[day]) {
          total[day] = {total: 0};
        }
        total[day].total += num;
      });
      return total;
    }, []).sort((a, b) => b.total - a.total)[0].total;

    max = 101
    const digits = Math.pow(10, String(max).length);
    const digital = (max / digits) < 0.5 ? 0.5 : 1;
    console.log(digital * digits);


    // 可拖动
    this.$nextTick(() => {
      const table = document.querySelector('.el-table__body-wrapper tbody');
      const self = this;

      Sortable.create(table, {
        handle: `.${self.handlerSelector}`,
        onEnd({newIndex, oldIndex}) {
          const targetRow = self.tableData.splice(oldIndex, 1)[0];
          self.tableData.splice(newIndex, 0, targetRow);
        },
        onMove(evt) {
          return !evt.related.className.includes('forbid-drag-row')
        }
      })
    })
  },

  methods: {
    // 获取数据
    fetchData() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([1, 2, 3, 4, 5])
        }, 1000)
      }).then(v => {
        let startPoint = {},
          endPoint = {},
          middlePoints = [];

        if (v.length > 0) {
          startPoint = {...v.splice(0, 1)[0]};
          endPoint = {...v.splice(v.length - 1, 1)[0]};
          middlePoints = [...v];
        }

        return ({startPoint, endPoint, middlePoints});
      })
    },

    // 数据初始化
    initTableData({startPoint, endPoint, middlePoints}) {
      let tempStartPoint = {rowId: START_ROW_ID, ...startPoint},
        tempEndPoint = {rowId: END_ROW_ID, ...endPoint};

      return [tempStartPoint, ...middlePoints, tempEndPoint].map(v => (
        {
          name: v.name || '',
          x: v.x || '',
          y: v.y || '',
          z: v.z || `middle-${this.uuRowId}`,
          rowId: v.rowId || `middle-${this.uuRowId++}`,
          isEditing: false,
        }
      ));
    },

    // 设置行序号
    indexMethod(index) {
      if (index === 0) {
        return '起点';
      }
      if (index === this.tableData.length - 1) {
        return '终点';
      }
      return index;
    },

    // 起始行设置类型，禁止其他行与起始行交换位置
    setRowClassName({row}) {
      if (this.isStartOrEndRow(row.rowId)) {
        return 'forbid-drag-row'
      }
      return '';
    },

    // 是否是起始行
    isStartOrEndRow(rowId) {
      return [START_ROW_ID, END_ROW_ID].includes(rowId)
    },

    // 双击某一行进行编辑
    dbClickHandler(row, column) {
      if (this.editingRow.isEditing) {
        return;
      }
      const prop = column.property;
      const isContentColumn = this.columns.map(({prop}) => prop).includes(prop);

      if (isContentColumn) {
        const index = this.tableData.findIndex(v => v.rowId === row.rowId);
        this.editRow(index)
      }
    },

    // 插入行
    insertRow() {
      this.editingRow = {
        x: '',
        y: '',
        z: '',
        name: '',
        rowId: `middle-${this.uuRowId++}`,
        isEditing: true,
        isNew: true,
      };
      this.tableData.splice(this.tableData.length - 1, 0, Object.assign({}, this.editingRow));
    },

    // 编辑行
    editRow(index) {
      this.$set(this.tableData[index], 'isEditing', true);
      this.$set(this.tableData[index], 'isNew', false);
      this.editingRow = Object.assign({}, this.tableData[index]);
    },

    // 删除行
    deleteRow(index) {
      this.tableData.splice(index, 1)
    },

    // 保存当前编辑
    saveEdit(index) {
      this.tableData[index] = {
        ...this.editingRow,
        isEditing: false,
        isNew: false,
      };

      this.editingRow = {
        isEditing: false,
        isNew: false,
      };
    },

    // 取消此行的编辑
    cancelEdit(index) {
      if (this.editingRow.isNew) {
        this.tableData.splice(index, 1)
      } else {
        this.tableData[index].isEditing = false;
        this.tableData[index].isNew = false;
      }
      this.editingRow = {
        isEditing: false,
        isNew: false,
      };


    },
  },

  computed: {
    isRowEditing() {
      return this.editingRow.isEditing
    },

    // 编辑行时，所有编辑项有值才可以保存
    isRowSaveBtnDisabled() {
      const {rowId} = this.editingRow;
      const validateProps = this.isStartOrEndRow(rowId) ? ['name', 'x', 'y'] : ['x', 'y'];
      return validateProps.some(prop => !String(this.editingRow[prop]));
    },
  },

  components: {}
}
</script>

<style scoped lang="less">
  .main {
    font-size: 16px;
    color: darkcyan;
  }

  pre {
    text-align: left;
  }

  .button {
    width: 100%
  }

  .append-row {
    height: 56px;
    line-height: 56px;

    &:hover {
      background: #F2F7FF;
    }
  }
</style>
