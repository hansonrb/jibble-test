
import { takeLatest } from 'redux-saga/effects';
import { apiClient, async } from '../helpers';

import * as cx from '../actions/constants';

const getAlbums = async.apiCall({
  type: cx.GET_ALBUMS,
  method: apiClient.get,
  path: () => '/albums',
  success: res => res.data,
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_ALBUMS, getAlbums);
}
