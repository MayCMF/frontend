import { queryCurrent, queryFakeAccountList } from './service';

const Model = {
  namespace: 'userAndaccount',
  state: {
    currentUser: {},
    list: [],
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeAccountList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
