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
    console.log('mounted')
  },

  activated() {
    console.log('activated')
  },

  methods: {
  },

  computed: {
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
