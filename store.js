import { applyMiddleware, createStore } from "redux";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RECEIVE_FEED,
  RECEIVE_USER,
  TEST_ACTION
} from "./constants";
import { testAction } from "./actions";

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        session: action.session
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        session: action.error,
        user: null
      });

    case RECEIVE_FEED:
      return Object.assign({}, state, {
        feed: action.feed
      });

    case RECEIVE_USER:
      return Object.assign({}, state, {
        user: action.user
      });

    case TEST_ACTION:
      return state;

    default:
      return state;
  }
};

const thunk = store => {
  const dispatch = store.dispatch;
  const getState = store.getState;

  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    console.log(action.type);
    return next(action);
  };
};

export const store = createStore(reducer, applyMiddleware(thunk));
