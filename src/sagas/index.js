import { all } from 'redux-saga/effects';

import users from './users';
import posts from './posts';
import albums from './albums';

export default function* rootSaga() {
  yield all([
    users(),
    posts(),
    albums(),
  ]);
}
