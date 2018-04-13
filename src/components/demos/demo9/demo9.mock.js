/**
 * Created by zh on 2018/3/21.
 */
import Mock from 'mockjs';
import {USER_API} from '@/components/demos/api.url'

const arr = ['chow', 'jay'];
const name1 = 'f';

Mock.Random.extend({
  pinkOne(){
    let arr = ['白羊座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
    return this.pick(arr)
  }
});

let template = {
  'key|1-10': '★'
};

Mock.mock(new RegExp(USER_API.getUser), 'get', {
  user: {
    'name': '@pinkOne',
    'id|1-2': true,
    'obj|2': {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    }
  },
  job: 'code'
});
