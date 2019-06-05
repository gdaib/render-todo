<template>
  <li>
    <input class="todo-checkbox" :id="'item_' + id" v-model="done" type="checkbox">
    <label :for="`item_${id}`"></label>
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
