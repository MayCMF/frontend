import request from '@/utils/request';

export async function get(params) {
  return request('/api/v1/countries', {
    params,
  });
}
export async function remove(params) {
  return request('/api/v1/countries', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function add(params) {
  return request('/api/v1/countries', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/v1/countries', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
