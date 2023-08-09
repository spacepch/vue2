<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTodo }}</span> / 全部{{ total }}</span
    >
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    doneTodo() {
      // 方案一：
      // let index = 0
      // this.todos.forEach((todo) => {
      //   if(todo.done) index++
      // });
      // return index

      // 方案二：
      return this.todos.reduce(
        (pre, current) => pre + (current.done ? 1 : 0),0);
      // 完整写法：
      // const index = this.todos.reduce((pre,current)=>{
      //   return pre + (current.done ? 1 : 0)
      // },0)
      // return index
    },
    total() {
      return this.todos.length;
    },
    isAll: {
      get() {
        return this.doneTodo === this.total && this.total > 0;
      },
      set(value){
        this.$emit('checkAllTodo',value);
      }
    },
  },
  methods: {
    clearAll(){
      if(confirm('您确定删除已完成任务吗？')) this.$emit('clearAllTodo')
    }
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>