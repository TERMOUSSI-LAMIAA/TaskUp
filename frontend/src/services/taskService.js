import {api} from './api';

export function createTask(categoryId, taskData) {
  return api.post(`api/tasks/${categoryId}`, taskData);
}

