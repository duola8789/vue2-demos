<template>
  <div>
    <h1>过滤器及自定义focus指令</h1>
    <div class="inner-content"><form>
      <label><span>过滤前：</span>
        <input v-model="value" v-focus="focus[0]" @copy="beforePaste" @input="input(0, $event)" required>
        <input v-model="value1" v-focus="focus[1]" @copy="beforePaste" @input="input(1, $event)">
        <input v-model="value2" v-focus="focus[2]" @copy="beforePaste" @input="input(2, $event)">
        <input v-model="value3" v-focus="focus[3]" @copy="beforePaste" @input="input(3, $event)" pattern="\d+">
      </label><button type="submit"></button></form>
      <p><span>全局过滤器： </span>{{value | capitalize1st}}</p>
      <p><span>局部过滤器： </span>{{value | repeat}}</p>
      <p><span>全局过滤器 + 局部过滤器： </span>{{value | capitalize1st | repeat}}</p>
      <el-button type="success" size="mini" @click="select">select</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'demo24',
  props: [],
  data() {
    const focus = Array.from({length: 4}, () => false);
    focus[0] = true;
    return {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      focus: focus
    }
  },
  mounted() {
    const extName = (filename) => {
      const index = filename.lastIndexOf('.');
      if (index === -1 || index === 0) {
        return ''
      }
      return filename.slice(filename.lastIndexOf('.'))
    };
  },
  // 自定义指令
  directives: {
    focus: {
      inserted(el, val) {
        if (el && val.value) {
          el.focus()
        }
      },
      update(el, val) {
        if (el && val.value) {
          el.focus()
        }
      }
    }
  },
  methods: {
    select() {
      if (this.value) {
        this.$refs.input.focus();
        this.$refs.input.setSelectionRange(2, -1);
        console.log(this.$refs.input.selectionStart, 'start');
        console.log(this.$refs.input.selectionEnd, 'end')
      }
    },
    input(number, e) {
      if (e.target.value.length === 1) {
        for (let i in this.focus) {
          this.focus[i] = +i === number + 1;
        }
      }
      console.log(this.focus)
    },
    beforePaste(e) {
      e.clipboardData.clearData();
      e.clipboardData.setData('text', 'okok');
      e.preventDefault();
      console.log('copy', e.clipboardData.getData('text'))
    },
  },
  computed: {},
  filters: {
    repeat(value) {
      return value + value
    }
  }
}
</script>
