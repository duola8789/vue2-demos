<template>
  <ul class="ul">
    <li v-for="item in items" :key="item.value">
      {{ item.value }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Son',

  components: {},

  data() {
    return {};
  },

  props: ['items', 'test'],

  computed: {},

  watch: {
    items: {
      handler(val) {
        console.log(val, 'watch');
      },
      deep: true
    }
  },

  mounted() {},

  methods: {
    changeTest() {
      this.$emit('update:test', 999);
    }
  }
};
</script>

<style scoped lang="less">
.ul {
  margin-left: 10px;
}
</style>
