import React from 'react';
import PropTypes from 'prop-types';
import './File.css';
import * as text from '../../redux/modules/text/textConstants';

function File(props){
  let fileInfo;
  if(props.relation == 'normal') {
    if(props.saves[props.number].fileStatus === 'empty') {
      fileInfo = <div><span id="file-num">File {props.number}</span> - New Game</div>;
    } else {
      fileInfo = <div><span id="file-num">File {props.number}</span> - {props.name} <br/> Cryonics Storage Facility: {text.roomNames[props.saves[props.number].game.roomId - 1]}</div>;
    };
  } else if (props.relation == 'current') {
    fileInfo = <div><span id="file-num">File {props.number}</span> - <br/> Cryonics Storage Facility: {text.roomNames[3]}</div>
  } else if (props.relation == 'new') {
    fileInfo = <div><span id="file-num">File {props.number}</span> - {props.name} <br/> Cryonics Storage Facility: {text.roomNames[3]}</div>;
  } else if (props.relation == 'null') {
    fileInfo = <div><span id="file-num">File {props.number}</span> - New Game</div>;
  };

    if (props.saves[props.number].fileStatus == 'active' || props.relation == 'next') {
      return (
        <div className='activeFile'>
            {fileInfo}
        </div>
      );
    } else if (props.relation == 'current') {
      return (
        <div className='previousFile'>
            {fileInfo}
        </div>
      );
    } else if (props.saves[props.number].fileStatus == 'empty' || props.relation == 'null') {
        return (
            <div className='undefinedFile'>
                {fileInfo}
            </div>
        );
    } else {
      return (
        <div>
            {fileInfo}
        </div>
    );
    }
  };
  
  File.propTypes = {
    saves: PropTypes.object,
    number: PropTypes.string,
    name: PropTypes.string,
    game: PropTypes.string,
    relation: PropTypes.string
  }
  
  export default File;
  