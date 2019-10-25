//Constants
export const SAVE_GAME = "SAVE_GAME";
export const LOAD_GAME = "LOAD_GAME";
export const COPY_GAME = "COPY_GAME";
export const ERASE_GAME = "ERASE_GAME";
export const CHANGE_STATUS = "CHANGE_STATUS";

//Action Creators
export function saveGame(file, player, flags, game, maps, doors) {
  return {
    type: SAVE_GAME,
    file: file,
    player: player,
    flags: flags,
    game: game,
    maps: maps,
    doors: doors
  }
};
export function copyGame(file, fileToCopy) {
  console.log(file)
  console.log(fileToCopy)
  return {
    type: COPY_GAME,
    file: file,
    fileToCopy: fileToCopy 
  }
};
export function eraseGame(file) {
    return {
        type: ERASE_GAME,
        file: file
    }
};

export function loadGame(file) {
    return {
        type: LOAD_GAME,
        file: file
    }
};

export function changeStatus(file, fileStatus) {
  return {
    type: CHANGE_STATUS,
    file: file,
    fileStatus: fileStatus
  }
}

//Initial State
const initialState = {
  1: {
    id: 1,
    fileStatus: "empty",
    player: {},
    flags: {},
    game: {},
    maps: {},
    doors: {},
  },
  2: {
    id: 2,
    fileStatus: "empty",
    player: {},
    flags: {},
    game: {},
    maps: {},
    doors: {}
  },
  3: {
    id: 3,
    fileStatus: "empty",
    player: {},
    flags: {},
    game: {},
    maps: {},
    doors: {}
  }
};

//Reducer
const savesReducer = (state = initialState, action) => {
  let newFile;  
  let newState;
  const { file, fileToCopy, player, flags, game, maps, doors, fileStatus} = action;
  switch (action.type) {
    case SAVE_GAME:
        newFile = Object.assign({}, state[file], {player, flags, game, maps, doors});
        newState = Object.assign({}, state, {
          [file]: newFile
        });
        return newState;
    case ERASE_GAME:
        newState = Object.assign({}, state, {
            [file]: {
              id: file,
              fileStatus: "empty",
              player: {},
              flags: {},
              game: {},
              maps: {},
              doors: {}
            }
        });
        return newState;
    case COPY_GAME:
        newState = Object.assign({}, state, {
            [file]: fileToCopy
        });
        return newState;
    case CHANGE_STATUS:
        newFile = Object.assign({}, state[file], {fileStatus})
        newState = Object.assign({}, state, {
            [file]: newFile
        });
        return newState;
  default:
    return state;
  }
};

export default savesReducer;