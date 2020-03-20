import request from '@/utils/request';

export async function get(params) {
  return request('/api/v1/file', {
    params,
  });
}
export async function remove(params) {
  return request('/api/v1/file', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function upload(params) {
  return request('/api/v1/file', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/v1/file', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
