<template>
  <div>
    <h1>利用JavaScript手动实现一个栈</h1>
  </div>
</template>

<script>
export default {
  name: 'demo32',
  props: [],
  data() {
    return {
      title: ''
    };
  },
  mounted() {
    class Stack {
      constructor() {
        this.items = [];
      }
      // 添加元素到栈顶
      push(...elements) {
        this.items.push(...elements);
      }

      // 移除栈顶的元素，同时返回被移除的元素
      pop() {
        return this.items.pop();
      }

      // 返回栈顶的元素，不对栈做任何修改
      peek() {
        return this.items[this.items.length - 1];
      }

      // 如果栈里没有任何元素就返回true，否则false
      isEmpty() {
        return this.items.length === 0;
      }

      // 移除栈里所有元素
      clear() {
        this.items = [];
      }
      // 返回栈里的元素个数
      size() {
        return this.items.length;
      }

      print() {
        console.log(this.items.toString());
      }
    }

    const stack = new Stack();
    console.log(stack.isEmpty());
    stack.push(1, 2, 3);
    console.log(stack.pop(), 88);
    console.log(stack.items, 123);
    console.log(stack.peek(), 987);
    console.log(stack.size(), 987);
    console.log(stack.print(), 987);
    console.log(stack.isEmpty());
  }
};
</script>
<style scoped></style>
