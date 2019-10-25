import React from 'react';
import PropTypes from 'prop-types';
import alert from '../../assets/images/room/alert.png';
import player from '../../assets/images/player/player-icon.png';
import { connect } from 'react-redux';
import './MapRoom.css';

function MapRoom(props){
  let destination;
  if(props.destination === props.roomId) {
    destination = <img id="objective" src={alert} weight="50" height="50" />
  };
  let doors; 
    if(props.roomId === 1) {
      doors = <div>
        <div id='door1' className='standard-door'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4'></div>
      </div>
    } else if (props.roomId === 2) {
      doors = <div>
        <div id='door1' className='standard-door'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4' className='standard-door'></div>
      </div>
    } else if (props.roomId === 3) {
      doors = <div>
        <div id='door1' className='standard-door'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4'></div>
      </div>
    } else if (props.roomId === 5) {
      doors = <div>
        <div id='door1' className='keycard1-door'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4'></div>
      </div>
    } else if (props.roomId === 6) {
      doors = <div>
        <div id='door1' className='standard-door'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4'></div>
      </div>
    } else if (props.roomId === 7) {
      doors = <div>
        <div id='door1'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4' className='keycard2-door'></div>
      </div>
    } else if (props.roomId === 8) {
      doors = <div>
        <div id='door1' className='standard-door'></div>
        <div id='door2'></div>
        <div id='door3'></div>
        <div id='door4'></div>
      </div>
    };

  if (props.current === props.roomId && props.roomId === props.destination) {
    return (
      <div id="current">
        {doors}
        <img id="player-icon-with-objective" src={player} weight="50" height="50" />
        <img id="objective-with-player" src={alert} weight="50" height="50" />
      </div>
    )
  } else if (props.roomId < 0) {
    return (
      <div id="empty">
      </div>
    )
  } else if (props.current == props.roomId) {
    return (
      <div id="current">
        {doors}
        {destination}
        <img id="player-icon" src={player} weight="50" height="50" />
      </div>
    )
  } else if (props.visited == true) {
    return (
      <div id="visited">
        {doors}
        {destination}
      </div>
    )
  } else {
    return (
      <div id="unvisited">
        {doors}
        {destination}
      </div>
    )
  }
}

MapRoom.propTypes = {
  roomId: PropTypes.number.isRequired,
  visited: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  destination: PropTypes.number.isRequired
};

export default MapRoom;
