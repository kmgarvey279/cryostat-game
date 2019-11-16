import React from 'react';
import PropTypes from 'prop-types';
import './Speaker.css';

function Speaker(props){
  let color;
  if (props.speaker === 'Strange Voice'){
    color = 'ghost-speaker';
  } else if (props.speaker === 'Confused Girl' || props.speaker === 'Aurora' || props.speaker === 'Claire'){
    color = 'claire-speaker';
  };
  return (
    <div className={color}>
      <span id="speaker-text">{props.speaker}</span>
    </div>
  )
}

Speaker.propTypes = {
  speaker: PropTypes.string
};

export default Speaker;
