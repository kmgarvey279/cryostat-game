import React from 'react';
import robotOff from '../../../assets/images/npc/robot-off.gif';
import robotOnSouth from '../../../assets/images/npc/robot-on-south.gif';
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
    robot: {
        off: {
            south: <img src={robotOff} width="85" height="90"/>
        },
        on: {
            south: <img src={robotOnSouth} width="85" height="90"/>
        }
    },
    lucyStandSouth: <img src={lucyStandSouth} width="80" height="80"/>
}

export default sprites;