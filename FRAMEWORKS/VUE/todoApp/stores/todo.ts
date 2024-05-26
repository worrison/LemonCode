import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<{ id: number, name: string, completed: boolean }[]>([]);

  const addTask = (name: string) => {
    tasks.value.push({ id: Date.now(), name, completed: false });
  };

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  };

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.value.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  return { tasks, addTask, removeTask, toggleTaskCompletion };
});