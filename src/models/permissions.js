import { message } from 'antd';
import * as permissionService from '@/services/permissions';

const Permissions = {
  namespace: 'permissions',
  state: {
    search: {},
    pagination: {},
    data: {
      list: [],
      pagination: {},
    },
    submitting: false,
    formType: '',
    formTitle: '',
    formID: '',
    formVisible: false,
    formData: {},
    treeData: [],
    expandedKeys: [],
  },
  effects: {
    *fetch({ search, pagination }, { call, put, select }) {
      let params = {};

      if (search) {
        params = { ...params, ...search };
        yield put({
          type: 'saveSearch',
          payload: search,
        });
      } else {
        const s = yield select(state => state.permissions.search);
        if (s) {
          params = { ...params, ...s };
        }
      }

      if (pagination) {
        params = { ...params, ...pagination };
        yield put({
          type: 'savePagination',
          payload: pagination,
        });
      } else {
        const p = yield select(state => state.permissions.pagination);
        if (p) {
          params = { ...params, ...p };
        }
      }

      const response = yield call(permissionService.query, params);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *loadForm({ payload }, { put, select }) {
      yield put({
        type: 'changeFormVisible',
        payload: true,
      });

      yield [
        put({
          type: 'saveFormType',
          payload: payload.type,
        }),
        put({
          type: 'saveFormTitle',
          payload: 'New menu',
        }),
        put({
          type: 'saveFormID',
          payload: '',
        }),
        put({
          type: 'saveFormData',
          payload: {},
        }),
        put({ type: 'fetchTree' }),
      ];

      if (payload.type === 'E') {
        yield [
          put({
            type: 'saveFormTitle',
            payload: 'Edit menu',
          }),
          put({
            type: 'saveFormID',
            payload: payload.id,
          }),
          put({
            type: 'fetchForm',
            payload: { record_id: payload.id },
          }),
        ];
      } else {
        const search = yield select(state => state.permissions.search);
        yield put({
          type: 'saveFormData',
          payload: { parent_id: search.parent_id ? search.parent_id : '' },
        });
      }
    },
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(permissionService.get, payload);
      yield put({
        type: 'saveFormData',
        payload: response,
      });
    },
    *submit({ payload }, { call, put, select }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });

      const params = { ...payload };
      const formType = yield select(state => state.permissions.formType);
      let success = false;
      let response;
      if (formType === 'E') {
        params.record_id = yield select(state => state.permissions.formID);
        response = yield call(permissionService.update, params);
      } else {
        response = yield call(permissionService.create, params);
      }
      if (response.record_id && response.record_id !== '') {
        success = true;
      }

      yield put({
        type: 'changeSubmitting',
        payload: false,
      });

      if (success) {
        message.success('Saved successfully');
        yield put({
          type: 'changeFormVisible',
          payload: false,
        });

        yield put({ type: 'fetchTree' });
        yield put({ type: 'fetch' });
      }
    },
    *del({ payload }, { call, put }) {
      const response = yield call(permissionService.del, payload);
      if (response.status === 'OK') {
        message.success('Successfully deleted');
        yield put({ type: 'fetchTree' });
        yield put({ type: 'fetch' });
      }
    },
    *fetchTree({ payload }, { call, put }) {
      let params = {};
      if (payload) {
        params = { ...params, ...payload };
      }
      const response = yield call(permissionService.queryTree, params);
      yield put({
        type: 'saveTreeData',
        payload: response.list || [],
      });
    },
  },
  reducers: {
    saveData(state, { payload }) {
      return { ...state, data: payload };
    },
    saveSearch(state, { payload }) {
      return { ...state, search: payload };
    },
    savePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    changeFormVisible(state, { payload }) {
      return { ...state, formVisible: payload };
    },
    saveFormType(state, { payload }) {
      return { ...state, formType: payload };
    },
    saveFormTitle(state, { payload }) {
      return { ...state, formTitle: payload };
    },
    saveFormID(state, { payload }) {
      return { ...state, formID: payload };
    },
    saveFormData(state, { payload }) {
      return { ...state, formData: payload };
    },
    changeSubmitting(state, { payload }) {
      return { ...state, submitting: payload };
    },
    saveTreeData(state, { payload }) {
      return { ...state, treeData: payload };
    },
    saveExpandedKeys(state, { payload }) {
      return { ...state, expandedKeys: payload };
    },
  },
};
export default Permissions;