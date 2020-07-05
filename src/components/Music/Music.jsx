import React from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as soundsModule from '../../redux/modules/sounds';
import {bindActionCreators} from 'redux';
import tracks from '../../assets/sound/music';

class Music extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let track = tracks[this.props.sounds.music];
    let bgEffect;
    let speed = 1;
    let vol = 100;
    if(this.props.game.branch === 2 && this.props.game.roomId === 3){
      speed = 0.95;
    };
    if(this.props.game.gameState !== 'active'){
      vol = 50;
    }
    return (
      <div>
       <Sound
        url={track}
        loop={true}
        playbackRate={speed}
        volume={vol}
        playStatus={Sound.status.PLAYING}/>
        {bgEffect}
      </div>
    );
  }
}

Music.propTypes = {
  sounds: PropTypes.object,
  game: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    soundsModule : bindActionCreators(soundsModule, dispatch)
  }
};

export default (connect(mapDispatchToProps)(Music));
