import React from 'react';

//Constants
export const SET_ROOMID = "SET_ROOMID";
export const SET_PREVIOUS_ROOMID = "SET_PREVIOUS_ROOMID";
export const CHANGE_GAMESTATE = "CHANGE_GAMESTATE";
export const SET_RESPAWNPOINT = "SET_RESPAWNPOINT";
export const TOGGLE_WEST = "TOGGLE_WEST";
export const TOGGLE_EAST = "TOGGLE_EAST";
export const TOGGLE_NORTH = "TOGGLE_NORTH";
export const TOGGLE_SOUTH = "TOGGLE_SOUTH";
export const TOGGLE_FIRE = "TOGGLE_FIRE";
export const UPDATE_TIMERS = "UPDATE_TIMERS";
export const CLEAR_TIMERS = "CLEAR_TIMERS";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const LOAD_GAME = "LOAD_GAME";
export const SET_FILE = "SET_FILE";
export const SET_BRANCH = "SET_BRANCH";
export const SET_EYE = "SET_EYE";
export const CHANGE_DESTINATION = "CHANGE_DESTINATION";


//Action Creators
export function loadGame(gameToLoad) {
  return {
    type: LOAD_GAME,
    gameToLoad: gameToLoad
  }
};
export function changeGameState(newGameState) {
  return {
    type: CHANGE_GAMESTATE,
    gameState: newGameState
  };
};
export function setRoomId(newRoomId) {
  return {
    type: SET_ROOMID,
    roomId: newRoomId
  };
};
export function setPreviousRoomId(newPreviousRoomId) {
  return {
    type: SET_PREVIOUS_ROOMID,
    previousRoomId: newPreviousRoomId
  };
};

export function setRespawnPoint(newRespawnPoint) {
  return {
    type: SET_RESPAWNPOINT,
    respawnPoint: newRespawnPoint
  }
};

export function toggleNorth(newBool) {
  return {
    type: TOGGLE_NORTH,
    north: newBool
  }
};

export function toggleEast(newBool) {
  return {
    type: TOGGLE_EAST,
    east: newBool
  }
};

export function toggleWest(newBool) {
  return {
    type: TOGGLE_WEST,
    west: newBool
  }
};

export function toggleSouth(newBool) {
  return {
    type: TOGGLE_SOUTH,
    south: newBool
  }
};

export function toggleFire(newBool) {
  return {
    type: TOGGLE_FIRE,
    fire: newBool
  }
};

  export function updateTimers(newTimerArr) {
    return {
      type: UPDATE_TIMERS,
      timers: newTimerArr
    }
  };
  
  export function updateFilter(newFilter) {
    return {
      type: UPDATE_FILTER,
      filter: newFilter
    }
  };

  export function clearTimers() {
    return {
      type: CLEAR_TIMERS,
      timers: [],
    }
  };

  export function setFile(file) {
    return {
      type: SET_FILE,
      file: file
    }
  }

  export function setBranch(branch) {
    return {
      type: SET_BRANCH,
      branch: branch
    }
  }

  export function setEye(eyeState) {
    return {
      type: SET_EYE,
      eye: eyeState
    }
  }

  export function changeDestination(destination) {
    return {
      type: CHANGE_DESTINATION,
      destination: destination
    }
  }

//Initial State
const initialState = {
  branch: 1,
  roomId: 1,
  previousRoomId: null,
  gameState: 'title',
  respawnPoint: '',
  timers: [],
  east: false,
  west: false,
  south: false,
  north: false,
  fire: false,
  filter: 'spooky',
  file: '',
  eye: 'none',
  destination: ''
}

//Reducer
const gameReducer = (state = initialState, action) => {
  let newState;
  const { gameToLoad, gameState, roomId, respawnPoint, previousRoomId, activeText, north, east, west, south, fire, timers, filter, file, branch, eye, destination} = action;
  switch (action.type) {
    case LOAD_GAME:
      return gameToLoad;
    case CHANGE_GAMESTATE:
      newState = Object.assign({}, state, {
        gameState: gameState
      });
      return newState;
    case SET_ROOMID:
      newState = Object.assign({}, state, {
        roomId: roomId
      });
      return newState;
    case SET_PREVIOUS_ROOMID:
      newState = Object.assign({}, state, {
        previousRoomId: previousRoomId
      });
      return newState;
    case SET_RESPAWNPOINT:
      newState = Object.assign({}, state, {
        respawnPoint: respawnPoint
      });
      return newState;
    case TOGGLE_NORTH:
      newState = Object.assign({}, state, {
        north: north
      });
      return newState;
    case TOGGLE_SOUTH:
      newState = Object.assign({}, state, {
        south: south
      });
      return newState;
    case TOGGLE_EAST:
      newState = Object.assign({}, state, {
        east: east
      });
      return newState;
    case TOGGLE_WEST:
      newState = Object.assign({}, state, {
        west: west
      });
      return newState;
    case TOGGLE_FIRE:
      newState = Object.assign({}, state, {
        fire: fire
      });
      return newState;
    case UPDATE_TIMERS:
      newState = Object.assign({}, state, {
        timers: timers
      });
      return newState;
    case CLEAR_TIMERS:
      newState = Object.assign({}, state, {
        timers: []
      });
      return newState;
    case UPDATE_FILTER:
      newState = Object.assign({}, state, {
        filter: filter
      });
      return newState;
      case UPDATE_FILTER:
    case SET_FILE:
    newState = Object.assign({}, state, {
      file: file
    });
    return newState;
    case SET_BRANCH:
      newState = Object.assign({}, state, {
        branch: branch
      });
      return newState;
    case SET_EYE:
      newState = Object.assign({}, state, {
        eye: eye
      });
      return newState;
    case CHANGE_DESTINATION:
      newState = Object.assign({}, state, {
        destination: destination
      });
        return newState;
  default:
    return state;
  }
};

export default gameReducer;
