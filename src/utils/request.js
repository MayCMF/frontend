/**
 * request - Network Request Tool
 * More detailed api documentation:
 * https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import moment from 'moment';
import store from './store';

const codeMessage = {
  200: 'The server successfully processed the request. ',
  201: 'The request was successful and the server created a new resource.',
  202: 'The server has accepted the request for processing, but the processing has not been completed.',
  204: 'The server successfully processed the request, but isn\'t returning any content.',
  400: 'Bad Request — Неправильний запит. Запит не може бути виконаний з причини невірного синтаксису.',
  401: 'Unauthorized — Несанкціонований доступ.',
  403: 'Forbidden — Заборонено. Запит був коректним, але сервер відмовляється відповідати на нього.',
  404: 'Not Found — Не знайдено. Ресурс не знайдено, але він може бути доступний в майбутньому.',
  406: 'Not Acceptable — Неприйнятний запит. ',
  410: '410 Gone — Зник. Код вказує, що ресурс, який запитують, більше не існує і не буде доступний в майбутньому.',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

export const baseURL = '/api';

function checkAccessTokenExpires(expiresAt) {
  const now = moment().unix();
  if (expiresAt - now <= 0) {
    return -1;
  }
  if (expiresAt - now <= 600) {
    return 0;
  }
  return 1;
}

async function getAccessToken() {
  const tokenInfo = await store.getAccessToken();
  
  if (!tokenInfo) {
    return '';
  }

  if (checkAccessTokenExpires(tokenInfo.expires_at) === 0) {
    return request({
        url: `${baseURL}/v1/pub/refresh_token`,
        method: 'POST',
        headers: {
          Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
        },
      })
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          store.setAccessToken(data);
          return `${data.token_type} ${data.access_token}`;
        }
        return '';
      });
  }
  let tokenType = `${tokenInfo.token_type} ${tokenInfo.access_token}`;
  
  return tokenType;
}
/**
 * Exception handler
 */
const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }

  return response;
};

async function defaultHeader() {
  return {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    }
  }
};

/**
 * Configure default parameters for request
 */
const umirequest = extend({
  // Default error handling
  errorHandler,
  credentials: 'include', // Whether to bring cookies by default
});

async function request(url, options) {
  let showNotify = true;
  const opts = {
    url,
    validateStatus() {
      return true;
    },
    ...options,
  };
  if (opts.notNotify) {
    showNotify = false;
  }

  const defaultHeader = {
    Authorization: await getAccessToken(),
  };
  if (opts.method === 'POST' || opts.method === 'PUT') {
    opts.data = opts.data;
  }
  opts.headers = { ...defaultHeader, ...opts.headers };
  
  return umirequest(url, opts);
}

export default request;


// params: {
//   token: getAccessToken() //"xxx" // Усі запити за замовчуванням приймають параметр токена
// },
// import { extend } from "umi-request";

// const request = extend({
//   prefix: "/api/v1",
//   suffix: ".json",
//   timeout: 1000,
//   headers: {
//     "Content-Type": "multipart/form-data"
//   },
//   params: {
//     token: "xxx" // 所有请求默认带上 token 参数
//   },
//   errorHandler: function(error) {
//     /* 异常处理 */
//   }
// });

// request
//   .get("/user")
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// 作者：蚂蚁金服数据体验技术
// 链接：https://juejin.im/post/5db7af846fb9a0202b5ee13c
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。