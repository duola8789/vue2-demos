<template>
  <div>
    <h1>demo2 -- 实例方法和模版 {{ prop.val }}</h1>
    <button @click="addClickedTime" :disabled="clickedTime >= 5">The button has been clicked {{ clickedTime }} times</button>
    <p class="item">
      <span class="title">computed</span>
      The random number is {{ randomNumber }}
    </p>
    <p class="item">
      <span class="title">v-once</span>
      <span>The random number is {{ randomNumber }}</span>
    </p>
    <p class="item">
      <span class="title">v-html</span>
      <span v-html="message2"></span>
    </p>
    <p class="item">
      <span class="title">.prevent修饰符</span>
      <a @click.prevent="justAlert" href="//www.baidu.com">Prevent jumping</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    console.log('data');
    return {
      clickedTime: 0,
      message2: '<span style="color:red">This should be red</span>'
    };
  },

  computed: {
    randomNumber: function () {
      console.log('computed');
      return this.clickedTime + Math.round(Math.random() * 100) / 100;
    }
  },

  props: {
    prop: {
      type: Object,
      default: () => {
        console.log('prop');
        return {};
      }
    }
  },

  watch: {
    clickedTime: {
      immediate: true,
      handler: function () {
        console.log('watch');
      }
    }
  },

  methods: {
    addClickedTime() {
      this.clickedTime += 1;
    },
    justAlert() {
      alert('just alert');
    }
  },

  beforeCreate() {
    console.log('beforeCreate');
  },

  created() {
    console.log('created');
  },

  beforeMount() {
    console.log('beforeMount');
  },

  mounted() {
    console.log('mounted');
  },

  activated() {
    console.log('activated');
  },

  beforeUpdate() {
    console.log('beforeUpdate');
  },

  updated() {
    console.log('updated');
  },

  deactivated() {
    console.log('deactivated');
  },

  beforeDestroy() {
    console.log('beforeDestroy');
  },

  destroyed() {
    console.log('destroyed');
  }
};
</script>

<style scoped></style>
