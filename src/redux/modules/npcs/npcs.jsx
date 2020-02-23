import React from 'react';

//Constants
export const CREATE_NPC = "CREATE_NPC";
export const UPDATE_NPC_LOCATION = "UPDATE_NPC_LOCATION";
export const UPDATE_NPC_DIRECTION = "UPDATE_NPC_DIRECTION";
export const UPDATE_NPC_STATUS = "UPDATE_NPC_STATUS";
export const UPDATE_NPC_TEXT = "UPDATE_NPC_TEXT";
export const NULL_NPCS = "NULL_NPCS";

//Action Creators
export function createNPC(kind, location, direction, status, text) {
  return {
    type: CREATE_NPC,
    kind: kind,
    location: location, 
    direction: direction,
    status: status,
    text: text
  }
}

export function updateNPCLocation(kind, location) {
    return {
        type: UPDATE_NPC_LOCATION,
        kind: kind,
        location: location
    }
}

export function updateNPCDirection(kind, direction) {
    return {
        type: UPDATE_NPC_DIRECTION,
        kind: kind,
        direction: direction
    }
}

export function updateNPCStatus(kind, status) {
  return {
      type: UPDATE_NPC_STATUS,
      kind: kind,
      status: status
  }
}

export function updateNPCText(kind, text) {
    return {
      type: UPDATE_NPC_TEXT,
      kind: kind,
      text: text
    }
  }

export function nullNPCs() {
    return {
        type: NULL_NPCS
      }
}

//Initial State

//Reducer
const npcsReducer = (state = {}, action) => {
  const { kind, location, direction, status, text } = action;
  let newNPC;
  let newState;
  switch (action.type) {
    case CREATE_NPC:
        newState = Object.assign({}, state, {
          [kind]: {
            kind: kind,
            location: location,
            direction: direction,
            status: status,
            text: text
          }
        });
        return newState;
    case UPDATE_NPC_LOCATION:
        newNPC = Object.assign({}, state[kind], {location});
        newState = Object.assign({}, state, {
            [kind]: newNPC
        });
        return newState;
    case UPDATE_NPC_DIRECTION:
        newNPC = Object.assign({}, state[kind], {direction});
        newState = Object.assign({}, state, {
            [kind]: newNPC
        });
        return newState;
    case UPDATE_NPC_STATUS:
      newNPC = Object.assign({}, state[kind], {status});
      newState = Object.assign({}, state, {
            [kind]: newNPC
      });
      return newState;
    case UPDATE_NPC_TEXT:
        newNPC = Object.assign({}, state[kind], {text});
        newState = Object.assign({}, state, {
            [kind]: newNPC
        });
        return newState;
    case NULL_NPCS:
        return {};
  default:
    return state;
  }
};

export default npcsReducer;