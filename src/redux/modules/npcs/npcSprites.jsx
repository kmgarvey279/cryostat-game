import React from 'react';
import blaineStandSouth from '../../../assets/images/npc/blaine-stand-south.gif';
import blaineWarp from '../../../assets/images/npc/blaine-warp-south.gif';
import lucyStandSouth from '../../../assets/images/npc/lucy-stand-south.gif';

const sprites = {
    blaine: {
        warp: <img src={blaineWarp} width="80" height="80"/>,
        stand: {
            south: <img src={blaineStandSouth} width="80" height="80"/>
        }
    },
    lucyStandSouth: <img src={lucyStandSouth} width="80" height="80"/>
}

export default sprites;