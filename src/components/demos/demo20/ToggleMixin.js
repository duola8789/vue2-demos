/**
 * Created by zh on 2019/11/20.
 */
export default {
  data() {
    return {
      isVisible: false,
    }
  },
  computed: {
    text () {
      return this.isVisible ? '关闭' : '打开'
    }
  },
  mounted() {
    console.log('mixin mounted');
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    }
  },
}
