import React from 'react';
import PropTypes from 'prop-types';
import MapRoom from '../MapRoom/MapRoom';
import * as text from '../../redux/modules/text/textConstants';
import './Map.css';

function Map(props) {
  let key;
  if(props.game.roomId === 'hallway1'){
    key = <div id="mapKey">
            Cryonic Storage Facility | Floor: B1
            <br/>Lab Corridor
          </div>
  } else {
    key = <div id="mapKey">
            Cryonic Storage Facility | Floor: B1
            <br/>{text.roomNames[props.game.roomId - 1]}
          </div>
  };
  return (
    <div id="outerMap">
      <div id="innerMap">
        {Object.keys(props.maps).map(function(roomId) {
          var room = props.maps[roomId];
          return <MapRoom roomId={room.roomId}
          destination={props.game.destination}
          visited={room.visited}
          current={props.game.roomId}/>
        })}
      </div>
      {key}
    </div>
  );
}

Map.propTypes = {
  game: PropTypes.object.isRequired,
  maps: PropTypes.object.isRequired
};

export default Map;
