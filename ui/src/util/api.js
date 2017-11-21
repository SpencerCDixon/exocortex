export function list() {
  return fetch('/api/');
}

export function view(page) {
  return fetch(`/api/wiki/${page}`);
}
