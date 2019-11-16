
//Constants
export const UPDATE_BOSS_NAME = "UPDATE_BOSS_NAME";
export const UPDATE_BOSS_TITLES = "UPDATE_BOSS_TITLES";
export const UPDATE_BOSS_STATUS = "UPDATE_BOSS_STATUS";
export const UPDATE_BOSS_LOCATION = "UPDATE_ENEMY_LOCATION";
export const UPDATE_BOSS_HEALTH = "UPDATE_ENEMY_HEALTH";
export const UPDATE_TILE_ARRAY = "UPDATE_TILE_ARRAY";
export const UPDATE_BOSS_ATTACK = "UPDATE_BOSS_ATTACK";

//Action Creators
export function updateBossName(newName) {
    return {
      type: UPDATE_BOSS_NAME,
      name: newName,
    }
  }

  export function updateBossTitles(newTitles) {
    return {
      type: UPDATE_BOSS_TITLES,
      titles: newTitles,
    }
  }

export function updateBossLocation(newLocation) {
  return {
    type: UPDATE_BOSS_LOCATION,
    location: newLocation,
  }
}

export function updateBossStatus(newStatus) {
  return {
    type: UPDATE_BOSS_STATUS,
    status: newStatus
  }
}

export function updateBossHealth(newHealth) {
  return {
    type: UPDATE_BOSS_HEALTH,
    health: newHealth
  }
}

export function updateTileArray(newArray) {
    return {
      type: UPDATE_TILE_ARRAY,
      tileArr: newArray
    }
  }

  export function updateBossAttack(attackStatus) {
    return {
      type: UPDATE_BOSS_ATTACK,
      attack: attackStatus
    }
  }
  


//Initial State
const initialState = {
    status: 'none',
    location: 0,
    health: 100,
    tileArr: [45, 46, 58, 59, 71, 72, 84, 85, 97, 98],
    name: '',
    titles: [],
    attack: false
}

//Reducer
const bossReducer = (state = initialState, action) => {
  let newState;
  const { name, titles, status, location, health, tileArr, attack} = action;
  switch (action.type) {
        case UPDATE_BOSS_NAME:
            newState = Object.assign({}, state, {
              name: name
            });
            return newState;
        case UPDATE_BOSS_TITLES:
            newState = Object.assign({}, state, {
                titles: titles
            });
            return newState;
        case UPDATE_BOSS_STATUS:
            newState = Object.assign({}, state, {
              status: status
            });
            return newState;
        case UPDATE_BOSS_LOCATION:
            newState = Object.assign({}, state, {
              location: location,
            });
            return newState;
        case UPDATE_BOSS_HEALTH:
            newState = Object.assign({}, state, {
              health: health
            });
            return newState;
        case UPDATE_TILE_ARRAY:
            newState = Object.assign({}, state, {
                tileArr: tileArr
            });
            return newState;
        case UPDATE_BOSS_ATTACK:
          newState = Object.assign({}, state, {
              attack: attack
          });
          return newState;
        default:
            return state;
          }
        };
    

export default bossReducer;
