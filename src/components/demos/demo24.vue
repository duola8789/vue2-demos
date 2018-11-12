<template>
  <div>
    <h1>过滤器</h1>
    <div class="inner-content">
      <label><span>过滤前：</span> <input v-model="value"></label>
      <p><span>全局过滤器： </span>{{value | capitalize1st}}</p>
      <p><span>局部过滤器： </span>{{value | repeat}}</p>
      <p><span>全局过滤器 + 局部过滤器： </span>{{value | capitalize1st  | repeat}}</p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'demo24',
  props: [],
  data() {
    return {
      value: '',
    }
  },
  computed: {},
  filters: {
    repeat (value) {
      return value + value
    }
  }
}
</script>
