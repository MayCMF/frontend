import { stringify } from 'qs';
import request from '@/utils/request';

const router = 'permissions';

export async function query(params) {
  return request(`/api/v1/${router}?${stringify(params)}`);
}

export async function queryTree(params) {
  return request(`/api/v1/${router}.tree?${stringify(params)}`);
}

export async function get(params) {
  return request(`/api/v1/${router}/${params.record_id}`);
}

export async function create(params) {
  return request(`/api/v1/${router}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`/api/v1/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function del(params) {
  return request(`/api/v1/${router}/${params.record_id}`, {
    method: 'DELETE',
  });
}
