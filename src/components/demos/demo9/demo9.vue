<template>
  <div>
    <h1>demo9 -- MOCK</h1>
    <p class="item">
      <span class="title">返回值</span>
      <span>{{userName}}</span>
      <span>{{userId}}</span>
    </p>
    <p class="item">
      <label><span>用户ID:</span><input type="number" v-model="openId" @keyup.enter="getUser"></label>
      <button @click="getUser">获取数据</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import {USER_API} from '@/components/demos/api.url';

const ERROR_TEXT = 'Sorry，出错了';
const REMIND_TEXT = '请输入ID';
const LOADING_TEXT = 'Loading...';

let obj = {};
export default {
  data() {
    return {
      openId: '',
      userName: '',
      userId: '',
      obj: {}
    }
  },
  computed: {},
  methods: {
    async getUser() {
      if (!this.openId) {
        alert(REMIND_TEXT);
        return;
      }
      this.userName = LOADING_TEXT;
      try {
        let {data} = await axios.get(USER_API.getUser, {params: {id: this.openId}});
        this.userName = data.user.name;
        this.userId = data.user.id;
        obj = data.user.obj;
        console.log(data)
      } catch (err) {
        this.userName = ERROR_TEXT;
        this.userId = '';
        console.log(err);
      }
    }
  },
  components: {}
}
</script>

<style>

</style>
