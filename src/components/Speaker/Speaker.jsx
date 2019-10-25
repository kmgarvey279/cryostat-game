import React from 'react';
import PropTypes from 'prop-types';
import './Speaker.css';

function Speaker(props){
  return (
    <div id="speaker">
      <span id="speaker-text">{props.speaker}</span>
    </div>
  )
}

Speaker.propTypes = {
  speaker: PropTypes.string
};

export default Speaker;
