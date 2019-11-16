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
import './Square.css';

class Square extends React.Component{
  constructor(props) {
    super(props);
  };

  getOtherContent() {
    if (this.props.warning && this.props.player.location == this.props.squareId) {
      return <div className="warning">{<img id="alert" src={alert} weight="50" height="50" />}</div>
    } else if (this.props.alert == true && this.props.player.location == this.props.squareId) {
      return <div>{<img id="alert" src={alert} weight="50" height="50" />}</div>
    } else if (this.props.value == 'D') {
      return <Door content={this.props.content} doors={this.props.doors}/>
    } else if (this.props.npcs.location === this.props.squareId) {
      return <NPCs npcs={this.props.npcs} />
    } else if (this.props.value == '$') {
      return <Item content={this.props.content}/>
    } else if (this.props.player.cloneLocation === this.props.squareId) {
      let cloneClass;
      if(this.props.player.activeClone === 1) {
        cloneClass = 'clone2';
      } else {
        cloneClass = 'clone1';
      }; 
      return <div id={cloneClass}>{playerConsts.sprites.stand[this.props.player.cloneDirection]}</div>
    } else if (this.props.value == 'L') {
      return <div id="lava"></div>
    } else if (this.props.value == 'LC') {
      return <div id="lava-cool">{<img src={lavaCool} weight="50" height="50" />}</div>
    } else if (this.props.value == '%') {
      return <div id="lightning">{<img src={lightningRight} weight="50" height="50" />}</div>
    } else if (this.props.value == 'H') {
      return <div id="goo">{roomConsts.sprites['goo']}</div>
    } else if (this.props.explosion === true || (this.props.value == "~" && this.props.eye === 'hurt') || (this.props.value == "i" && this.props.eye === 'hurt')) {
      return <div id="explosion">{roomConsts.sprites['explosion']}</div>
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
    } else if (this.props.game.roomId === 'special' && this.props.value !== 'V' && this.props.value !== 'W'){
      return <div className="special-tile">{this.props.tileImage}</div>
    } else {
      return <div className="tile">{this.props.tileImage}</div>
    };
  };

  render() {
    if(this.props.game.lights === 'on'){
      return (
        <div id="square">
            {this.getOtherContent()}
            <Sprite sprite={this.props.sprite} player={this.props.player} squareId={this.props.squareId} transition={this.props.transition} squareValue={this.props.value}/>
            {this.getTile()}
        </div>
      );
    } else {
      return (
        <div id="square">
            <Sprite lights={this.props.game.lights} sprite={this.props.sprite} player={this.props.player} squareId={this.props.squareId} transition={this.props.transition} squareValue={this.props.value}/>
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
  doors: PropTypes.object,
  eye: PropTypes.string,
  explosion: PropTypes.bool,
  warning: PropTypes.bool,
  npcs: PropTypes.object
};

export default connect()(Square);
