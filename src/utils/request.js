/**
 * Created by zh on 2019/11/3.
 */

// import axios from 'axios';
// mock axios
const axios = {
  request({url: time}) {
    console.log('HTTP!!!!');
    return new Promise((resolve) => {
      setTimeout(resolve, time * 1000, time);
    });
  }
};

const requestFactory = () => {
  // TODO: Vuex
  const cache = {};
  let current = null;

  const flush = (key) => {
    if (cache[key] && Array.isArray(cache[key].listeners)) {
      cache[key].listeners.forEach((listener) => {
        listener(cache[key].value);
      });
      cache[key].listeners = [];
    }
  };

  const add = (key, value) => {
    cache[key].value = value;
    cache[key].pending = false;
    return value;
  };

  return {
    visit({method = 'get', url, params = {}}) {
      const key = [method, url, JSON.stringify(params)].join('_');
      current = key;

      // 缓存中已有值，从缓存取值
      if (cache[key] && cache[key].value !== null) {
        Promise.resolve(cache[key].value).then(() => flush(key));
        return this;
      }

      // 无缓存，但已处于 pending 状态
      if (cache[key] && cache[key].pending) {
        return this;
      }

      // 无缓存，且未 pending
      cache[key] = {value: null, listeners: [], pending: false};
      cache[key].pending = true;

      // 发送请求
      axios
        .request({method, url, params})
        .then((value) => add(key, value))
        .then(() => flush(key));

      return this;
    },

    listen(cb) {
      if (!cache[current]) {
        throw new Error('Listen must be called after visit');
      }
      cache[current].listeners.push(cb);
    }
  };
};

const requestWithCache = requestFactory();

export default requestWithCache;
