/**
 * Created By zh on 2019-06-11
 */
import MyLoading from './MyLoading'

export default {
  install(Vue, options) {
    const comp = Vue.extend(MyLoading);
    Vue.prototype.showMyLoading = (msg) => {
      if (document.querySelector('.my-loading')) {
        return
      }
      const tpl = new comp({ propsData: { msg } }).$mount().$el;
      document.body.appendChild(tpl);
      setTimeout(function () {
        document.body.removeChild(tpl);
      }, 3000)
    }
  }
}
