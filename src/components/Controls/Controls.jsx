import React from 'react';
import './Controls.css';

function Controls(props){
  return (
    <div className="controls">
        <h3>Controls</h3>
        <ul className="control-list">
            <li><span className="popup-button-prompt">W</span> <span className="popup-button-prompt">A</span> <span className="popup-button-prompt">S</span> <span className="popup-button-prompt">D</span> <span className="control-text">move</span></li>
            <li><span className="popup-button-prompt">&larr;</span> <span className="popup-button-prompt">&uarr;</span> <span className="popup-button-prompt">&rarr;</span> <span className="popup-button-prompt">&darr;</span> <span className="control-text">fire selected weapon/change direction</span></li>
            <li><span className="popup-button-prompt">Shift</span> <span className="control-text">use selected ability</span></li>
            <li><span className="popup-button-prompt">Q</span> <span className="control-text">switch weapons</span></li>
            <li><span className="popup-button-prompt">E</span> <span className="control-text">switch skills</span></li>
            <li><span className="popup-button-prompt">Space</span> <span className="control-text">interact/advance text</span></li>
            <li><span className="popup-button-prompt">Enter</span> <span className="control-text">open/close menu</span></li>
        </ul>
    </div>
  )
}


export default Controls;