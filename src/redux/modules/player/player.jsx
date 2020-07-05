import React from 'react';

//Constants
export const UPDATE_PLAYER_NAME = "UPDATE_PLAYER_NAME";
export const UPDATE_PLAYER_HEALTH = "UPDATE_PLAYER_HEALTH";
export const UPDATE_PLAYER_MAGIC = "UPDATE_PLAYER_MAGIC";
export const UPDATE_PLAYER_STATUS = "UPDATE_PLAYER_STATUS";
export const UPDATE_PLAYER_LOCATION = "UPDATE_PLAYER_LOCATION";
export const UPDATE_PLAYER_DIRECTION = "UPDATE_PLAYER_DIRECTION";
export const CHANGE_CURRENT_WEAPON = "CHANGE_CURRENT_WEAPON";
export const ADD_WEAPON_TO_INVENTORY = "ADD_WEAPON_TO_INVENTORY";
export const CHANGE_CURRENT_SKILL = "CHANGE_CURRENT_SKILL";
export const UPDATE_SKILLS = "UPDATE_SKILLS";
export const ADD_ITEM_TO_INVENTORY = "ADD_ITEM_TO_INVENTORY";
export const UPDATE_NEW_ITEM = "UPDATE_NEW_ITEM";
export const LOAD_PLAYER = "LOAD_PLAYER";
export const UPDATE_ENTANGLEMENT = "UPDATE_ENTANGLEMENT";
export const UPDATE_CLONE = "UPDATE_CLONE";
export const SWITCH_ACTIVE_CLONE = "SWITCH_ACTIVE_CLONE";
export const GET_MAP = "GET_MAP";
export const UPGRADE_CRYOSTAT = "UPGRADE_CRYOSTAT";

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
export function updatePlayerMagic(newMagic) {
  return {
    type: UPDATE_PLAYER_MAGIC,
    magic: newMagic
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
export function changeCurrentWeapon(newWeaponId) {
  return {
    type: CHANGE_CURRENT_WEAPON,
    currentWeapon: newWeaponId
  };
}
export function changeCurrentSkill(newSkillId) {
  return {
    type: CHANGE_CURRENT_SKILL,
    currentSkill: newSkillId
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
export function updateSkills(skills) {
  return {
    type: UPDATE_SKILLS,
    skills: skills
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

export function updateClone(cloneLocation, cloneDirection){
  return {
    type: UPDATE_CLONE,
    cloneLocation: cloneLocation,
    cloneDirection: cloneDirection
  }
}

export function switchActiveClone(activeClone){
  return {
    type: SWITCH_ACTIVE_CLONE,
    activeClone: activeClone
  }
}

export function getMap(){
  return {
    type: GET_MAP
  }
}

export function upgradeCryostat(){
  return {
    type: UPGRADE_CRYOSTAT
  }
}

//Initial State
const initialState = {
    name: 'Claire',
    health: 50,
    entanglement: 0,
    magic: 0,
    status: 'normal',
    direction: 'north',
    location: null,
    currentWeapon: null,
    weapons: [],
    currentSkill: null,
    skills: [],
    items: [],
    newItem: null,
    cloneLocation: null,
    cloneDirection: null,
    activeClone: 1,
    hasMap: false,
    cryostatUpgrade: false
  };

//Reducer
export default function playerReducer(state = initialState, action){
  let newState;
  const { playerToLoad, name, health, magic, location, direction, currentWeapon, currentSkill, status, weapons, skills, items, newItem, entanglement, cloneLocation, cloneDirection, activeClone } = action;

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
    case UPDATE_PLAYER_MAGIC:
      newState = Object.assign({}, state, {
        magic: magic
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
    case CHANGE_CURRENT_WEAPON:
      newState = Object.assign({}, state, {
        currentWeapon: currentWeapon
      });
      return newState;
    case CHANGE_CURRENT_SKILL:
      newState = Object.assign({}, state, {
        currentSkill: currentSkill
      });
      return newState;
    case ADD_WEAPON_TO_INVENTORY:
      newState = Object.assign({}, state, {
        weapons: weapons
      });
      return newState;
    case UPDATE_SKILLS:
      newState = Object.assign({}, state, {
        skills: skills
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
    case UPDATE_CLONE:
      newState = Object.assign({}, state, {
        cloneLocation: cloneLocation,
        cloneDirection: cloneDirection
      });
      return newState;
    case SWITCH_ACTIVE_CLONE:
      newState = Object.assign({}, state, {
        activeClone: activeClone
      });
      return newState;
    case GET_MAP:
      newState = Object.assign({}, state, {
        hasMap: true
      });
      return newState;
    case UPGRADE_CRYOSTAT:
      newState = Object.assign({}, state, {
        upgradeCryostat: true
      });
      return newState;
    default:
        return state;
      }
    };
