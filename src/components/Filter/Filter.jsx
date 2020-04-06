import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

function Filter(props){
  if (props.branch == 3) {
      return (
        <div id="spooky">
          <div id="spookyAnimate">
          </div>
        </div>
      )
  } else if (props.filter === 'core') {
    return (
      <div id="fire">
      </div>
    );
  } else if (props.filter === 'powerOff') { 
    return (
      <div id="powerOff">
      </div>
    );
  } else {
    return null;
  }
}


Filter.propTypes = {
  branch: PropTypes.number,
  filter: PropTypes.string
};

export default Filter;