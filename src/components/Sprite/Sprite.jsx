import React from 'react';
import PropTypes from 'prop-types';
import './Sprite.css';

function Sprite(props){
  let spriteClass;
  if (props.squareValue == 'boss') {
    spriteClass = 'boss-sprite';
  } else if (props.player.location === props.squareId && props.player.clone !== null) {
    spriteClass = 'split-player';
  } else {
    spriteClass = 'sprite';
  };

  return (
      <div className={spriteClass} id={props.transition}>{props.sprite}</div>
  )
}

Sprite.propTypes = {
  sprite: PropTypes.string,
  squareId: PropTypes.number,
  transition: PropTypes.string,
  squareValue: PropTypes.string,
  player: PropTypes.object
};

export default Sprite;
