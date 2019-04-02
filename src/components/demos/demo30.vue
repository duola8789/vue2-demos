<template>
  <div>
    <h1>动手实现Promise</h1>
    <p>实现要点和步骤</p>
    <ol>
      <li>构造函数接受一个函数作为参数</li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'demo30',
    props: [],
    data() {
      return {}
    },
    mounted() {
      // 封装存储 onResolved、onRejected 函数和新生成 promise 对象
      function Handler(onResolved, onRejected, promise) {
        this.onResolved = typeof onResolved === 'function' ? onResolved : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.promise = promise;
      }
      
      // 判断 Promise 对象
      function isPromise(value) {
        return value && Object.prototype.toString.call(value) === '[object Promise]' && value.then
      }
      
      // Promise 实例化时立即执行传入的 fn 函数，同时传递内部 resolve 函数作为参数用来改变 promise 状态。
      function resolve(promise, value) {
        // 非 pendding 状态不可改变
        if (promise._state !== 0) {
          return;
        }
        
        // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
        if (value === promise) {
          return reject(promise, new TypeError('A Promise cannot be resolved with itself'))
        }
  
        // 如果 value 为 Promise，则使 promise 接受 value 的状态
        if (isPromise(value)) {
          const deferreds = promise._deferreds
        }
        
        
      }
      
      function reject(promise, reason) {
      
      }
      
      
      function MyPromise(fn) {
        // 省略非 new 实例化方式处理
        // 省略 fn 非函数异常处理
        
        // promise 状态变量
        // 0 - pending
        // 1 - resolved
        // 2 - rejected
        this._state = 0;
        
        // promise 执行结果
        this._value = null;
        
        //  then 方法注册的回调函数
        this._deferreds = [];
        
        // 立即执行 fn 函数，调用私有方法 resolve 和 reject
        try {
          fn(
            value => {
              resolve(this, value)
            },
            reason => {
              reject(this, reason)
            }
          )
        } catch (e) {
          reject(this, e)
        }
      }
      
      MyPromise.prototype.then = function (onResolved, onRejected) {
        // 实例化空 promise 对象用来返回（保持then链式调用)
        const res = new Promise(function () {
        });
        
        // 使用 onResolved，onRejected 实例化处理对象 Handler
        const deferred = new Handler(onResolved, onRejected, res);
        
        // 当前状态为 pendding，存储延迟处理对象
        if (this._state === 0) {
          this._deferreds.push(deferred);
          // 返回新 promise 对象，维持链式调用
          return res;
        }
        
        // 当前 promise 状态不为 pending
        // 调用 handleResolved 执行 onResolved 或 onRejected 回调
        handleResolved(this, deferred);
        
        // 返回新 promise 对象，维持链式调用
        return res;
      }
      
      
    },
  }
</script>
<style scoped>
</style>
