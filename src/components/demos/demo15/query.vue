<template>
  <div class="resource-deatil-query">
    <el-form ref="resourceDeatilQuery" :inline="true" :model="queryConditions" class="query" @submit.native.prevent>
      <el-radio-group v-model="queryConditions.dateType" @change="search">
        <el-radio-button v-for="dateType in dateTypes"
                         :label="dateType.val"
                         :key="dateType.val"
                         class="resource-query-btn">
          {{dateType.name}}
        </el-radio-button>
      </el-radio-group>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: ['identity'],

    data () {
      return {
        queryConditions: {
          dateType: 1
        },
        dateTypes: [
          { name: '天', val: 1 },
          { name: '周', val: 2 },
          { name: '月', val: 3 }
        ]
      }
    },

    mounted () {
      this.search()
    },

    methods: {
      search () {
        this.$emit('search', this.queryConditions)
      }
    }
  }
</script>

<style lang="less">
  .resource-deatil-query {
    .resource-query-btn {
      margin-bottom: 0;
    }
  }
</style>
