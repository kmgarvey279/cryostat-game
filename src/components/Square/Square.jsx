import React from 'react';
import Sprite from '../Sprite/Sprite';
import Door from '../Door/Door';
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alert from '../../assets/images/room/alert.png';
import NPCs from '../NPCs/NPCs';
import lightningRight from '../../assets/images/room/lightningRight.gif';
import lavaCool from '../../assets/images/room/lava-cool.png';
import * as playerConsts from '../../redux/modules/player/playerConstants';
import * as roomConsts from '../../redux/modules/rooms/roomConstants';
import * as itemConsts from '../../redux/modules/rooms/itemConstants';
import './Square.css';

class Square extends React.Component{
  constructor(props) {
    super(props);
  };

  getExplosion() {
    if (this.props.explosion === true && this.props.value === 'I') {
      return <div id="explosion">{itemConsts.sprites['freeze']}</div>
    } else if (this.props.explosion === true || (this.props.value == "~" && this.props.eye === 'hurt') || (this.props.value == "i" && this.props.eye === 'hurt')) {
      return <div id="explosion">{roomConsts.sprites['explosion']}</div>
    } else if (this.props.shatter === 'break') {
      return <div id="explosion">{roomConsts.sprites['crystalShatter']}</div>
    } else if (this.props.shatter === 'form') {
      return <div id="implosion">{roomConsts.sprites['crystalShatter']}</div>
    };
  };

  getOtherContent() {
    if ((this.props.warning && this.props.player.location == this.props.squareId) || (this.props.alert == true && this.props.player.location == this.props.squareId)) {
      return <div>{<img id="alert" src={alert} weight="45" height="45" />}</div>
    } else if (this.props.value == 'D') {
      return <Door content={this.props.content} doors={this.props.doors}/>
    } else if (this.props.value == '$') {
      return <Item content={this.props.content}/>
    } else if (this.props.value == 'L') {
      return <div id="lava"></div>
    } else if (this.props.value === 'I'){
      return <div id="goo">{roomConsts.sprites['ice']}</div>
    } else if (this.props.value == 'LC') {
      return <div id="lava-cool">{<img src={lavaCool} weight="50" height="50" />}</div>
    } else if (this.props.value == '%') {
      return <div id="lightning">{<img src={lightningRight} weight="50" height="50" />}</div>
    } else if (this.props.value == 'H') {
      return <div id="goo">{roomConsts.sprites['goo']}</div>
    } else if (this.props.tileOverlay === 'fragileBreak'){
      return <div id="tile-overlay">{roomConsts.sprites['fragileBreak']}</div>
    };
  }
  
  getTile(){
    let warpType;
    if (this.props.value == "@") {
      if(this.props.content.length > 1 || this.props.player.cloneLocation === this.props.squareId) {
        warpType = 'warpOn';
      } else {
        warpType = 'warpOff';
      };
      return <div class="tile" id={warpType}>{this.props.tileImage}</div>
    } else if  (this.props.value == "~") {
      if(this.props.eye == 'alive') {
        return <div className="tile">{roomConsts.sprites['tenta']};</div>
      } else {
        return <div className="tile">{roomConsts.sprites['spookyTile']};</div>
      };
    } else if (this.props.warning) {
      return <div className="tile">{roomConsts.sprites['danger']}</div>
    } else if (this.props.value == "i") {
      if(this.props.eye == 'alive') {
        return <div className="tile">{roomConsts.sprites['eyeball']}</div>
      } else {
        return <div className="tile">{roomConsts.sprites['spookyTile']}</div>
      };
    } else if (this.props.game.special === true && this.props.value === 'W' && this.props.squareId !== 80){
      return <div className="tile"><div className="gradient"></div>{this.props.tileImage}</div>
    } else if (this.props.game.branch === 0 && this.props.value !== 'V' && this.props.value !== 'W' && this.props.value !== 'BG'){
      return <div className="special-tile">{this.props.tileImage}</div>
    } else {
      return <div className="tile">{this.props.tileImage}</div>
    };
  };

  getClone(){
    if (this.props.player.cloneLocation === this.props.squareId) {
      let cloneClass;
      if(this.props.player.activeClone === 1) {
        cloneClass = 'clone2';
      } else {
        cloneClass = 'clone1';
      }; 
      return <div id={cloneClass}>{playerConsts.sprites.stand[this.props.player.cloneDirection]}</div>
    } else {
      return null;
    };
  }

  getNPC(){
    let result;
    Object.keys(this.props.npcs).forEach(name => {
      let thisNPC = this.props.npcs[name];
        if(thisNPC.location === this.props.squareId){
          result = <NPCs npc={thisNPC}/>  
        };
    });
    return result;
  }

  render() {
    let objectArr = this.props.content.find(function(content) {
      return content[0] == 'interact';
    });
    let objectType = null; 
    if(objectArr !== undefined){
      objectType = objectArr[1]; 
    };

    let hasBlock = this.props.content.find(function(content) {
      return content[0] == 'block';
    });
    let block;
    if(hasBlock !== undefined){
      block = true;
    } else {
      block = false;
    };

    let hasSwitch = this.props.content.find(function(content) {
      return content[0] == 'elecSwitch';
    });
    let elecSwitch;
    if(hasSwitch !== undefined){
      elecSwitch = true;
    } else {
      elecSwitch = false;
    };

    let hasEnemy = this.props.content.find(function(content) {
      return content[0] == 'enemy';
    });
    let enemy;
    if(hasEnemy !== undefined){
      enemy = true;
    } else {
      enemy = false;
    };

    let shadow = null;
    if(this.props.player.location == this.props.squareId) {
      shadow = <div className="shadow-player"></div>
    } else if(objectType === 'save'){
      shadow = null;
    } else if (enemy === true){
      shadow = <div className="shadow-enemy"></div>
    } else if (this.props.value === 'T' && (objectType === 'tank2' || objectType === 'tankE2' || objectType === 'uglyBed2' || objectType === 'desk3')){
      shadow = <div className="shadow-last"></div>
    } else if (this.props.value === 'T' && (objectType === 'desk2')){
      shadow = <div className="shadow-mid"></div>
    } else if (this.props.value === 'T' && (objectType === 'tank1' || objectType === 'tankE1' || objectType === 'uglyBed1' || objectType === 'desk1')){
      shadow = <div className="shadow-first"></div>
    } else if (this.props.value === 'T' && (objectType === 'bigTube1' || objectType === 'brokenTube1')){
      shadow = <div className="big-shadow-first"></div>
    } else if (this.props.value === 'T' && (objectType === 'bigTube2' || objectType === 'brokenTube2')){
      shadow = <div className="big-shadow-mid"></div>
    } else if (this.props.value === 'T' && (objectType === 'bigTube3' || objectType === 'brokenTube3')){
      shadow = <div className="big-shadow-last"></div>
    } else if (this.props.value === 'T' && (objectType === 'theMachineOn' || objectType === 'theMachine')){
      shadow = <div className="machine-shadow"></div>
    } else if (this.props.value === 'T' && (objectType === 'theMachineOn' || objectType === 'theMachine')){
      shadow = <div className="machine-shadow"></div>
    } else if (this.props.value === 'T' && (objectType === 'phoneOff' || objectType === 'phoneOn')) {
      shadow = <div className="shadow-small"></div>
    } else if((this.props.value === 'T' || block === true || elecSwitch === true || this.props.value === '<>') && this.props.sprite !== ""){
      shadow = <div className="shadow-other"></div>
    }

    if(this.props.game.lights === 'on'){
      return (
        <div id="square">
            {this.getExplosion()}
            {this.getOtherContent()}
            <Sprite sprite={this.props.sprite} player={this.props.player} boss={this.props.boss} squareId={this.props.squareId} transition={this.props.transition} squareValue={this.props.value} branch={this.props.game.branch} special={this.props.game.special} roomId={this.props.game.roomId}/>
            {this.getClone()}
            {this.getNPC()}
            {shadow}
            {this.getTile()}
        </div>
      );
    } else {
      return (
        <div id="square">
            <Sprite lights={this.props.game.lights} sprite={this.props.sprite} player={this.props.player} squareId={this.props.squareId} boss={this.props.boss} transition={this.props.transition} squareValue={this.props.value}/>
        </div>
      );
    };
  }
}

Square.propTypes = {
  game: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  squareId: PropTypes.number.isRequired,
  tileImage: PropTypes.object.isRequired,
  sprite: PropTypes.object,
  transition: PropTypes.string,
  alert: PropTypes.bool,
  player: PropTypes.object,
  boss: PropTypes.object,
  doors: PropTypes.object,
  eye: PropTypes.string,
  explosion: PropTypes.bool,
  shatter: PropTypes.string,
  tileOverlay: PropTypes.string,
  warning: PropTypes.bool,
  npcs: PropTypes.object
};

export default connect()(Square);
