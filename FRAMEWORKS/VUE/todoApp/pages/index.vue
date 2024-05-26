<template>
  <div>
    <h1>ToDo List</h1>
    <input v-model="newTask" placeholder="Introduce nueva tarea" />
    <button @click="addTask">Add</button>
    <TodoList />
  </div>
</template>

<script setup>
import { useTodo } from '~/composables/useTodo';
import TodoList from '~/components/TodoList.vue';

const { newTask,addTask} = useTodo();
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>