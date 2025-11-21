import {api} from './api';

export function createSubtask(taskId, title) {
  return api.post(`api/subtasks/${taskId}`, { title });
}

export function deleteSubtask(subtaskId) {
  return api.delete(`api/subtasks/${subtaskId}`);
}

export function updateSubtask(subtaskId, updates) {
  return api.put(`api/subtasks/${subtaskId}`, updates);
}