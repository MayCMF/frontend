import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryFakeAccountList(params) {
  return request('/api/account/fake_list', {
    params,
  });
}
