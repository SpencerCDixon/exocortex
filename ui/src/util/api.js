import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export function list() {
  return client.get('/');
}

export function view(page) {
  return client.get(`/wiki/${page}`);
}
