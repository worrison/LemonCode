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
  
  const {tasks,removeTask, toggleTaskCompletion} = useTodo();
  </script>