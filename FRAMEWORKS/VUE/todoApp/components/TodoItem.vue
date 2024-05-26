<template>
    <li>
      <span :class="{ completed: task.completed }">{{ task.name }}</span>
      <button @click="toggleCompletion">
        {{ task.completed ? 'Undo' : 'Complete' }}
      </button>
      <button @click="remove">Delete</button>
    </li>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['remove', 'toggle']);
  
  const toggleCompletion = () => {
    emit('toggle', props.task.id);
  };
  
  const remove = () => {
    emit('remove', props.task.id);
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>