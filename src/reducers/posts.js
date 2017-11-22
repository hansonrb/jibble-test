import { sampleSize } from 'lodash';

import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cx.GET_POSTS):
      return Object.assign([], state,
        sampleSize(action.payload, 30),
      );
    case cx.DELETE_COLLECTION: {
      const newstate = state.slice();
      newstate.splice(action.payload, 1);
      return newstate;
    }
    case cx.UPDATE_POST_TITLE: {
      const newstate = state.slice();
      newstate[action.payload.idx].title = action.payload.title;
      return newstate;
    }
    default:
      return state;
  }
};
