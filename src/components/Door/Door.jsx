import * as roomConsts from '../../redux/modules/rooms/roomConstants';
import React from 'react';
import PropTypes from 'prop-types';
import './Door.css';
import doorReducer from '../../redux/modules/doors';

function Door(props){
  let doorArr = props.content.find(function(content) {
    return content[0] == 'door';
  });
  let door = props.doors[doorArr[1]];
  if (door.direction == 'north') {
    if (door.isLocked === true) {
      return (
        <div id="doorNorth">
          {roomConsts.sprites['lockedDoorNorth']}
        </div>
      )
    } else if (door.status == 'closing') {
      return (
        <div id="doorNorth">
          {roomConsts.sprites['closingDoorNorth']}
        </div>
      )
    } else if (door.status == 'closed') {
      return (
        <div id="doorNorth">
          {roomConsts.sprites['unlockedDoorNorth']}
        </div>
      )
    } else if (door.status == 'opening'){
      return (
        <div id="doorNorth">
          {roomConsts.sprites['openingDoorNorth']}
        </div>
      )
    } else if (door.status == 'open'){
      return (
        <div id="doorNorth">
        </div>
      )
    }
  } else if (door.direction == 'east') {
    if (door.isLocked === true) {
      return (
        <div id="doorEast">
          {roomConsts.sprites['lockedDoorEast']}
        </div>
      )
    } else if (door.status == 'closing') {
      return (
        <div id="doorEast">
          {roomConsts.sprites['closingDoorEast']}
        </div>
      )
    } else if (door.status == 'closed') {
      return (
        <div id="doorEast">
          {roomConsts.sprites['unlockedDoorEast']}
        </div>
      )
    } else if (door.status == 'opening'){
      return (
        <div id="doorEast">
          {roomConsts.sprites['openingDoorEast']}
        </div>
      )
    } else if (door.status == 'open'){
      return (
        <div id="doorEast">
        </div>
      )
    }
  } else if (door.direction == 'south') {
    if(door.isLocked === 'keyCard1') {
      if(door.status === 'closed') {
        return (
          <div id="doorSouth">
            {roomConsts.sprites['unlockedDoorSouthKey1']}
          </div>
        )
      } else if (door.status === 'opening') {
        return (
          <div id="doorSouth">
            {roomConsts.sprites['openingDoorSouthKey1']}
          </div>
        )
      } else if (door.status === 'closing') {
        return (
          <div id="doorSouth">
            {roomConsts.sprites['closingDoorSouthKey1']}
          </div>
        )
      } else if (door.status === 'open') {
        return (
          <div id="doorSouth">
          </div>
        )
      }; 
    } else if (door.isLocked === true) {
      return (
        <div id="doorSouth">
          {roomConsts.sprites['lockedDoorSouth']}
        </div>
      )
    } else if (door.status == 'closing') {
      return (
        <div id="doorSouth">
          {roomConsts.sprites['closingDoorSouth']}
        </div>
      )
    } else if (door.status == 'closed') {
      return (
        <div id="doorSouth">
          {roomConsts.sprites['unlockedDoorSouth']}
        </div>
      )
    } else if (door.status == 'opening'){
      return (
        <div id="doorSouth">
          {roomConsts.sprites['openingDoorSouth']}
        </div>
      )
    } else if (door.status == 'open'){
      return (
        <div id="doorSouth">
        </div>
      )
    };
  } else if (door.direction == 'west') {
    if(door.isLocked === 'keyCard2') {
      if(door.status === 'closed') {
        return (
          <div id="doorWest">
            {roomConsts.sprites['unlockedDoorWestKey2']}
          </div>
        )
      } else if (door.status === 'opening') {
        return (
          <div id="doorWest">
            {roomConsts.sprites['openingDoorWestKey2']}
          </div>
        )
      } else if (door.status === 'closing') {
        return (
          <div id="doorWest">
            {roomConsts.sprites['closingDoorWestKey2']}
          </div>
        )
      } else if (door.status === 'open') {
        return (
          <div id="doorWest">
          </div>
        )
      };
    } else if (door.isLocked === true) {
      return (
        <div id="doorWest">
          {roomConsts.sprites['lockedDoorWest']}
        </div>
      )
    } else if (door.status == 'closing') {
      return (
        <div id="doorWest">
          {roomConsts.sprites['closingDoorWest']}
        </div>
      )
    } else if (door.status == 'closed') {
      return (
        <div id="doorWest">
          {roomConsts.sprites['unlockedDoorWest']}
        </div>
      )
    } else if (door.status == 'opening'){
      return (
        <div id="doorWest">
          {roomConsts.sprites['openingDoorWest']}
        </div>
      )
    } else if (door.status == 'open'){
      return (
        <div id="doorWest">
        </div>
      )
    }
  }
}

Door.propTypes = {
  content: PropTypes.array,
  doors: PropTypes.object
};

export default Door;
