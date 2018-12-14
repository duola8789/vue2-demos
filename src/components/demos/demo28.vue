<template>
  <div>
    <h1>CSS圆周运动</h1>
    <div class='outer-circle'>
      <div class='circle'>Hello</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'demo28',
  props: [],
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    const users = [
      {id: 1, name: 'a'},
      {id: 2, name: 'a'},
      {id: 3, name: 'b'},
      {id: 4, name: 'b'},
    ];

    Array.prototype.unique = Array.prototype.unique || function () {
      if (!Array.isArray(this)) {
        return;
      }
      const set = new Set();
      return users.filter(v => !set.has(v.name) && set.add(v.name)).map(v => v.name)
    };
    console.log(users.unique())
  },
  methods: {}
  ,
  computed: {}
}
</script>
<style scoped>
.outer-circle {
  display: inline-block;
  padding: 150px;
  margin: 50px auto;
  text-align: center;
  border-radius: 100%;
  background: palegoldenrod;
}
.circle {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: cadetblue;
  border-radius: 100%;
  animation: rotate 5s infinite linear;
  backface-visibility: hidden;
  perspective: 1000px;
}
@keyframes rotate {
  from {
    transform: rotate(0turn) translateY(-150px) translateY(50%) rotate(1turn)
  }
  to {
    transform: rotate(1turn) translateY(-150px) translateY(50%) rotate(0turn)

  }
}
</style>
