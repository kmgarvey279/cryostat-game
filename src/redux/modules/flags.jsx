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
  'bootUp1': {triggered: false},
  'clone': {triggered: false},
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
