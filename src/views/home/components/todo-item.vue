<template>
  <li>
    <input class="todo-checkbox" :id="domId" v-model="done" type="checkbox">
    <label :for="domId"></label>
    <span class="todo-text">{{ title }}</span>
    <span class="delete" @click="handleDelete"></span>
  </li>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    title: String,
    value: Boolean,
    index: Number
  },
  computed: {
    done: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    domId() {
      return `item_${this.id}`
    }
  },
  methods: {
    handleDelete() {
      this.$emit('delete-item')
    }
  }
};
</script>

<style>
</style>
