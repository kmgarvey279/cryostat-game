import React from 'react';
import PropTypes from 'prop-types';
import './PopUp.css';

function PopUp(props){
    let message;
    let thisClass = 'normal';
    if (props.popUp === 1) {
        message = <span id="popup-text">Press <span className="button-prompt">Space</span> to examine</span>
    } else if (props.popUp === 2) {
        message = <span id="popup-text"> Press <span className="button-prompt">Z</span> to fire selected weapon</span>
    } else if (props.popUp === 3) {
        message = <span id="popup-text"> Press <span className="button-prompt">A</span> to switch weapons</span>
    } else if (props.popUp === 4) {
        message = <span id="popup-text"> Press <span className="button-prompt">Enter</span> to view the map</span>
    } else if (props.popUp === 5) {
        message = <span id="popup-text">Level 1 Security Access Required</span>
        thisClass = 'key1';
    } else if (props.popUp === 6) {
        message = <span id="popup-text">Level 2 Security Access Required</span>
        thisClass = 'key2'
    } else if (props.popUp === 7) {
        message = <span id="popup-text"> Press <span className="button-prompt">S</span> to use selected skill</span>
    } else if (props.popUp === 8) {
        message = <span id="popup-text"> Press <span className="button-prompt">X</span> to switch skills</span>
    };

    if (props.popUp !== null){
        return (
            <div id="popup-wrap">
                <div id="popup-content" className={thisClass}>{message}</div>
            </div>
        );
    } else {
        return null
    };
}

PopUp.propTypes = {
  popUp: PropTypes.number
};

export default PopUp;