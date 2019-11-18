<template>
  <div class="main">

    <el-switch
      @change="e => change(e, 'yes', 'no')"
      v-model="value.value"
      active-value="yes"
      active-text="是"
      inactive-text="否"
      inactive-value="no">
    </el-switch>

  </div>
</template>

<script>
// TODO: 同时插入多个
import Sortable from 'sortablejs'
import qs from 'qs';

const request = () => new Promise(((resolve, reject) => {
  setTimeout(reject, 2000)
}))

export default {
  name: 'demo0',
  data() {
    return {
      value: {
        value: 'no'
      },
      loading: null,
    }
  },

  mounted() {
    const a = {a: [[1, 2, 3]]};
    console.log(JSON.stringify(a));
    console.log(qs.stringify({a: [[1, 2, 3], [5, 6, 6]]},  { encode: false, arrayFormat: 'repeat' }))
  },

  methods: {
    change(newState, activeValue, inactiveValue) {

      this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
        confirmButtonText: '保存',
        cancelButtonText: '放弃修改',
        closeOnPressEscape: false,
        closeOnClickModal: false,
        customClass: 'message-box',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            if(!this.loading) {
              this.loading = this.$loading({
                target: '.message-box',
                lock: true,
                text: 'Loading',
              });
              console.log(this.loading);
            } else {
              this.loading();
            }

            request().then(v => {

              done();
              this.$message({
                message: '激活成功',
                type: 'success',
                duration: 500,
              });

            }).catch(() => {
              this.$message({
                message: '激活失败',
                type: 'error',
                duration: 100,
              });
            }).finally(() => {
              this.loading.close();
            })
          } else {
            done();
          }
        }
      }).then(v => {

      }).catch(() => {

        this.value.value = activeValue === newState ? inactiveValue : activeValue;
      })
    }
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
