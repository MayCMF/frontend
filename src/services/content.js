import request from '@/utils/request';

export async function get(params) {
  return request('/api/content', {
    params,
  });
}
export async function remove(params) {
  return request('/api/content', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function add(params) {
  return request('/api/content', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/content', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
