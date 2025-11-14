import { api } from './api';

export function getCategories() {
  return api.get('api/categories');
}

export function getCategoryById(id) {
  return api.get(`api/categories/${id}`);
}

export function createCategory(category) {
  return api.post('api/categories', category);
}

export function updateCategory(id, category) {
  return api.put(`api/categories/${id}`, category);
}

export function deleteCategory(id) {
  return api.delete(`api/categories/${id}`);
}