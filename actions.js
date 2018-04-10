import axios from "axios";
import { AsyncStorage } from "react-native";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOG_OUT,
  RECEIVE_CATEGORIES,
  RECEIVE_FEED,
  RECEIVE_MY_REVIEWS,
  RECEIVE_REVIEW,
  RECEIVE_THING,
  RECEIVE_THINGS,
  RECEIVE_USER,
  TEST_ACTION
} from "./constants";

const APIRoot = "https://review-api.herokuapp.com/api";

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
      let success = await axios.post(`${APIRoot}/reviewers/login`, credentials);
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
      let success = await axios.post(`${APIRoot}/reviewers`, credentials);
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
      let success = await axios.get(`${APIRoot}/reviewers/${session.userId}`, {
        params: { access_token: session.id }
      });
      dispatch(receiveUser(success.data));
      return success;
    } catch (error) {
      console.log("request user data", error);
      return error;
    }
  };
}

export function updateUserData(user, session) {
  console.log(session);
  console.log(...user);
  return async dispatch => {
    try {
      let success = await axios.put(
        `${APIRoot}/reviewers/${session.userId}?access_token=${session.id}`,
        user
      );
      console.log(success.data);
      dispatch(receiveUser(success.data));
      return success;
    } catch (error) {
      console.log("update user data", error);
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
      let success = await axios.get(`${APIRoot}/reviews/`, {
        params: {
          access_token: session.id,
          filter: { include: ["thing", "reviewer"] }
        }
      });
      dispatch(receiveFeed(success.data));
      return success;
    } catch (error) {
      console.log("request feed", error);
      return error;
    }
  };
}

export function receiveMyReviews(reviews) {
  return {
    type: RECEIVE_MY_REVIEWS,
    reviews
  };
}

export function requestMyReviews(session) {
  return async dispatch => {
    try {
      let success = await axios.get(`${APIRoot}/reviews/`, {
        params: {
          access_token: session.id,
          filter: {
            include: ["thing", "reviewer"],
            where: { reviewerId: session.userId }
          }
        }
      });
      dispatch(receiveMyReviews(success.data));
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
      let success = await axios.get(`${APIRoot}/things`, {
        params: { access_token: session.id, filter: { include: "category" } }
      });
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
      let success = await axios.get(`${APIRoot}/reviews/${reviewId}`, {
        params: { access_token: session.id, filter: { include: "thing" } }
      });
      dispatch(receiveReview(success.data));
      return success;
    } catch (error) {
      console.log("request review", error);
      return error;
    }
  };
}

export function receiveThing(thing) {
  console.log(thing);
  return {
    type: RECEIVE_THING,
    thing
  };
}

export function requestThing(thingId, session) {
  return async dispatch => {
    try {
      let success = await axios.get(`${APIRoot}/things/${thingId}`, {
        params: {
          access_token: session.id
        }
      });
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
        `${APIRoot}/reviews/?access_token=${session.id}`,
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
        `${APIRoot}/things/?access_token=${session.id}`,
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

export function postCategory(category, session, history) {
  return async dispatch => {
    try {
      let success = await axios.post(
        `${APIRoot}/categories/?access_token=${session.id}`,
        category
      );
      history.push("/things");
      return success;
    } catch (error) {
      console.log("post thing", error);
      return error;
    }
  };
}

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  };
}

export function requestCategories(session) {
  return async dispatch => {
    try {
      let success = await axios.get(`${APIRoot}/categories`, {
        params: { access_token: session.id }
      });
      dispatch(receiveCategories(success.data));
      return success;
    } catch (error) {
      console.log("request categories", error);
      return error;
    }
  };
}
