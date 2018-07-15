/**
 * Created by zh on 2018/3/21.
 */
import Mock from 'mockjs';
import { DEMO15_API } from '@/components/demos/api.url'

let counter = 0;
Mock.mock(new RegExp(DEMO15_API.result), {
  retCode: 200,
  retDesc: 'ok',
  'ret': {
    'result': [
      {
        'STAT_DATE': '2019-11-21', // 时间
        'GROUP_ID': '9998', // 组ID
        'NAME': '@cname', // 投顾姓名或组名
        'ADD_USERS': '@integer(1,100)', // 添加好友数
        'DELETE_USERS': '@integer(1,100)', // 删除好友数
        'BLACKLIST_CNT': '@integer(1,100)', // 黑名单删除数
        'DUPLICATE_CNT': '@integer(1,100)', // 重复资源删除数
        'ANTIFANS_CNT': '@integer(1,100)', // 黑粉清理删除数
        'DELETE_RATIO': '@integer(1,100)%', // 删除资源占比
        'RETAIN_USERS': '@integer(1,100)', // 实际留存
        'AVG_USERS': '@integer(1,100)' // 人均资源数
      },
      {
        'STAT_DATE': '2019-11-22', // 时间
        'GROUP_ID': '9999', // 组ID
        'NAME': '@cname', // 投顾姓名或组名
        'ADD_USERS': '@integer(1,100)', // 添加好友数
        'DELETE_USERS': '@integer(1,100)', // 删除好友数
        'BLACKLIST_CNT': '@integer(1,100)', // 黑名单删除数
        'DUPLICATE_CNT': '@integer(1,100)', // 重复资源删除数
        'ANTIFANS_CNT': '@integer(1,100)', // 黑粉清理删除数
        'DELETE_RATIO': '@integer(1,100)%', // 删除资源占比
        'RETAIN_USERS': '@integer(1,100)', // 实际留存
        'AVG_USERS': '@integer(1,100)' // 人均资源数
      },
      {
        'STAT_DATE': '@date', // 时间
        'GROUP_ID': '@8888', // 组ID
        'NAME': '@cname', // 投顾姓名或组名
        'ADD_USERS': '@integer(1,100)', // 添加好友数
        'DELETE_USERS': '@integer(1,100)', // 删除好友数
        'BLACKLIST_CNT': '@integer(1,100)', // 黑名单删除数
        'DUPLICATE_CNT': '@integer(1,100)', // 重复资源删除数
        'ANTIFANS_CNT': '@integer(1,100)', // 黑粉清理删除数
        'DELETE_RATIO': '@integer(1,100)%', // 删除资源占比
        'RETAIN_USERS': '@integer(1,100)', // 实际留存
        'AVG_USERS': '@integer(1,100)' // 人均资源数
      }, {
        'STAT_DATE': '@date', // 时间
        'GROUP_ID': '1234', // 组ID
        'NAME': 'all', // 投顾姓名或组名
        'ADD_USERS': '@integer(1,100)', // 添加好友数
        'DELETE_USERS': '@integer(1,100)', // 删除好友数
        'BLACKLIST_CNT': '@integer(1,100)', // 黑名单删除数
        'DUPLICATE_CNT': '@integer(1,100)', // 重复资源删除数
        'ANTIFANS_CNT': '@integer(1,100)', // 黑粉清理删除数
        'DELETE_RATIO': '@integer(1,100)%', // 删除资源占比
        'RETAIN_USERS': '@integer(1,100)', // 实际留存
        'AVG_USERS': '@integer(1,100)' // 人均资源数
      }
    ],
    paginationInfo: {
      'currentPage|+2': 1,
      recordPerPage: 20,
      totalRecord: 102
    }
  }
});
Mock.mock(new RegExp(DEMO15_API.detail), () => {
  counter += 1;
  return {
    retCode: 200,
    retDesc: 'ok',
    ret: [
      {
        'STAT_DATE': '2019-11-2' + counter, // 时间
        'GROUP_ID': String(9997 + counter), // 组ID
        'NAME': '投顾1' + counter, // 投顾姓名或组名
        'ADD_USERS': String(11 + counter), // 添加好友数
        'DELETE_USERS': String(22 + counter), // 删除好友数
        'BLACKLIST_CNT': String(33 + counter), // 黑名单删除数
        'DUPLICATE_CNT': String(44 + counter), // 重复资源删除数
        'ANTIFANS_CNT': String(55 + counter), // 黑粉清理删除数
        'DELETE_RATIO': String(66 + counter + '%'), // 删除资源占比
        'RETAIN_USERS': String(77 + counter), // 实际留存
        'AVG_USERS': String(88 + counter) // 人均资源数
      },
      {
        'STAT_DATE': '2019-11-2' + counter, // 时间
        'GROUP_ID': String(9997 + counter), // 组ID
        'NAME': '投顾2' + counter, // 投顾姓名或组名
        'ADD_USERS': String(11 + counter), // 添加好友数
        'DELETE_USERS': String(22 + counter), // 删除好友数
        'BLACKLIST_CNT': String(33 + counter), // 黑名单删除数
        'DUPLICATE_CNT': String(44 + counter), // 重复资源删除数
        'ANTIFANS_CNT': String(55 + counter), // 黑粉清理删除数
        'DELETE_RATIO': String(66 + counter + '%'), // 删除资源占比
        'RETAIN_USERS': String(77 + counter), // 实际留存
        'AVG_USERS': String(88 + counter) // 人均资源数
      }
    ]
  }
})
