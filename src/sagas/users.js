
import { takeLatest } from 'redux-saga/effects';
import { apiClient, async } from '../helpers';

import * as cx from '../actions/constants';

const getUsers = async.apiCall({
  type: cx.GET_USERS,
  method: apiClient.get,
  path: () => '/users',
  success: res => res.data,
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_USERS, getUsers);
}
