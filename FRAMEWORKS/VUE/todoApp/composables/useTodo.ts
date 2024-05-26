import { ref, computed } from 'vue';
import { useTodoStore } from '~/stores/todo';

export function useTodo() {
  const todoStore = useTodoStore();
  
  // Estado local
  const newTask = ref('');

  // Computed para obtener la lista de tareas desde el store
  const tasks = computed(() => todoStore.tasks);

  // Método para agregar una tarea
  const addTask = () => {
    if (newTask.value.trim()) {
      todoStore.addTask(newTask.value);
      newTask.value = '';
    }
  };

  // Método para eliminar una tarea
  const removeTask = (id: number) => {
    todoStore.removeTask(id);
  };

  // Método para alternar la compleción de una tarea
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