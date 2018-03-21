import axios from "axios";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RECEIVE_USER,
  TEST_ACTION
} from "./constants";

export function testAction(payload) {
  return {
    type: TEST_ACTION,
    payload
  };
}

export function loginSuccess(session) {
  return {
    type: LOGIN_SUCCESS,
    session
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function tryLogin(credentials) {
  return async dispatch => {
    try {
      credentials.ttl = 60 * 60 * 24 * 7 * 4; // 4 weeks in seconds
      let success = await axios.post(
        "https://review-api.herokuapp.com/api/reviewers/login",
        credentials
      );
      dispatch(loginSuccess(success.data));
      dispatch(requestUserData(success.data));
      return success;
    } catch (error) {
      dispatch(loginError(error));
      return error;
    }
  };
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user
  };
}

export function requestUserData(session) {
  return async dispatch => {
    try {
      let success = await axios.get(
        `https://review-api.herokuapp.com/api/reviewers/${session.userId}`,
        { params: { access_token: session.id } }
      );
      dispatch(receiveUser(success.data));
      return success;
    } catch (error) {
      // dispatch(loginError(error));
      return error;
    }
  };
}
