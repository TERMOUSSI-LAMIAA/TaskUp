import {api} from './api';

export function createTask(categoryId, taskData) {
  return api.post(`api/tasks/${categoryId}`, taskData);
}

export function updateTask(taskId, taskData) {
  return api.put(`api/tasks/${taskId}`, taskData);
}