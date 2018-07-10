<template>
	<div ref="here">
		<h1>demo13 -- 动态创建弹框</h1>
    <button @click="showDialog">show dialog</button>
	</div>
</template>

<script>
  import Vue from 'vue'

  const Dialog = Vue.extend({
    props: ['text'],
    template: '<div class="dialog-container" :class="dialogClass"><div class="dialog">' +
    '<p>{{message}}</p>' +
    '<p>{{text}}</p>' +
    '<button @click="sayHi">emit</button>' +
    '<button @click="remove">remove</button>' +
    '</div></div>',
    data() {
      return {
        dialogClass: '',
        message: 'this is my component'
      }
    },
    methods: {
      sayHi() {
        this.$emit('sayHi')
      },
      remove() {
        this.dialogClass = 'fadeOut';
        setTimeout(() => {
          this.$emit('remove')
        }, 200)
      }
    },
    mounted() {
      this.dialogClass = 'fadeIn'
    }
  });

  export default {
    name: 'demo13',
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {
      showDialog() {
        this.c = new Dialog({
          propsData: {
            text: 'Hello'
          }
        }).$mount();

        this.$refs.here.appendChild(this.c.$el);
        this.c.$on('sayHi', () => {
          alert('Hi')
        });
        this.c.$on('remove', () => {
          this.remove()
        })
      },
      remove() {
        this.c.$el.remove();
        this.c.$destroy();
        this.c = null;
      }
    },
    components: {}
  }
</script>

<style>
  .dialog-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    transition: all .2s ease;
  }
  .fadeIn {
    background: rgba(0, 0, 0, 0.5);
  }
  .fadeOut {
    background: rgba(0, 0, 0, 0);
  }
  .dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    border: 1px solid darkslategray;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px 2px cornflowerblue;
  }
  .dialog button {
    margin: 10px;
  }
  .dialog button:hover {
    cursor: pointer;
  }
</style>
