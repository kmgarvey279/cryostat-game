import React from 'react';
import PropTypes from 'prop-types';
import File from '../File/File';
import './BranchSelect.css';
import branch from '../../assets/images/menu/branch.png';
import branch1 from '../../assets/images/menu/branch1.png';
import branch2 from '../../assets/images/menu/branch2.png';
import branch3 from '../../assets/images/menu/branch3.png';
import branchExit from '../../assets/images/menu/branch-exit.png';
import branchExit1 from '../../assets/images/menu/branch-exit1.png';
import branchExit2 from '../../assets/images/menu/branch-exit2.png';
import branchExit3 from '../../assets/images/menu/branch-exit3.png';
import connect from '../../assets/images/menu/connect.png';

function BranchSelect(props){
    let fileOne;
    let fileTwo;
    let fileThree;
    let previous;
    if (props.game.file == 1) {
        fileOne = <File number={1} name={props.player.name} saves={props.saves} game={props.game} relation={'current'}/>;
        fileTwo = <File number={2} name={props.player.name} saves={props.saves} game={props.game} relation={'new'}/>;
        fileThree = <File number={3} name={props.player.name} saves={props.saves} game={props.game} relation={'null'}/>;
    } else if (props.game.file == 2) {
        fileOne = <File number={1} name={props.player.name} saves={props.saves} game={props.game} relation={'null'}/>;
        fileTwo = <File number={2} name={props.player.name} saves={props.saves} game={props.game} relation={'current'}/>;
        fileThree = <File number={3} name={props.player.name} saves={props.saves} game={props.game} relation={'new'}/>;
    } else {
        fileOne = <File number={1} name={props.player.name} saves={props.saves} game={props.game} relation={'null'}/>;
        fileTwo = <File number={2} name={props.player.name} saves={props.saves} game={props.game} relation={'new'}/>;
        fileThree = <File number={3} name={props.player.name} saves={props.saves} game={props.game} relation={'current'}/>;
    };

  function isSelected(option) {
    if (props.game.file === option && props.menu.selectedOption == option) {
      return "selectedVoid";
    } else if (props.game.file === option) {
      return "void";
    } else if (props.menu.selectedOption == option) {
      return "selected";
    } 
  }

  let branchEnter;
  let branchEx;
  if (props.game.file == 1) {
    branchEnter = <img id="branch" src={branch1} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit2} width="500" height="300"/>;
  } else if(props.game.file == 2) {
    branchEnter = <img id="branch" src={branch2} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit3} width="500" height="300"/>;
  } else {
    branchEnter = <img id="branch" src={branch3} width="500" height="300"/>;
    branchEx = <img id="branch-exit" src={branchExit2} width="500" height="300"/>;
  };

  function getPosition() {
    if(props.game.file == 1) {
      return "branch-connect-top"
    } else {
      return "branch-connect-bottom"
    };
  }

  return (
    <div className="select-wrap">
      <div className="selectScreen">
        {branchEnter}
        <img id={getPosition()} src={connect} width="300" height="100"/>
        {branchEx}
        <h2>Select a File</h2>
        <div id={isSelected(1)+'File'} className="file">
          {fileOne}
        </div>
        <div id={isSelected(2)+'File'} className="file">
          {fileTwo}
        </div>
        <div id={isSelected(3)+'File'} className="file">
          {fileThree} 
        </div>
        <div id={isSelected(4)}>
          <h4>DELETE FILE</h4>
        </div>
        <div id={isSelected(5)}>
          <h4>COPY FILE</h4>
        </div>
        <div id={isSelected(6)}>
          <h4>RETURN TO TITLE</h4>
        </div>
        <div>
          <h4><span className="button-prompt">Enter</span> / <span className="button-prompt">Space</span> : Confirm Selection</h4>
        </div>
      </div>
    </div>
  );
}

BranchSelect.propTypes = {
  menu: PropTypes.object.isRequired,
  player: PropTypes.object,
  game: PropTypes.object,
  saves: PropTypes.object
}

export default BranchSelect;