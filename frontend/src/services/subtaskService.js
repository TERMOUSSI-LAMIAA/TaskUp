import {api} from './api';

export function createSubtask(taskId, title) {
  return api.post(`api/subtasks/${taskId}`, { title });
}
