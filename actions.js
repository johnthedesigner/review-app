import { TEST_ACTION } from "./constants";

export function testAction(payload) {
  return {
    type: TEST_ACTION,
    payload
  };
}
