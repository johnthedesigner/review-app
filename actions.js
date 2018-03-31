import axios from "axios";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RECEIVE_FEED,
  RECEIVE_REVIEW,
  RECEIVE_THING,
  RECEIVE_THINGS,
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
      console.log("try login", error);
      dispatch(loginError(error));
      return error;
    }
  };
}

export function signUpSuccess(session) {
  return {
    type: SIGN_UP_SUCCESS,
    session
  };
}

export function signUpError(error) {
  return {
    type: SIGN_UP_ERROR,
    error
  };
}

export function trySignUp(credentials, history) {
  return async dispatch => {
    try {
      credentials.ttl = 60 * 60 * 24 * 7 * 4; // 4 weeks in seconds
      let success = await axios.post(
        "https://review-api.herokuapp.com/api/reviewers",
        credentials
      );
      // dispatch(signUpSuccess(success.data));
      history.push("/login");
      return success;
    } catch (error) {
      console.log("try sign up", error);
      // dispatch(signUpError(error));
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
      console.log("request user data", error);
      // dispatch(loginError(error));
      return error;
    }
  };
}

export function receiveFeed(reviews) {
  return {
    type: RECEIVE_FEED,
    reviews
  };
}

export function requestFeed(session) {
  return async dispatch => {
    try {
      let success = await axios.get(
        "https://review-api.herokuapp.com/api/reviews/",
        {
          params: { access_token: session.id, filter: { include: "thing" } }
        }
      );
      dispatch(receiveFeed(success.data));
      return success;
    } catch (error) {
      console.log("request feed", error);
      // dispatch(requestFeedError(error));
      return error;
    }
  };
}

export function receiveThings(things) {
  return {
    type: RECEIVE_THINGS,
    things
  };
}

export function requestThings(session) {
  return async dispatch => {
    try {
      let success = await axios.get(
        "https://review-api.herokuapp.com/api/things",
        {
          params: { access_token: session.id }
        }
      );
      dispatch(receiveThings(success.data));
      return success;
    } catch (error) {
      console.log("request things", error);
      // dispatch(requestFeedError(error));
      return error;
    }
  };
}

export function receiveReview(review) {
  return {
    type: RECEIVE_REVIEW,
    review
  };
}

export function requestReview(reviewId, session) {
  return async dispatch => {
    try {
      let success = await axios.get(
        `https://review-api.herokuapp.com/api/reviews/${reviewId}`,
        {
          params: { access_token: session.id, filter: { include: "thing" } }
        }
      );
      dispatch(receiveReview(success.data));
      return success;
    } catch (error) {
      console.log("request review", error);
      // dispatch(requestFeedError(error));
      return error;
    }
  };
}

export function receiveThing(thing) {
  return {
    type: RECEIVE_THING,
    thing
  };
}

export function requestThing(thingId, session) {
  return async dispatch => {
    try {
      console.log(`https://review-api.herokuapp.com/api/things/${thingId}`);
      let success = await axios.get(
        `https://review-api.herokuapp.com/api/things/${thingId}`,
        {
          params: { access_token: session.id }
        }
      );
      dispatch(receiveThing(success.data));
      return success;
    } catch (error) {
      console.log("request thing", error);
      // dispatch(requestFeedError(error));
      return error;
    }
  };
}
