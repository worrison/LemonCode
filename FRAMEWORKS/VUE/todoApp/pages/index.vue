<template>
  <div class="container">
    <h1>ToDo List</h1>
    <input v-model="newTask" @keypress.enter="addTask" placeholder="Introduce nueva tarea" />
    <button @click="addTask" >Añadir</button>
    <TodoList />
  </div>
</template>

<script setup>

const { newTask,addTask} = useTodo();
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>