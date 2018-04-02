import { AsyncStorage } from "react-native";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import _ from "lodash";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RECEIVE_FEED,
  RECEIVE_REVIEW,
  RECEIVE_THINGS,
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

    case RECEIVE_THINGS:
      return Object.assign({}, state, {
        thingsById: _.merge(
          _.cloneDeep(state.thingsById),
          _.keyBy(action.things, "id")
        ),
        thingsList: _.map(action.things, thing => {
          return thing.id;
        })
      });

    case RECEIVE_FEED:
      return Object.assign({}, state, {
        reviewsById: _.merge(
          _.cloneDeep(state.reviewsById),
          _.keyBy(action.reviews, "id")
        ),
        feed: _.map(action.reviews, review => {
          return review.id;
        })
      });

    case RECEIVE_REVIEW:
      return Object.assign({}, state, {
        reviewsById: _.merge(
          _.cloneDeep(state.reviewsById),
          _.keyBy([action.review], "id")
        )
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

    console.log(action.type); // TODO: for devmode only
    return next(action);
  };
};

// Configure data persisting
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export let store = createStore(persistedReducer, {}, applyMiddleware(thunk));

export let persistor = persistStore(store);
