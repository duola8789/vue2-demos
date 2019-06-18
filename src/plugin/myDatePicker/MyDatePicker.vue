<template>
  <div>
    <div class="container">
      <label class="input-label">
        <span class="iconfont icon-el-icon-date"></span>
        <input class="date-input"
               type="text"
               placeholder="选择日期"
               v-model="selectedDate"
               autocomplete="false"
               ref="input"
               @focus="toggleDateContainer(true)"
               @blur=" toggleDateContainer(false)">
        <span class="iconfont icon-el-icon-circle-close"
              v-show="!!selectedDate"
              @click.prevent="selectedDate = ''">
        </span>
      </label>
      <div class="date-container" :class="{'container-visible': containerVisible}" @mousedown.prevent>
        <div class="date-header">
          <button type="button" class="btn last-year-btn">
            <span class="iconfont icon-el-icon-d-arrow-left" @mousedown="changeMonth(-12)"></span>
          </button>
          <button type="button" class="btn last-month-btn" @mousedown="changeMonth(-1)">
            <span class="iconfont icon-el-icon-arrow-left"></span>
          </button>
          <span role="button" class="header-text">{{year}} 年</span>
          <span role="button" class="header-text">{{month}} 月</span>
          <button type="button" class="btn next-year-btn" @mousedown="changeMonth(12)">
            <span class="iconfont icon-el-icon-d-arrow-right"></span>
          </button>
          <button type="button" class="btn next-month-btn" @mousedown="changeMonth(1)">
            <span class="iconfont icon-el-icon-arrow-right"></span>
          </button>
        </div>
        <div class="date-content">
          <table class="date-table">
            <thead>
              <tr>
                <th v-for="data in thead" :key="data">
                  <span>{{data}}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in tbody" :key="'row-'  + rowIndex">
                <td v-for="cell in row" :key="cell.key" @mousedown="selectDate(cell)">
                  <span :class="tableCellClass(cell)">{{cell.label}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyDate from './MyDate';
  
  export default {
    name: 'MyDatePicker',
    data() {
      return {
        datePicker: new MyDate(),
        selectedDate: '',
        clearIconVisible: false,
        containerVisible: false,
      }
    },
    mounted() {
    },
    methods: {
      // 改变月份
      changeMonth(count) {
        const changedDate = new Date(this.year, this.month + count - 1);
        this.datePicker.changeDate(changedDate);
      },
      // 选择日期
      selectDate(selectedDate) {
        this.selectedDate = selectedDate.value;
        this.$refs.input.blur();
      },
      // 设定日期单元格样式
      tableCellClass(cell) {
        return {
          'not-current-month': !cell.isCurrentMonth,
          today: cell.isToday,
          selected: cell.value === this.selectedDate
        }
      },
      // 显示/隐藏日期选择框
      toggleDateContainer(visibility) {
        this.containerVisible = visibility;
      }
    },
    computed: {
      year() {
        return this.datePicker.current.year;
      },
      month() {
        return this.datePicker.current.month;
      },
      thead() {
        return this.datePicker.weeks;
      },
      tbody() {
        return this.datePicker.dates;
      }
    }
  }
</script>

<style scoped lang="less">
  .hover {
    cursor: pointer;
    transition: all 0.2s linear;
    
    &:hover {
      color: #409eff;
    }
  }
  
  .clear {
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    background: none;
    border: none;
  }
  
  .not-current-month {
    color: #c0c4cc
  }
  
  .today {
    color: #409eff;
  }
  
  .selected {
    color: #fff;
    background: #409eff;
    border-radius: 50%;
  }
  
  .container {
    display: inline-block;
    position: relative;
  }
  
  .input-label {
    position: relative;
    display: inline-block;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    
    .icon-el-icon-date {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #c0c4cc;
      font-size: 14px;
    }
    
    .date-input {
      .clear;
      display: inline-block;
      width: 160px;
      height: 36px;
      line-height: 36px;
      padding: 0 30px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      color: #606266;
      user-select: none;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      cursor: pointer;
      
      &:focus {
        border: 1px solid #409eff;
      }
    }
    
    .icon-el-icon-circle-close {
      display: none;
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #c0c4cc;
      font-size: 14px;
    }
    
    &:hover .icon-el-icon-circle-close {
      display: block;
    }
  }
  
  .date-container {
    position: absolute;
    left: 0;
    top: 46px;
    color: #606266;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    transition: all 0.5s ease;
    border: 1px solid #e4e7ed;
    height: 0;
    overflow: hidden;
    will-change: height;
    opacity: 0;
    transform: translateZ(0);
  }
  
  .container-visible {
    height: 320px;
    opacity: 1;
  }
  
  .date-header {
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    margin: 10px 0;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: #606266;
    overflow: hidden;
    .btn {
      .clear;
      padding: 6px 10px 0;
      margin: 0;
      .hover;
      color: #303133;
      
      .iconfont {
        font-size: 12px;
      }
    }
    .last-year-btn, .last-month-btn {
      float: left
    }
    .next-year-btn, .next-month-btn {
      float: right
    }
    .header-text {
      margin: 0 5px;
    }
  }
  .date-content {
    width: 300px;
    font-size: 12px;
    padding: 0 10px;
    margin: 10px 0;
    .date-table {
      width: 100%;
      border-spacing: 0;
      th {
        color: #606266;
        font-weight: 400;
        border-bottom: 1px solid #ebeef5;
        padding: 2px 5px;
        user-select: none;
      }
      td {
        padding: 4px;
        font-weight: 700;
        .hover;
        span {
          display: inline-block;
          width: 30px;
          height: 30px;
        }
      }
    }
  }

</style>
