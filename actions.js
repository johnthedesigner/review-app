import axios from "axios";
import { AsyncStorage } from "react-native";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOG_OUT,
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
  console.log("session", session);
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
      // await AsyncStorage.setItem("storedSession", JSON.stringify(success.data));
      dispatch(loginSuccess(success.data));
      return success;
    } catch (error) {
      console.log("try login", error);
      dispatch(loginError(error));
      return error;
    }
  };
}

export function logOut() {
  return {
    type: LOG_OUT
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
      history.push("/login");
      return success;
    } catch (error) {
      console.log("try sign up", error);
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
          params: {
            access_token: session.id,
            filter: { include: ["thing", "reviewer"] }
          }
        }
      );
      dispatch(receiveFeed(success.data));
      return success;
    } catch (error) {
      console.log("request feed", error);
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
      return error;
    }
  };
}

export function postReview(review, session, history) {
  return async dispatch => {
    try {
      let success = await axios.post(
        `https://review-api.herokuapp.com/api/reviews/?access_token=${
          session.id
        }`,
        review
      );
      history.push(`/reviews/${success.data.id}`);
      return success;
    } catch (error) {
      console.log("post review", error);
      return error;
    }
  };
}

export function postThing(thing, session, history) {
  return async dispatch => {
    try {
      let success = await axios.post(
        `https://review-api.herokuapp.com/api/things/?access_token=${
          session.id
        }`,
        thing
      );
      history.push(`/things/${success.data.id}`);
      return success;
    } catch (error) {
      console.log("post thing", error);
      return error;
    }
  };
}
