import { ref, computed } from 'vue';
import { useTodoStore } from '~/stores/todo';

export function useTodo() {
  const todoStore = useTodoStore();
  
  // Estado local
  const newTask = ref('');

  // Computed para obtener la lista de tareas desde el store
  const tasks = computed(() => todoStore.tasks);

  // add task
  const addTask = () => {
    if (newTask.value.trim()) {
      todoStore.addTask(newTask.value);
      newTask.value = '';
    }
  };

  // Delete task
  const removeTask = (id: number) => {
    todoStore.removeTask(id);
  };

  // Complete task
  const toggleTaskCompletion = (id: number) => {
    todoStore.toggleTaskCompletion(id);
  };

  return {
    newTask,
    tasks,
    addTask,
    removeTask,
    toggleTaskCompletion,
  };
}