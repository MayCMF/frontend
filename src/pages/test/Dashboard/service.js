import request from '@/utils/request';

export async function queryRule(params) {
  return request('/api/dashboard', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/dashboard', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/dashboard', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/dashboard', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
