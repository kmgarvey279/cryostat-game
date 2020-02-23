import npcSprites from '../../redux/modules/npcs/npcSprites';
import React from 'react';
import PropTypes from 'prop-types';
import './NPCs.css';

function NPCs(props){
  let sprite = npcSprites[props.npc.kind][props.npc.status][props.npc.direction];
  return (
    <div id="npc">
      {sprite}
    </div>
  )
}

NPCs.propTypes = {
  npc: PropTypes.object
};

export default NPCs;