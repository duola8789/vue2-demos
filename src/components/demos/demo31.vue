<template>
  <div>
    <h1>配合Egg.js</h1>
    {{ title }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'demo31',
  props: [],
  data() {
    return {
      title: ''
    };
  },
  mounted() {
    this.title = 'pending...';
    axios.get('/api/getTitle', {params: {name: 'Vue-Cli-Learning'}}).then((v) => {
      this.title = v.data.title;
    });
  }
};
</script>
<style scoped></style>
