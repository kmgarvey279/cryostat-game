import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import MapRoom from '../MapRoom/MapRoom';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import Controls from '../Controls/Controls';
import * as text from '../../redux/modules/text/textConstants';
import './Map.css';
import * as soundsModule from '../../redux/modules/sounds';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      screen: 1 
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    if(event.keyCode === 81){
      event.preventDefault();
      this.changeScreen(-1);
    } else if(event.keyCode === 69){
      event.preventDefault();
      this.changeScreen(1);
    }
  }

  changeScreen = (direction) => {
    let newScreen = this.state.screen + direction;
    if(newScreen <= 2 && newScreen >= 0){
      this.props.dispatch(soundsModule.changeEffect('select'));
      this.setState({
        screen: newScreen
      });
    }
  }

  render = () => {
    let key;
    if(this.props.game.roomId === 'hallway1'){
      key = <div id="mapKey">
              Cryonic Storage Facility | Floor: B1
              <br/>Lab Corridor
            </div>
    } else {
      key = <div id="mapKey">
              Cryonic Storage Facility | Floor: B1
              <br/>{text.roomNames[this.props.game.roomId - 1]}
            </div>
    };

    let nav;
    if(this.state.screen === 0){
      nav = <div className="pause-nav">
              <span className="nav-right" id="arrow-active"><span className="menu-button-prompt-right">E</span> Map</span>
            </div>
    } else if (this.state.screen === 1){
      nav = <div className="pause-nav">
              <span className="nav-left" id="arrow-active"><span className="menu-button-prompt-left">Q</span> Inventory</span>
              <span className="nav-right" id="arrow-active">Controls <span className="menu-button-prompt-right">E</span></span>
            </div>
    } else if (this.state.screen === 2){
      nav = <div className="pause-nav">
              <span className="nav-left" id="arrow-active"><span className="menu-button-prompt-left">Q</span> Map</span>
            </div>
    };

    if(this.state.screen === 0){
      return (
        <div id="outerMap">
          {nav}
          <div className="pause-character-info">
            <CharacterInfo player={this.props.player}/>
          </div>
        </div>
      );
    } else if(this.state.screen === 1){
      let mapGrid = this.props.maps;
      let currentDestination = this.props.game.destination;
      let currentLocation = this.props.game.roomId;
      if(this.props.player.hasMap === true){
        return (
          <div id="outerMap">
            {nav}
            <div className="map-box">
              <h3>Map</h3>
              <div id="innerMap">
                {Object.keys(mapGrid).map(function(roomId) {
                  var room = mapGrid[roomId];
                  return <MapRoom roomId={room.roomId}
                  destination={currentDestination}
                  visited={room.visited}
                  current={currentLocation}/>
                })}
              </div>
              {key}
            </div>
          </div>
        );
      } else {
        return (
          <div id="outerMap">
            {nav}
            <div className="map-box">
              <h3>Map</h3>
              <p className="map-404">[Data Unavailable]</p>
            </div>
          </div>
        );
      }
    } else if(this.state.screen === 2){
      return (
        <div id="outerMap">
          {nav}
          <div className="pause-controls">
            <Controls/>
          </div>
        </div>
      );
    };
  };
}

Map.propTypes = {
  game: PropTypes.object.isRequired,
  maps: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    soundsModule : bindActionCreators(soundsModule, dispatch)
  }
};

export default connect(mapDispatchToProps)(Map);
