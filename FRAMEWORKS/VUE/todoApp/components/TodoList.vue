<template>
    <ul>
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @remove="removeTask"
        @toggle="toggleTaskCompletion"
      />
    </ul>
  </template>
  
  <script setup>
  import { useTodo } from '~/composables/useTodo';
  import TodoItem from '~/components/TodoItem.vue';
  
  const {tasks,removeTask, toggleTaskCompletion} = useTodo();
  </script>