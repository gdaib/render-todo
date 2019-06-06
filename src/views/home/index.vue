<template>
  <div class="home-page">
    <h1>Daily To-Do list manager</h1>
    <section class="todo-wrapper">
      <h2 class="todo-title">
        {{ today.day }}
        <br>
        {{ today.date }}
      </h2>
      <form @keydown.enter.prevent>
        <input
          type="text"
          class="input-todo"
          :class="{ active: new_todo }"
          placeholder="添加代办事项"
          v-model="new_todo"
          v-on:keyup.enter="addItem"
        >
        <div class="btn btn-add" :class="{ active: new_todo }" @click="addItem">+</div>
      </form>

      <!-- 待办事项大于0 -->
      <div v-if="pending.length > 0">
        <p class="status busy">你还有 {{ pending.length }} 个代办事项未完成</p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <todo-item
            v-for="(item, index) in pending"
            :key="item.title"
            v-bind="item"
            v-model="item.done"
            @delete-item="deleteItem(index)"
          ></todo-item>
        </transition-group>
      </div>

      <!-- 待办事项全部都完成了 -->
      <transition name="slide-fade">
        <p class="status free" v-if="!pending.length">
          <img src="beer_celebration.svg" alt="celebration">恭喜您已经完成了所有代办事项！
        </p>
      </transition>

      <!-- 已完成的待办事项列表大于0和用户选择显示已完成 -->
      <div v-if="completed.length > 0 && showComplete">
        <p class="status">任务完成度: {{ completedPercentage }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <todo-item
            v-for="(item, index) in completed"
            :key="item.title"
            v-bind="item"
            v-model="item.done"
            @delete-item="deleteItem(index)"
          ></todo-item>
        </transition-group>
      </div>

      <div class="control-buttons">
        <div class="btn btn-secondary" v-if="completed.length > 0" @click="toggleShowComplete">
          <span v-if="!showComplete">显示</span>
          <span v-else>隐藏</span> 已完成
        </div>
        <div class="btn btn-secondary" v-if="todoList.length > 0" @click="clearAll">清除所有</div>
      </div>
    </section>
  </div>
</template>

<script>
import TodoItem from "./components/todo-item";

export default {
  name: "home",
  components: {
    TodoItem
  },
  data() {
    return {
      todoList: [
        { id: 0, title: "学习算法", done: false },
        { id: 1, title: "看源码", done: false },
        { id: 4, title: "睡觉....", done: true }
      ],
      new_todo: "",
      showComplete: false
    };
  },
  mounted() {
    this.getTodos();
  },
  watch: {
    todoList: {
      handler: function(updatedList) {
        localStorage.setItem("todo_list", JSON.stringify(updatedList));
      },
      deep: true
    }
  },
  computed: {
    pending() {
      return this.todoList.filter(v => !v.done)
    },
    completed() {
      return this.todoList.filter(v => v.done)
    },
    completedPercentage() {
      return (
        Math.floor((this.completed.length / this.todoList.length) * 100) + "%"
      );
    },
    today() {
      var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var today = new Date();

      today = {
        day: weekday[today.getDay()],
        date: today.toLocaleString()
      };

      return today;
    }
  },
  methods: {
    getTodos() {
      if (localStorage.getItem("todo_list")) {
        this.todoList = JSON.parse(localStorage.getItem("todo_list"));
      }
    },
    addItem() {
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.todoList.length,
          title: this.new_todo,
          done: false
        });
      }
      // reset new_todo
      this.new_todo = "";
      // save the new item in localstorage
      return true;
    },
    deleteItem(index) {
      this.todoList.splice(index, 1);
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete;
    },
    clearAll() {
      this.todoList = [];
    }
  }
};
</script>


<style>
.todo-item-enter-active,
.todo-item-leave-active {
  transition: opacity ease 0.25s, transform ease-in-out 0.3s;
  transform-origin: left center;
}

/* .todo-item-leave-active below version 2.1.8 */
.todo-item-enter,
.todo-item-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

/* .slide-fade-leave-active below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
