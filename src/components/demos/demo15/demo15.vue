<template>
  <div class="score-resource clearfix">
    <h1>Element 分页信息</h1>
    <div class="wrap-query">
      <query :identity="identity" @search="search"></query>
    </div>
    <div class="table-wrapper" v-if="tableReady">
      <!--表格-->
      <el-table
        class="resource-table"
        :data="result"
        :row-class-name="setClassName"
        empty-text="暂无数据"
        @expand-change="expandRow">
        <!--表格展开内容-->
        <el-table-column type="expand" v-if="canExpand">
          <template slot-scope="props">
            <el-table :data="props.row.children" :show-header="false" class="inner-table" empty-text="暂无数据">
              <el-table-column type="expand"></el-table-column>
              <el-table-column
                align="left"
                v-for="column in columns"
                :prop="column.prop"
                :key="column.prop"
                :label="column.title"
                :min-width="columnMinWidth">
                <template slot-scope="scope">
                  <div v-html="formatters(column.formatter, scope.row, column, scope)">
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!--表格内容-->
        <el-table-column
          align="left"
          v-for="column in columns"
          :prop="column.prop"
          :key="column.prop"
          :label="column.title"
          :min-width="columnMinWidth">
          <template slot-scope="scope">
            <div v-html="formatters(column.formatter, scope.row, column)">
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @current-change="onPageChange"
        @size-change="onPageSizeChange"
        :current-page.sync="paginationInfo.currentPage"
        :page-size="paginationInfo.recordPerPage"
        layout="sizes, prev, pager, next, total"
        :total="paginationInfo.totalRecord">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { DEMO15_API } from '@/components/demos/api.url'
  import debounce from 'lodash/debounce'
  import axios from 'axios'

  import Query from './query'

  export default {
    name: 'resource',
    props: ['identity'],
    data() {
      return {
        columnMinWidth: '100',
        columns: [
          {
            prop: 'STAT_DATE',
            title: '日期'
          }, {
            prop: 'NAME',
            title: '名称',
            roles: ['manager', 'leader']
          }, {
            prop: 'ADD_USERS',
            title: '添加好友个数'
          }, {
            prop: 'BLACKLIST_CNT',
            title: '黑名单删除',
            visible: false
          }, {
            prop: 'DUPLICATE_CNT',
            title: '重复资源删除',
            visible: false
          }, {
            prop: 'ANTIFANS_CNT',
            title: '黑粉清理删除',
            visible: false
          }, {
            prop: 'DELETE_USERS',
            title: '删除好友个数'
          }, {
            prop: 'DELETE_RATIO',
            title: '删除资源占比'
          }, {
            prop: 'RETAIN_USERS',
            title: '实际留存'
          }, {
            prop: 'AVG_USERS',
            title: '人均资源数',
            roles: ['manager', 'leader']
          }
        ],
        columnsSelect: [],
        columnsChecked: [],
        canExpand: this.identity.role !== 'ia',
        result: [],
        paginationInfo: {
          currentPage: 1,
          recordPerPage: 20,
          totalRecord: 0
        },
        queryMerge: {
          pageNum: 1,
          recordPerPage: 20
        },
        tableReady: false,
        refreshLock: false
      }
    },
    mounted() {
      this.setColumnsOptions()
    },
    methods: {
      // 更改搜索条件
      search(query) {
        // 展示第一页的数据
        this.paginationInfo.currentPage = 1;
        this.queryMerge = Object.assign({}, this.queryMerge, query);
        this.refresh()
      },

      // 初始化“选择显示列”中选项
      setColumnsOptions() {
        this.columns.filter(column => {
          return !column.roles || column.roles.indexOf(this.identity.role) !== -1
        }).forEach(column => {
          this.columnsSelect.push(column.title)
        })
      },

      // 刷新表格整体数据
      refresh: debounce(function () {
        this.getData()
      }, 500),

      // 获取表格整体数据
      async getData() {
        console.log('getData');
        if (this.refreshLock) {
          return
        }
        // 网络请求期间加锁
        this.refreshLock = true;
        // 获取数据
        const {data} = await axios.get(DEMO15_API.result, {params: this.queryMerge});
        const response = data.ret;

        // 数据添加children属性
        this.result = response.result.map(val => {
          val.children = [];
          return val
        });
        // 分页信息
        this.paginationInfo = {
          ...response.paginationInfo,
          // currentPage: this.paginationInfo.currentPage
        };
        console.log(this.paginationInfo.currentPage);
        // 表格初始化完成
        if (!this.tableReady) {
          this.tableReady = true
        }
        // 去锁
        this.refreshLock = false
      },

      // 展开表格
      expandRow(row, isExpanding) {
        // 收起表格时
        if (!isExpanding) {
          return
        }
        // 已经有展开数据
        if (row.children && row.children.length > 0) {
          return
        }
        // 刷新表格展开数据
        this.refreshExpand(row)
      },

      // 刷新表格展开数据
      refreshExpand: debounce(function (row) {
        this.getDetail(row)
      }),

      // 获取表格展开数据
      async getDetail(row) {
        if (this.refreshLock) {
          return
        }
        const query = {
          dateType: this.queryMerge.dateType,
          groupId: row.GROUP_ID,
          date: row.STAT_DATE
        };
        // 获取数据
        const response = await axios.get(DEMO15_API.detail, {params: query});
        // 对应数据插入到表格当中
        if (response && response.length > 0) {
          const STAT_DATE = response[0].STAT_DATE;
          const GROUP_ID = response[0].GROUP_ID;
          this.result = this.result.map(val => {
            // 通过日期和组ID匹配对应行
            if (val.GROUP_ID === GROUP_ID && val.STAT_DATE === STAT_DATE) {
              // 展开数据隐藏“日期”列
              response.forEach(child => {
                child['STAT_DATE'] = ''
              });
              val.children = response
            }
            return val
          })
        }
      },

      // 格式化表格显示内容
      formatters(foos, row, column) {
        const VAL = row[column.prop];
        if (!foos) {
          if (VAL === undefined || VAL === null) {
            return '--'
          } else {
            return VAL
          }
        }
      },

      // 设定tr的class，用来确定当前行是否能够点击后展开
      setClassName({row}) {
        // 返回的是汇总数据时，不能展开
        return (!row.NAME || row.NAME === 'all') ? 'collapse-row' : ''
      },


      onPageChange(number) {
        this.queryMerge = {
          ...this.queryMerge,
          pageNum: number
        };
        this.refresh()
      },

      onPageSizeChange(size) {
        this.queryMerge = {
          ...this.queryMerge,
          recordPerPage: size
        };
        this.refresh()
      }
    },
    components: {
      Query
    }
  }
</script>

<style lang="less">
  .score-resource {
    padding:16px;
    .wrap-query {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      background: #fff;
    }
    .table-wrapper {
      .resource-table {
        margin: 16px 0;
        .el-table__expanded-cell {
          padding: 0;
        }
        .inner-table {
          border-left: 0;
          border-right: 0;
          .el-table__body-wrapper {
            overflow: visible;
          }
          &:before {
            display: none;
          }
          margin-top: -1px;
          tr:first-child td {
            border-top: 0;
          }
          tr:last-child td {
            border-bottom: 0;
          }
        }
      }
      .collapse-row .el-table__expand-column .cell,
      .inner-table .el-table__expand-column .cell {
        display: none;
      }
    }
  }
</style>
