
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import async from './async';
import users from './users';
import posts from './posts';
import albums from './albums';

const rootReducer = combineReducers({
  async,
  users,
  posts,
  albums,
  form: formReducer,
  routing,
});

export default rootReducer;
