import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/api/home/fake_list', {
    params,
  });
}

export async function queryFakeLink(params) {
  return request('/api/home/links', {
    params,
  });
}