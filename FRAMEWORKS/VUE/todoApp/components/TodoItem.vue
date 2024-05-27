<template>
    <li>
      <span :class="{ completed: task.completed }">{{ task.name }}</span>
      <button @click="toggleCompletion">
        {{ task.completed ? 'Deshacer' : 'Completar' }}
      </button>
      <button @click="remove">Borrar</button>
    </li>
  </template>
  
  <script setup>
 
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
  </style>