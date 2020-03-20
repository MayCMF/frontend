import { stringify } from 'qs';
import request from '@/utils/request';

const router = 'examples';

export async function query(params) {
  return request(`/v1/${router}?${stringify(params)}`);
}

export async function get(params) {
  return request(`/v1/${router}/${params.uuid}`);
}

export async function create(params) {
  return request(`/v1/${router}`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`/v1/${router}/${params.uuid}`, {
    method: 'PUT',
    body: params,
  });
}

export async function del(params) {
  return request(`/v1/${router}/${params.uuid}`, {
    method: 'DELETE',
  });
}

export async function enable(params) {
  return request(`/v1/${router}/${params.uuid}/enable`, {
    method: 'PATCH',
  });
}

export async function disable(params) {
  return request(`/v1/${router}/${params.uuid}/disable`, {
    method: 'PATCH',
  });
}
