import request, { baseURL } from '@/utils/request';

// Verification code ID
export async function captchaID() {
  return request(`/api/v1/pub/login/captchaid`);
}

// Captcha
export function captcha(id) {
  return `${baseURL}/v1/pub/login/captcha?id=${id}`;
}
export async function getCaptcha(id) {
  return request(`/api/login/captcha?mobile=${id}`);
}

// Login
export async function login(params) {
  return request(`/api/v1/pub/login`, {
    method: 'POST',
    data: params,
    // notNotify: true,
  });
}

// drop out
export async function logout() {
  return request(`/v1/pub/login/exit`, {
    method: 'POST',
  });
}

// Update personal password
export async function updatePwd(params) {
  return request(`/v1/pub/current/password`, {
    method: 'PUT',
    data: params,
  });
}

// Get current user information
export async function getCurrentUser() {
  return request(`/api/v1/pub/current/user`);
}

// Query current user menu tree
export async function queryMenuTree() {
  return request(`/api/v1/pub/current/permission.tree`);
}
