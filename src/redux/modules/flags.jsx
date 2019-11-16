//Constants
export const TRIGGER_FLAG = "TRIGGER_FLAG";
export const LOAD_FLAGS = "LOAD_FLAGS";

//Action Creators
export function loadFlags(flagsToLoad){
  return {
    type: LOAD_FLAGS,
    flagsToLoad: flagsToLoad
  }
};
export function triggerFlag(flagId) {
  return {
    type: TRIGGER_FLAG,
    flagId: flagId,
    triggered: true
  }
};

//Initial State
const initialState = {
  1: {triggered: false},
  2: {triggered: false},
  3: {triggered: false},
  4: {triggered: false},
  5: {triggered: false},
  6: {triggered: false},
  7: {triggered: false},
  8: {triggered: false},
  9: {triggered: false},
  10: {triggered: false},
  11: {triggered: false},
  12: {triggered: false},
  13: {triggered: false},
  14: {triggered: false},
  15: {triggered: false},
  16: {triggered: false},
  17: {triggered: false},
  18: {triggered: false},
  19: {triggered: false},
  20: {triggered: false}
}

//Reducer
const flagsReducer = (state = initialState, action) => {
  let newState;
  let newFlag;
  const { flagsToLoad, flagId, triggered } = action;

  switch (action.type) {
    case LOAD_FLAGS:
      return flagsToLoad;
    case TRIGGER_FLAG:
      newFlag = Object.assign({}, state[flagId], {triggered});
      newState = Object.assign({}, state, {
        [flagId]: newFlag
      });
      return newState;
  default:
    return state;
  }
};

export default flagsReducer;
