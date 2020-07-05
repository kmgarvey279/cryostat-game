import React from 'react';
import PropTypes from 'prop-types';
import './PopUp.css';

function PopUp(props){
    let message;
    let thisClass = 'normal';
    if (props.popUp === 1) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">W</span> <span className="popup-button-prompt">A</span> <span className="popup-button-prompt">S</span> <span className="popup-button-prompt">D</span> to move.</span>
    } else if (props.popUp === 2) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">&larr;</span> <span className="popup-button-prompt">&uarr;</span> <span className="popup-button-prompt">&rarr;</span> <span className="popup-button-prompt">&darr;</span> to fire selected weapon.</span>
    } else if (props.popUp === 3) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">Q</span> to switch weapons.</span>
    } else if (props.popUp === 4) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">Enter</span> to view the map.</span>
    } else if (props.popUp === 5) {
        message = <span id="popup-text">Level 1 Security Access Required</span>
        thisClass = 'key1';
    } else if (props.popUp === 6) {
        message = <span id="popup-text">Level 2 Security Access Required</span>
        thisClass = 'key2'
    } else if (props.popUp === 7) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">Shift L</span> to activate a selected ability.</span>
    } else if (props.popUp === 8) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">E</span> to switch selected ability.</span>
    } else if (props.popUp === 9) {
        message = <span id="popup-text">Hold <span className="popup-button-prompt">Shift L</span> and use the arrow keys to dash.</span>
    } else if (props.popUp === 10) {
        message = <span id="popup-text">Use <span className="popup-button-prompt">Space</span> to interact with objects.</span>
    }

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