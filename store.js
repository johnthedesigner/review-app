import { createStore } from "redux";

import { TEST_ACTION } from "./constants";
import { testAction } from "./actions";

// Reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_ACTION:
      console.log("test");
      return state;

      DEFAULT: return state;
  }
};

export const store = createStore(reducer); //TODO: Add initial state from local storage
