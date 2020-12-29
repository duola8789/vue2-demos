<template>
  <div>
    <demo :id="test.bind(this)"></demo>
  </div>
</template>

<script>
import Son from './Son';
import Demo from './demo38-1';

export default {
  name: 'demo38',

  components: {Son, Demo},

  data() {
    return {
      obj: {
        msg: '555'
      }
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    test(val) {
      console.log(this.ok);
      console.log(this.msg, this.val);
    }
  }
};
</script>

<style scoped lang="less">
.outer {
  width: 300px;
  height: 300px;
  background: darkblue;
}
.inner {
  width: 100px;
  height: 100px;
  background: aqua;
}
</style>
