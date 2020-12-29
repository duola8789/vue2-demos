<template>
  <div>
    <h1><a href="https://juejin.im/post/5a30193051882503dc53af3c">动手实现Promise</a></h1>
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
    return {};
  },
  mounted() {
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
          (value) => {
            resolve(this, value);
          },
          (reason) => {
            reject(this, reason);
          }
        );
      } catch (e) {
        reject(this, e);
      }
    }

    MyPromise.prototype.then = function (onResolved, onRejected) {
      // 实例化空 promise 对象用来返回（保持then链式调用)
      const res = new Promise(function () {});

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
    };

    // 封装存储 onResolved、onRejected 函数和新生成 promise 对象
    function Handler(onResolved, onRejected, promise) {
      this.onResolved = typeof onResolved === 'function' ? onResolved : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }

    // 根据 promise 当前状态判断调用 onResolved 或 onRejected
    // 处理 then 注册回调为空的情形
    // 维护 then 链式调用
    function handleResolved(promise, deferred) {
      asyncFn(function () {
        const cb = promise._state === 1 ? deferred.onResolved : deferred.onRejected;
        let res;
        // 使用 deferred.promise 作为当前 promise 结合 value 调用后续处理函数继续往后执行，实现值穿透空处理函数往后传递。
        if (!cb) {
          if (promise._state === 1) {
            resolve(deferred.promise, promise._value);
          } else {
            reject(deferred.promise, promise._value);
          }
          return;
        }
        try {
          // 根据状态调用 then 中注册的 onResolved 或 onRejected 函数
          res = cb(promise._value);
        } catch (e) {
          reject(deferred.promise, e);
        }
        resolve(deferred.promise, res);
      });
    }

    // 模拟异步执行函数
    function asyncFn() {
      if (process && typeof process === 'object' && typeof process.nextTick === 'function') {
        return process.nextTick;
      } else if (typeof setImmediate === 'function') {
        return setImmediate;
      }
      return setTimeout;
    }

    // 判断 Promise 对象
    function isPromise(value) {
      return value && Object.prototype.toString.call(value) === '[object Promise]' && value.then;
    }

    /**
     * 用来改变 promise 状态。
     * @param promise promise实例
     * @param value promise的执行结果
     * @returns {*}
     */
    function resolve(promise, value) {
      // 非 pending 状态不可改变
      if (promise._state !== 0) {
        return;
      }

      // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
      if (value === promise) {
        return reject(promise, new TypeError('A Promise cannot be resolved with itself'));
      }

      // 如果 value 为 Promise，则使 promise 接受 value 的状态
      if (isPromise(value)) {
        const deferreds = promise._deferreds;

        if (value._state === 0) {
          // value 为 pending 状态
          // 将 promise._deferreds 传递给 value.deferreds
          // 这样，当 value 不为 pending 状态后，可以抛弃之前的 promise，以 value 作为当前的 promise 执行 then 注册函数
          value._deferreds.push(...deferreds);
        } else if (deferreds.length > 0) {
          // value 为非 pending 状态
          // 使用 value 作为当前的 promise ，执行 then 注册回调处理
          for (let i = 0; i < deferreds.length; i++) {
            // handleResolved 是实际处理
            handleResolved(value, deferreds[i]);
          }
          // 清空回调函数队列
          value._deferreds = [];
        }
        return;
      }

      // 省略 value 为 thenable 对象和函数的情况

      // 改变 promise 内部状态为 resolved
      promise._state = 1;
      promise._value = value;

      // 如果存在 then 注册的回调函数则依次执行
      if (promise._deferreds.length > 0) {
        for (let i = 0; i < promise._deferreds.length; i++) {
          handleResolved(promise, promise._deferreds[i]);
        }
        // 清空回调函数队列
        promise._deferreds = [];
      }
    }

    function reject(promise, reason) {
      // 非 pending 状态不可变
      if (promise._state !== 0) {
        return;
      }

      // 改变 promise 内部状态为 rejected
      promise._state = 2;
      promise._value = reason;

      // 判断是否存在 then 注册回调函数，如果存在则依次执行
      if (promise._deferreds.length > 0) {
        for (let i = 0; i < promise._deferreds.length; i++) {
          handleResolved(promise, promise._deferreds);
        }
        promise._deferreds = [];
      }
    }
  }
};
</script>
<style scoped></style>
