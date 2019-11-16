import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MPBar from '../MPBar/MPBar';
import * as playerConsts from '../../redux/modules/player/playerConstants';
import './GameUITop.css';
import taserIcon from '../../assets/images/items/taserIcon.png';
import cryoIcon from '../../assets/images/items/cryoIcon.png';
import collider from '../../assets/images/items/collider.png';
import clone from '../../assets/images/items/clone.png';
import heart from '../../assets/images/items/heart.gif';
import heartless from '../../assets/images/items/heartless.gif';
import particle from '../../assets/images/items/entangle.gif';
import selected from '../../assets/images/items/selected-items.png';

function GameUITop(props) {
  let weaponIcon;
  if (props.player.currentWeapon === null) {
    weaponIcon = '';
  } else if (props.player.currentWeapon === 'Taser') {
    weaponIcon = <img id="current-weapon" src={taserIcon} width="40" height="40"/>
  } else if (props.player.currentWeapon === 'Cryostat') {
    weaponIcon = <img id="current-weapon" src={cryoIcon} width="40" height="40"/>
  };
  let entanglement = props.player.entanglement + '%';
  if(props.player.entanglement < 10) {
    entanglement = <span className="single-digit">{entanglement}</span>
  };
  let skillIcon = '';
  if (props.player.currentSkill === null) {
    skillIcon = '';
  } else if (props.player.currentSkill === 'dash') {
    skillIcon = <img id="current-skill" src={collider} width="40" height="40"/>
  } else if (props.player.currentSkill === 'clone') {
    skillIcon = <img id="current-skill" src={clone} width="40" height="40"/>
  };
  return (
    <div id="UI-wrap">
      <div id="UI-content">
        <div id="hp-bar">
          <label>
            {props.player.health >= 50 ? <img id="heart-icon1" src={heart} width="50" height="50"/> : <img id="heart-icon1" src={heartless} width="50" height="50"/>} 
            {props.player.health >= 40 ? <img id="heart-icon2" src={heart} width="50" height="50"/> : <img id="heart-icon1" src={heartless} width="50" height="50"/>} 
            {props.player.health >= 30 ? <img id="heart-icon3" src={heart} width="50" height="50"/> : <img id="heart-icon1" src={heartless} width="50" height="50"/>} 
            {props.player.health >= 20 ? <img id="heart-icon4" src={heart} width="50" height="50"/> : <img id="heart-icon1" src={heartless} width="50" height="50"/>} 
            {props.player.health >= 10 ? <img id="heart-icon5" src={heart} width="50" height="50"/> : <img id="heart-icon1" src={heartless} width="50" height="50"/>} 
          </label>
        </div>
        <img id="selected-items" src={selected} width="125" height="60"/>
        <div id="weapon">
          {weaponIcon}  
        </div>
        <div id="skill">
          {skillIcon}
        </div>
        <div id="entangle-bar">
          <label>
            <span id="mp"><MPBar type={'entanglement'} magic={props.player.magic} /></span>
            <img id="particle-icon" src={particle} width="270" height="60"/>
            <span id="particle-percentage">{entanglement}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

GameUITop.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUITop);
