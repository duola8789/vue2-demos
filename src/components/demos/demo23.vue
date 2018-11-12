<template>
  <div>
    <h1>算法</h1>
    <ul class="inner-content">
      <li class="li">
        <h2 class="inner-title"><a
          href="https://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651961587&idx=1&sn=54bf39db7043cc638315caf70
          f24d94b&chksm=bd2d0d2f8a5a84395246be4522d10fbfc1f744658047d5fb3fad8e9f3c3d76baab3a2ce84867&mpshare=1&sce
          ne=1&srcid=0920U84N7EGQHRx5azkgXkQx#rd">TopK</a>
        </h2>
        <p class="describe">从arr[1, n]这n个数中，找出最大的k个数（k个数无需排序），这就是经典的TopK问题。</p>
        <p class="describe">
          输入： {{input}},
          n = <input v-model.number="n" type="number" :min=1 :max="100" class="number-input">，
          k = <input v-model.number="k" type="number" :min=1 :max="n" class="number-input">
        </p>
        <p class="describe">排序： {{sortInput}}</p>
        <el-button @click="getRandomArr" type="primary" size="mini">重新生成随机数组</el-button>
        <el-button @click="sort" type="primary" size="mini">再次打乱顺序</el-button>
        <div class="methods">
          <h3>第一种方法</h3>
          <p>最容易想到的就是通过冒泡排序，选出前n的数就可以了</p>
          <p>但是这样带来了性能都的浪费，因为明明只需要5个数，结果将所有的数字进行了排序</p>
          <p>时间复杂度：O(n<sup>2</sup>)</p>
          <p>结果： {{a1Result}}</p>
          <el-button @click="handleA1" type="primary" size="mini">执行</el-button>
        </div>
        <div class="methods">
          <h3>第二种方法</h3>
          <p>不再全局排序，只对最大的k个数进行排序</p>
          <p>实质上是利用了选择排序，每一轮排序冒出一个最大值，冒k个值，就得到TopK。</p>
          <p>时间复杂度：O(n*k)</p>
          <p>结果： {{a2Result}}</p>
          <el-button @click="handleA2" type="primary" size="mini">执行</el-button>
        </div>
        <div class="methods">
          <h3>第三种方法</h3>
          <p>在第二种方法的基础上进行优化, 不进行排队，只筛选出k个元素</p>
          <p>利用堆，前k个数字生成一个小顶堆，用于存储当前最大的k个元素，然后从第k+1个元素，和堆顶（最小）的元素比较</p>
          <p>如果被扫描的元素大于堆顶，则进行替换，并调整堆，保证堆内的k个元素总是当前最大的k个元素</p>
          <p>时间复杂度：n*lg(k)。</p>
          <p>结果： {{a3Result}}</p>
          <el-button @click="handleA3" type="primary" size="mini">执行</el-button>
        </div>
        <div class="methods">
          <h3>第四种方法</h3>
          <p>利用了快速排序，实质上是分治法的思想</p>
          <p>快速排序要找到一个基准值x，比x大的放右边，比x小的放左边</p>
          <p>那我们现在找到第k+1大的数，做一次分割，将比其大的放右边，一次性就找到了最大的k个数</p>
          <p>结果： {{a4Result}}</p>
          <el-button @click="handleA4" type="primary" size="mini">执行</el-button>
        </div>
      </li>
      <li class="li">
        <h2 class="inner-title">常见的排序算法</h2>
        <p class="describe">输入： {{input}}</p>
        <div class="methods">
          <h3>冒泡排序</h3>
          <p>两两比较换位</p>
          <p>时间复杂度：O(n<sup>2</sup>)</p>
          <p>结果： {{b1Result}}</p>
        </div>
        <div class="methods">
          <h3>冒泡排序优化</h3>
          <p>两两比较换位，设定flag，当内层循环完之后flag没有变化，则提前结束循环</p>
          <p>时间复杂度：O(n<sup>2</sup>)</p>
          <p>结果： {{b2Result}}</p>
        </div>
        <div class="methods">
          <h3>选择排序</h3>
          <p>一轮比较，选出一个最大，放在当轮首位</p>
          <p>时间复杂度：O(n<sup>2</sup>)</p>
          <p>结果： {{b3Result}}</p>
        </div>
        <div class="methods">
          <h3>插入排序</h3>
          <p>认为第一个元素已经排好序，取出下一个元素，在已经排好序的序列中进行扫描，插入到其中</p>
          <p>时间复杂度：O(n<sup>2</sup>)</p>
          <p>结果： {{b4Result}}</p>
        </div>
        <div class="methods">
          <h3>快速排序</h3>
          <p>选择一个基准，小于基准的元素放到一边，大于基准的放到另外一边，不断重复这一过程</p>
          <p>时间复杂度：O(nlog<sub>n</sub>)</p>
          <p>结果： {{b5Result}}</p>
        </div>
        <div class="methods">
          <h3>计数排序</h3>
          <p>利用时间换空间，但是这种方法不能对应数组中有负数的情况</p>
          <p>时间复杂度：O(N)</p>
          <p>结果： {{b6Result}}</p>
        </div>
      </li>
      <li class="li">123</li>
      <li class="li">123</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'demo23',
  props: [],
  data() {
    return {
      k: 5,
      n: 10,
      input: [],
      a1Result: null,
      a2Result: null,
      a3Result: null,
      a4Result: null
    }
  },
  mounted() {
    this.getRandomArr()
  },
  methods: {
    // 生成n个不重复的随机正整数，范围在[-100, 100]
    getRandomArr() {
      let arr = [];
      // 方法1，利用for循环
      for (let i = 0; i < this.n; i++) {
        const random = 100 + Math.round(Math.random() * 200);
        if (arr.indexOf(random) === -1) {
          arr.push(random)
        } else {
          i--
        }
      }
      this.input = arr;
    },

    // 随机排序
    sort() {
      // 实际上这种排序方法不是真正的乱序
      // this.input.sort(() => Math.random() - 0.5)

      // 利用Fisher–Yates shuffle 洗牌算法将数组彻底打乱
      this.input = this.realSort([...this.input])
    },

    // 彻底乱序
    realSort(arr) {
      // 利用for循环从头至尾来循环就很傻
      let length = arr.length;
      // for (let i = 0; i < arr.length; i++) {
      //   const index = i + Math.floor(Math.random() * length--);
      //   const temp = arr[i];
      //   arr[i] = arr[index];
      //   arr[index] = temp;
      // }

      // 利用for循环从尾至头来循环好一点
      // for (let i = arr.length - 1; i > 0; i--) {
      //   const index = Math.floor(Math.random() * --length);
      //   const temp = arr[i];
      //   arr[i] = arr[index];
      //   arr[index] = temp;
      // }

      // 利用while来写就更优雅一些
      while (length) {
        const index = Math.floor(Math.random() * --length);
        const temp = arr[length];
        arr[length] = arr[index];
        arr[index] = temp;
      }

      return arr;
    },

    handleA1() {
      // 这是直接利用了JS的sort方法排序
      // this.a1Result = [...this.input].sort((a, b) => (b - a)).splice(0, 5);
      this.a1Result = this.handleA1Func(this.input, this.k);
      this.errorHint(this.a1Result)
    },

    // 冒泡排序
    handleA1Func(arr, n) {
      if (!arr || !Array.isArray(arr) || arr.length === 0) {
        return
      }

      if ((!n && n !== 0) || typeof n !== 'number') {
        return
      }

      const tempArr = [...arr];

      for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr.length - 1 - i; j++) {
          if (tempArr[j] < tempArr[j + 1]) {
            const temp = tempArr[j];
            tempArr[j] = tempArr[j + 1];
            tempArr[j + 1] = temp
          }
        }
      }

      return tempArr.splice(0, n);
    },

    // 选择排序
    handleA2() {
      const arr = [...this.input];
      for (let i = 0; i < arr.length - 1; i++) {
        if (i === this.k) {
          break;
        }
        let max = arr[i];
        let maxIndex = i;
        for (let j = i; j < arr.length - 1; j++) {
          if (arr[j + 1] > max) {
            max = arr[j + 1];
            maxIndex = j + 1
          }
        }
        arr[maxIndex] = arr[i];
        arr[i] = max;
      }
      this.a2Result = arr.slice(0, 5);

      this.errorHint(this.a2Result)
    },

    // 堆
    handleA3() {
      const arr = [...this.input];

      // 实现一个k个元素的，排好序的堆，从大至小排序
      function makeHeap(arr, k) {
        const res = [...arr].slice(0, k);
        return adjustHeap(res);
      }

      // 调整堆，将堆从大至小排序
      function adjustHeap(arr) {
        const res = [...arr];
        for (let i = 0; i < res.length - 1; i++) {
          for (let j = 0; j < res.length - 1 - i; j++) {
            if (res[j] < res[j + 1]) {
              const temp = res[j];
              res[j] = res[j + 1];
              res[j + 1] = temp;
            }
          }
        }
        return res
      }

      // 获得排好序的堆
      let head = makeHeap(arr, this.k);


      // 从k+1开始比较，如果元素比堆顶元素（最小的）大，则替换
      for (let i = this.k; i < arr.length; i++) {
        if (arr[i] > head[head.length - 1]) {
          head[head.length - 1] = arr[i];
          head = adjustHeap(head)
        }
      }

      this.a3Result = head;

      this.errorHint(this.a3Result)
    },

    handleA4() {
      const arr = [...this.input];

      // 快速排序
      // 快速排序实质上是一种分治法的思想
      function quickSort(arr) {
        // 递归结束条件
        if (arr.length <= 1) {
          return arr;
        }

        // 选择基准元素，并且从原数组中暂时剔除
        const index = Math.floor(arr.length / 2);
        const base = arr.splice(index, 1)[0];

        // 将数组分为左右组
        let left = [];
        let right = [];

        // 对所有元素进行遍历，将大于基准值的放在左边，小于基准值的放在右边
        for (let i = 0; i < arr.length; i++) {
          (arr[i] < base ? right : left).push(arr[i])
        }

        // quickSort(left)对左边的合集进行递归
        // quickSort(right)对右边的合集进行递归
        // 连接起来，再加上基准元素就是完整合集
        return quickSort(left).concat([base], quickSort(right))
      }

      this.a4Result = quickSort(arr).slice(0, this.k);
      this.errorHint(this.a4Result)
    },

    errorHint(arr) {
      function getSum(arr) {
        return arr.reduce((total, current) => total + current, 0)
      }

      if (getSum(arr) !== getSum(this.sortInput.slice(0, this.k))) {
        alert('sort wrong!')
      }
    }
  },
  computed: {
    sortInput() {
      return this.input.slice(0).sort((a, b) => b - a)
    },

    // 冒泡排序
    b1Result() {
      let tempArr = [...this.input];
      for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr.length - 1 - i; j++) {
          if (tempArr[j] < tempArr[j + 1]) {
            [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
          }
        }
      }
      return tempArr;
    },

    // 冒泡排序优化
    b2Result() {
      let tempArr = [...this.input];
      let isOver;
      for (let i = 0; i < tempArr.length; i++) {
        isOver = true;
        for (let j = 0; j < tempArr.length - 1 - i; j++) {
          if (tempArr[j] < tempArr[j + 1]) {
            [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
            isOver = false
          }
        }
        if (isOver) {
          return tempArr;
        }
      }
      return tempArr;
    },

    // 选择排序
    b3Result() {
      let tempArr = [...this.input];
      for (let i = 0; i < tempArr.length; i++) {
        let maxIndex = i;
        for (let j = i; j < tempArr.length; j++) {
          if (tempArr[j] > tempArr[maxIndex]) {
            maxIndex = j
          }
        }
        if (maxIndex !== i) {
          [tempArr[i], tempArr[maxIndex]] = [tempArr[maxIndex], tempArr[i]];
        }
      }
      return tempArr;
    },

    // 插入排序
    b4Result() {
      let tempArr = [...this.input];

      function insertSort(arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j > 0; j--) {
            if (arr[j - 1] < arr[j]) {
              [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
          }
        }
        return arr;
      }

      return insertSort(tempArr);
    },

    // 快速排序
    b5Result() {
      let tempArr = [...this.input];

      function quickSort(arr) {
        if (arr.length <= 0) {
          return arr
        }
        const baseIndex = Math.floor(arr.length / 2);
        const base = arr.splice(baseIndex, 1);
        let left = [], right = [];

        for (let i = 0; i < arr.length; i++) {
          (arr[i] > base ? left : right).push(arr[i])
        }

        return quickSort(left).concat(base, quickSort(right))
      }

      return quickSort(tempArr);
    },

    // 计数排序
    b6Result() {
      let tempArr = [...this.input];

      function sort(arr) {
        let temp = [];
        let result = [];

        for (let i = 0; i < arr.length; i++) {
          if (!temp[arr[i]]) {
            temp[arr[i]] = 1
          } else {
            temp[arr[i]]++
          }
        }

        for (let j = 0; j < temp.length; j++) {
          if (temp[j]) {
            for (let k = 0; k < temp[j]; k++) {
              result.push(j)
            }
          }
        }

        return result.reverse();
      }


      return sort(tempArr);
    }
  },
  components: {}
}
</script>

<style scoped>
.inner-content {
  display: flex;
  flex-wrap: wrap;
  box-sizing: inherit;
}
.li {
  box-sizing: border-box;
  border: 1px solid red;
  width: calc(50% - 30px);
  flex-shrink: 0;
  min-height: 150px;
  margin: 10px;
  padding: 10px
}
.inner-title {
  text-align: center;
}
.describe {
  margin: 15px 0;
  color: #999
}
.number-input {
  width: 50px;
}
.methods {
  border: 1px solid #999;
  margin: 5px 0;
  padding: 10px
}
</style>
