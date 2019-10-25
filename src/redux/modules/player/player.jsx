import React from 'react';

//Constants
export const UPDATE_PLAYER_NAME = "UPDATE_PLAYER_NAME";
export const UPDATE_PLAYER_HEALTH = "UPDATE_PLAYER_HEALTH";
export const UPDATE_PLAYER_STATUS = "UPDATE_PLAYER_STATUS";
export const UPDATE_PLAYER_LOCATION = "UPDATE_PLAYER_LOCATION";
export const UPDATE_PLAYER_DIRECTION = "UPDATE_PLAYER_DIRECTION";
export const TOGGLE_INVINCIBILITY = "TOGGLE_INVINCIBILITY";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const CHANGE_CURRENT_WEAPON = "CHANGE_CURRENT_WEAPON";
export const ADD_WEAPON_TO_INVENTORY = "ADD_WEAPON_TO_INVENTORY";
export const ADD_ITEM_TO_INVENTORY = "ADD_ITEM_TO_INVENTORY";
export const UPDATE_NEW_ITEM = "UPDATE_NEW_ITEM";
export const LOAD_PLAYER = "LOAD_PLAYER";
export const UPDATE_ENTANGLEMENT = "UPDATE_ENTANGLEMENT";

//Action Creators
export function loadPlayer(playerToLoad) {
  return {
    type: LOAD_PLAYER,
    playerToLoad: playerToLoad
  }
};
export function updatePlayerName(newName) {
  return {
    type: UPDATE_PLAYER_NAME,
    name: newName
  };
}
export function updatePlayerHealth(newHealth) {
  return {
    type: UPDATE_PLAYER_HEALTH,
    health: newHealth
  };
}
export function updatePlayerLocation(newLocation) {
  return {
    type: UPDATE_PLAYER_LOCATION,
    location: newLocation
  };
}
export function updatePlayerDirection(newDirection) {
  return {
    type: UPDATE_PLAYER_DIRECTION,
    direction: newDirection
  };
}
export function updateScore(newScore) {
  return {
    type: UPDATE_SCORE,
    score: newScore
  };
}
export function changeCurrentWeapon(newWeaponId) {
  return {
    type: CHANGE_CURRENT_WEAPON,
    currentWeapon: newWeaponId
  };
}
export function updatePlayerStatus(status) {
  return {
    type: UPDATE_PLAYER_STATUS,
    status: status
  };
}
export function addWeaponToInventory(weapons) {
  return {
    type: ADD_WEAPON_TO_INVENTORY,
    weapons: weapons
  };
}
export function addItemToInventory(items) {
  return {
    type: ADD_ITEM_TO_INVENTORY,
    items: items
  };
}
export function updateNewItem(newItem){
  return {
    type: UPDATE_NEW_ITEM,
    newItem: newItem
  }
}

export function updateEntanglement(entanglement){
  return {
    type: UPDATE_ENTANGLEMENT,
    entanglement: entanglement
  }
}


//Initial State
const initialState = {
    name: '???',
    health: 50,
    entanglement: 0,
    magic: 0,
    status: 'normal',
    score: 0,
    direction: 'north',
    location: null,
    currentWeapon: null,
    weapons: [],
    items: [],
    newItem: null
  };

//Reducer
export default function playerReducer(state = initialState, action){
  let newState;
  const { playerToLoad, name, health, location, direction, score, currentWeapon, status, weapons, items, newItem, entanglement } = action;

  switch (action.type) {
    case LOAD_PLAYER:
      return playerToLoad;
    case UPDATE_PLAYER_NAME:
      newState = Object.assign({}, state, {
        name: name
      });
      return newState;
    case UPDATE_PLAYER_HEALTH:
        newState = Object.assign({}, state, {
          health: health
        });
        return newState;
    case UPDATE_PLAYER_LOCATION:
        newState = Object.assign({}, state, {
          location: location
        });
        return newState;
    case UPDATE_PLAYER_DIRECTION:
        newState = Object.assign({}, state, {
          direction: direction
        });
        return newState;
    case UPDATE_SCORE:
      newState = Object.assign({}, state, {
        score: score
      });
      return newState;
    case CHANGE_CURRENT_WEAPON:
      newState = Object.assign({}, state, {
        currentWeapon: currentWeapon
      });
      return newState;
    case ADD_WEAPON_TO_INVENTORY:
      newState = Object.assign({}, state, {
        weapons: weapons
      });
      return newState;
    case ADD_ITEM_TO_INVENTORY:
      newState = Object.assign({}, state, {
        items: items
      });
      return newState;
    case UPDATE_PLAYER_STATUS:
      newState = Object.assign({}, state, {
        status: status
      });
      return newState;
    case UPDATE_NEW_ITEM:
      newState = Object.assign({}, state, {
        newItem: newItem
      });
      return newState;
    case UPDATE_ENTANGLEMENT:
      newState = Object.assign({}, state, {
        entanglement: entanglement
      });
      return newState;
    default:
        return state;
      }
    };
