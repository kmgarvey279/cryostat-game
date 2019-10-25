import * as enemyConsts from '../../redux/modules/enemies/enemyConstants';
import React from 'react';
import PropTypes from 'prop-types';
import './NPCs.css';

function NPCs(props){
  return (
    <div id="npc">
      {enemyConsts.sprites.slime.move.south}
    </div>
  )
}

NPCs.propTypes = {
  npcs: PropTypes.object
};

export default NPCs;