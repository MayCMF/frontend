import { routerRedux } from 'dva/router';
import { stringify, parse } from 'querystring';
import store from '@/utils/store';
import * as loginService from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: '',
    tip: '',
    submitting: false,
    captchaID: '',
    captcha: '',
  },
  effects: {
    *loadCaptcha(_, { call, put }) {
      const response = yield call(loginService.captchaID);
      const { captcha_id: captchaID } = response;

      yield put({
        type: 'saveCaptchaID',
        payload: captchaID,
      });
      yield put({
        type: 'saveCaptcha',
        payload: loginService.captcha(captchaID),
      });
    },
    *reloadCaptcha(_, { put, select }) {
      const captchaID = yield select(state => state.login.captchaID);
      yield put({
        type: 'saveCaptcha',
        payload: `${loginService.captcha(captchaID)}&reload=${Math.random()}`,
      });
    },
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(loginService.login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
        console.log(response)

      if (response.access_token) {
        // Save access token
        store.setAccessToken(response);
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getCaptcha, payload);
    // },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
      store.clearAccessToken();
    },
  
  },
  reducers: {
    saveCaptchaID(state, { payload }) {
      return {
        ...state,
        captchaID: payload,
      };
    },
    saveCaptcha(state, { payload }) {
      return {
        ...state,
        captcha: payload,
      };
    },
    saveStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
    saveTip(state, { payload }) {
      return {
        ...state,
        tip: payload,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
