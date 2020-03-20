import { queryFakeList } from './service';

const Model = {
  namespace: 'home',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  *fetchLinks({ payload }, { call, put }) {
    const response = yield call(queryFakeList, payload);
    yield put({
      type: 'queryLinks',
      payload: Array.isArray(response) ? response : [],
    });
  },
},
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    queryLinks(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
