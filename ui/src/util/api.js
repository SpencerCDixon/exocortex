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

export function save(page, content) {
  return client.post(`/wiki/${page}`, { body: content });
}

export function search(query) {
  return client.post(`/search`, { query });
}
