import React from 'react';

//Constants
export const CREATE_NPC = "CREATE_NPC";
export const UPDATE_NPC_LOCATION = "UPDATE_NPC_LOCATION";
export const UPDATE_NPC_DIRECTION = "UPDATE_NPC_DIRECTION";
export const UPDATE_NPC_TEXT = "UPDATE_NPC_TEXT";
export const NULL_NPCS = "NULL_NPCS";

//Action Creators
export function createNPC(kind, location, direction, text) {
  return {
    type: CREATE_NPC,
    kind: kind,
    location: location, 
    direction: direction,
    text: text
  }
}

export function updateNPCLocation(location) {
    return {
        type: UPDATE_NPC_LOCATION,
        location: location
    }
}

export function updateNPCDirection(direction) {
    return {
        type: UPDATE_NPC_DIRECTION,
        direction: direction
    }
}

export function updateNPCText(text) {
    return {
      type: UPDATE_NPC_TEXT,
      text: text
    }
  }

export function nullNPCs() {
    return {
        type: NULL_NPCS
      }
}

//Initial State
const initialState = {
  kind: '',
  location: '',
  direction: '',
  text: ''
};

//Reducer
const npcsReducer = (state = initialState, action) => {
  const { kind, location, direction, text } = action;
  let newState;
  switch (action.type) {
    case CREATE_NPC:
        newState = Object.assign({}, state, {
            kind: kind,
            location: location,
            direction: direction,
            text: text
        });
        return newState;
    case UPDATE_NPC_LOCATION:
        newState = Object.assign({}, state, {
            location: location
        });
        return newState;
    case UPDATE_NPC_DIRECTION:
        newState = Object.assign({}, state, {
            direction: direction
        });
        return newState;
    case UPDATE_NPC_TEXT:
        newState = Object.assign({}, state, {
            direction: direction
        });
        return newState;
    case NULL_NPCS:
        return {};
  default:
    return state;
  }
};

export default npcsReducer;