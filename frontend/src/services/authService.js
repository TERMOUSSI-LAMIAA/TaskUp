import { api } from './api';

export function login(data) {
  return api.post('/api/auth/login', data);
}

export function signup(formData) {
  return api.post('/api/auth/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' 
    }
  });
}
