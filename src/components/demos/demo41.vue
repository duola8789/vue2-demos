<template>
  <div class="main">
    <h1>demo41 - axios 自动重试</h1>
    <button @click="fetch">Click</button>
    <div class="content-container">
      重试次数: {{times}}
    </div>
  </div>
</template>

<script>

import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 1000,
  retry: true,
  retryInterval: 1000,
  retryMaximum: 5,
});

axiosInstance.interceptors.request.use(function (config) {
  return config;
}, function (config) {
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function axiosRetryInterceptor(err) {
  const { message, config } = err;

  // 只针对超时的错误进行重试
  if (!message.includes('timeout')) {
    return Promise.reject(err);
  }

  // 不需要重试
  if (!config || !config.retry)  {
    return Promise.reject(err);
  }

  const retryInterval = config.retryInterval || 1000,
    retryMaximum = config.retryMaximum || 5;

  config._retryCount = config._retryCount || 0;

  // 已经超过最大重试次数
  if (config._retryCount >= retryMaximum) {
    return Promise.reject(err);
  }

  // 重试次数 + 1
  config._retryCount += 1;


  const retryPromise = new Promise((resolve) => {
    setTimeout(resolve, retryInterval)
  });

  return retryPromise.then((() => axiosInstance.request(config)));
});

export default {
  name: 'demo41',
  data() {
    return {
      times: 0,
    }
  },

  mounted() {

  },

  methods: {
    fetch() {
      axiosInstance.get('https://yesno.wtf/a2pi').catch(e => {
        console.log(e);
      })
    }
  },

  computed: {},

  components: {}
}
</script>

<style scoped lang="less">

</style>
