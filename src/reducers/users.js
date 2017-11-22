import { range, sample } from 'lodash';

import * as cx from '../actions/constants';
import { success } from '../helpers/async';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case success(cx.GET_USERS):
      // api only returns 10 users
      return Object.assign([], state,
        range(30).map(() => sample(action.payload)),
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
