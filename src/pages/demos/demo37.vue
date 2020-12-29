<template>
  <div>
    <h1>demo37 -- {{ title }} -- {{ subTitle.message }}</h1>

    <!--表单处理-->
    <label class="change-subtitle"><input v-model="title" type="text" /></label>
    <label class="change-subtitle"><input :value="subTitle.message" type="text" @input="changeSubTitle" /></label>

    <p>共{{ totalCount }}项待办事项, 已完成{{ doneCount }}项</p>
    <div class="list-container">
      <ul>
        <li v-for="(item, index) in todoList" :key="item.id">
          <label class="input-container">
            <input type="checkbox" @change="changeState(item, $event)" :checked="item.done" />
          </label>
          <span class="todo-text" :class="item.done ? 'doneText' : ''">{{ index }} - {{ item.content }}</span>
        </li>
      </ul>
      <div class="add-new-container">
        <label><input @keypress.enter="addNew" placeholder="添加" v-model="newTodoContent" /></label>
      </div>
      <div class="add-new-container">
        <label><input @keypress.enter="addNewRandom" placeholder="看心情添加" v-model="newTodoContentRandom" /></label>
      </div>
      <div class="image-container" v-if="src">
        <img class="image" :src="src" alt="yesOrNo" />
      </div>
    </div>

    <ul class="list-container done-container">
      <li v-for="(item, index) in doneTodos" :key="item.id">{{ index }} - {{ item.content }}</li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'demo37',
  props: [],
  data() {
    return {
      msg: ' world',
      newTodoContent: '',
      newTodoContentRandom: '',
      src: ''
    };
  },
  methods: {
    ...mapMutations({
      commitAddNew: 'store_todoList/addTodo'
    }),

    ...mapMutations('store_todoList', {
      commitChangeTodoState: 'changeTodoState'
    }),

    ...mapActions({
      dispatchAddNew: 'store_todoList/addTodo'
    }),

    changeSubTitle(e) {
      this.$store.commit('changeSubTitle', {message: e.target.value});
    },

    changeState(item, event) {
      const result = this.commitChangeTodoState({
        id: item.id,
        checked: event.target.checked
      });
      console.log('更改结果', result ? 'ok' : 'error');
    },

    addNew() {
      const newContent = this.newTodoContent.trim();
      if (!newContent) {
        alert('输入有效内容');
        return;
      }
      // 提交
      // 等同于 this.$store.commit('store_todoList/addTodo', { content: newContent });
      this.commitAddNew({content: newContent});

      // 清空
      this.newTodoContent = '';
    },

    async addNewRandom() {
      const newContent = this.newTodoContentRandom.trim();
      if (!newContent) {
        alert('输入有效内容');
        return;
      }

      // 提交
      // 等同于 this.$store.dispatch('store_todoList/addTodo', { content: newContent });
      this.src = await this.dispatchAddNew({content: newContent});
      console.log(this.src);
    }
  },

  computed: {
    ...mapState(['subTitle']),

    ...mapGetters({
      doneCount: 'store_todoList/doneCount',
      doneTodos: 'store_todoList/doneTodos'
    }),

    // 可以优化为
    // ...mapGetters('store_todoList', [
    //   'doneCount', 'doneTodos'
    // ])

    // 带有 setter 的双向绑定的计算书行
    title: {
      get() {
        return this.$store.state.title;
      },
      set(value) {
        this.$store.commit('changeTitle', {message: value});
      }
    },

    // state
    todoList() {
      return this.$store.state.store_todoList.todoList;
    },

    // getters
    totalCount() {
      return this.$store.getters['store_todoList/totalCount'];
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 20px 0;
}
.list-container {
  position: relative;
  float: left;
  width: 500px;
  padding: 20px;
  margin: 20px;
  border: 1px solid darkgray;
  background: lightgray;
}
.done-container {
  background: lightgreen;
}
.input-container {
  margin: 0;
  vertical-align: middle;
}
.add-new-container {
  text-align: left;
  margin-top: 10px;
}
.todo-text {
  vertical-align: middle;
}
.doneText {
  text-decoration: line-through;
}
.image-container {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 200px;
}
.image {
  width: 100%;
}
</style>
