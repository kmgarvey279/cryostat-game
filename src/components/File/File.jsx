import React from 'react';
import PropTypes from 'prop-types';
import './File.css';
import * as text from '../../redux/modules/text/textConstants';
import playerImage from '../../assets/images/player/playerImage.png';
import playerSilhouette from '../../assets/images/player/playerSilhouette.png';
function File(props){
  let fileInfo;
  let branch;
  if(props.saves[props.number].game.displayBranch === true){
    if(props.saves[props.number].game.branch === 1){
      branch = <span className="file-branch">Branch: &Alpha;</span>
    } else if (props.saves[props.number].game.branch === 2){
      branch = <span className="file-branch">Branch: &Beta;</span>
    } else if (props.saves[props.number].game.branch === 3){
      branch = <span className="file-branch">Branch: &Theta;</span> 
    }
  }
  let branchSpecial1;
  let branchSpecial2;
  if(props.game.branch === 1) {
    branchSpecial1 = <span className="file-branch">Branch: &Alpha;</span>
    branchSpecial2 = <span className="file-branch">Branch: &Beta;</span>
  } else if (props.game.branch === 2) {
    branchSpecial1 = <span className="file-branch">Branch: &Beta;</span>
    branchSpecial2 = <span className="file-branch">Branch: &Alpha;</span>
  }
  if(props.relation == 'normal') {
    if(props.saves[props.number].fileStatus === 'empty') {
      fileInfo = 
      <div>
        <span id="file-num">File {props.number}</span> - New Game
      </div>;
    } else {
      fileInfo = 
      <div>
        <span id="file-num">File {props.number}</span> - {props.name} <br/> Cryonics Storage Facility: {text.roomNames[props.saves[props.number].game.roomId - 1]}
        <br/>{branch}
        <img className="file-player" src={playerImage} width="80" height="80"/>
      </div>;
    };
  } else if (props.relation == 'current') {
    fileInfo = 
    <div>
      <span id="file-num">File {props.number}</span> - <br/> Cryonics Storage Facility: {text.roomNames[3]}
      <br/>{branchSpecial1}
      <img className="file-player" src={playerSilhouette} width="80" height="80"/>
    </div>
  } else if (props.relation == 'new') {
    fileInfo = 
    <div>
      <span id="file-num">File {props.number}</span> - {props.name} <br/> Cryonics Storage Facility: {text.roomNames[3]}
      <br/>{branchSpecial2}
      <img className="file-player" src={playerImage} width="80" height="80"/>
    </div>;
  } else if (props.relation == 'null') {
    fileInfo = 
    <div>
      <span id="file-num">File {props.number}</span> - New Game
    </div>;
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
  