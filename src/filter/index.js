/**
 * Created by zh on 2018/11/12.
 */

import Vue from 'vue';

const capitalize1st = (value) => value.charAt(0).slice(0, 1).toUpperCase() + value.slice(1);

const filters = [capitalize1st];

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
