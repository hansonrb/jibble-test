import { sampleSize } from 'lodash';

import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cx.GET_ALBUMS):
      return Object.assign([], state,
        sampleSize(action.payload, 30),
      );
    case cx.DELETE_COLLECTION: {
      const newstate = state.slice();
      newstate.splice(action.payload, 1);
      return newstate;
    }
    default:
      return state;
  }
};
