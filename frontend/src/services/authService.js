import { api } from './api';

export function login(data) {
  return api.post('/api/auth/login', data);
}

export function signup(data) {
  return api.post('/api/auth/signup', data);
}
