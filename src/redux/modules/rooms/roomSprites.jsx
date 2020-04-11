import React from 'react';

import eyeball from '../../../assets/images/room/eyeball.gif';
import eyeballHurt from '../../../assets/images/room/eyeball-damage.gif';
import tenta from '../../../assets/images/room/tenta.gif';
import tentaHurt from '../../../assets/images/room/tenta-damage.gif';
import ice from '../../../assets/images/room/ice.png';
import lava from '../../../assets/images/room/lava.gif';
import lavaCovered from '../../../assets/images/room/lava-covered.png';
import wall from '../../../assets/images/room/wall-inner-horizontal.png';
import tile from '../../../assets/images/room/tile.png';
import tile2 from '../../../assets/images/room/tile2.png';
import spookyTile from '../../../assets/images/room/spooky-tile.png';
import spookyTile2 from '../../../assets/images/room/spooky-tile2.png';
import goo from '../../../assets/images/room/goo.png';
import pit from '../../../assets/images/room/pit.png';
import wire from '../../../assets/images/room/wire.png';
import beltNorth from '../../../assets/images/room/belt-north.gif';
import beltEast from '../../../assets/images/room/belt-east.gif';
import beltSouth from '../../../assets/images/room/belt-south.gif';
import beltWest from '../../../assets/images/room/belt-west.gif';
import warp from '../../../assets/images/room/warp.gif';
import warpRed from '../../../assets/images/room/warpRed.gif';
import warpBlue from '../../../assets/images/room/warpBlue.gif';
import warpPurple from '../../../assets/images/room/warpPurple.gif';
import warpGreen from '../../../assets/images/room/warpGreen.gif';
import warpYellow from '../../../assets/images/room/warpYellow.gif';

import core from '../../../assets/images/room/core.png';
import terminal from '../../../assets/images/room/terminal.gif';
import terminalOff from '../../../assets/images/room/terminal-off.png';
import spookyTerminal from '../../../assets/images/room/spooky-terminal.png';
import terminalShock from '../../../assets/images/room/terminal-shock.gif';
import tank1 from '../../../assets/images/room/cryoTank1.gif';
import tank2 from '../../../assets/images/room/cryoTank2.gif';
import tankE1 from '../../../assets/images/room/cryoTankE1.gif';
import tankE2 from '../../../assets/images/room/cryoTankE2.gif';
import tankD1 from '../../../assets/images/room/cryoTankD1.png';
import tankD2 from '../../../assets/images/room/cryoTankD2.png';
import uglyBed1 from '../../../assets/images/room/uglyBed1.png';
import uglyBed2 from '../../../assets/images/room/uglyBed2.png';
import shelf from '../../../assets/images/room/shelf.png';
import dead1 from '../../../assets/images/room/dead1.png';
import dead2 from '../../../assets/images/room/dead2.png';
import theMachine from '../../../assets/images/room/theMachine.gif';
import theMachineOn from '../../../assets/images/room/theMachineOn.gif';
import machineLeft from '../../../assets/images/room/machine-left.png';
import machineRight from '../../../assets/images/room/machine-right.png';
import lightningRight from '../../../assets/images/room/lightningRight.gif';
import lightningRed from '../../../assets/images/room/lightningRed.gif';
import explosion from '../../../assets/images/room/explode.png';
import tube from '../../../assets/images/room/tube-monster1.gif';
import bigTube1 from '../../../assets/images/room/big-tube1.png';
import bigTube2 from '../../../assets/images/room/big-tube2.png';
import bigTube3 from '../../../assets/images/room/big-tube3.png';
import brokenTube1 from '../../../assets/images/room/broken-tube1.png';
import brokenTube2 from '../../../assets/images/room/broken-tube2.png';
import brokenTube3 from '../../../assets/images/room/broken-tube3.png';
import save from '../../../assets/images/items/save.gif';

import corner1 from '../../../assets/images/room/wall-corner1.png';
import corner1Spooky from '../../../assets/images/room/spooky-wall-corner1.png';
import corner2 from '../../../assets/images/room/wall-corner2.png';
import corner2Spooky from '../../../assets/images/room/spooky-wall-corner2.png';
import corner3 from '../../../assets/images/room/wall-corner3.png';
import corner3Spooky from '../../../assets/images/room/spooky-wall-corner3.png';
import corner4 from '../../../assets/images/room/wall-corner4.png';
import corner4Spooky from '../../../assets/images/room/spooky-wall-corner4.png';
import innerCorner1 from '../../../assets/images/room/wall-inner-corner1.png';
import innerCorner1Spooky from '../../../assets/images/room/spooky-wall-inner-corner1.png';
import innerCorner2 from '../../../assets/images/room/wall-inner-corner2.png';
import innerCorner2Spooky from '../../../assets/images/room/spooky-wall-inner-corner2.png';
import innerCorner3 from '../../../assets/images/room/wall-inner-corner3.png';
import innerCorner3Spooky from '../../../assets/images/room/spooky-wall-inner-corner3.png';
import innerCorner3Alt from '../../../assets/images/room/wall-inner-corner3-alt.png';
import innerCorner3AltSpooky from '../../../assets/images/room/spooky-wall-inner-corner3-alt.png';
import innerCorner4 from '../../../assets/images/room/wall-inner-corner4.png';
import innerCorner4Spooky from '../../../assets/images/room/spooky-wall-inner-corner4.png';
import innerCorner4Alt from '../../../assets/images/room/wall-inner-corner4-alt.png';
import innerCorner4AltSpooky from '../../../assets/images/room/spooky-wall-inner-corner4-alt.png';
import top from '../../../assets/images/room/wall-top.png';
import topSpooky from '../../../assets/images/room/spooky-wall-top.png';
import brokenLeft from '../../../assets/images/room/spooky-wall-top-broken-left.png';
import brokenRight from '../../../assets/images/room/spooky-wall-top-broken-right.png';
import left from '../../../assets/images/room/wall-left.png';
import leftSpooky from '../../../assets/images/room/spooky-wall-left.png';
import innerLeft from '../../../assets/images/room/wall-inner-left.png';
import innerLeftSpooky from '../../../assets/images/room/spooky-wall-inner-left.png';
import innerRight from '../../../assets/images/room/wall-inner-right.png';
import innerRightSpooky from '../../../assets/images/room/spooky-wall-inner-right.png';
import right from '../../../assets/images/room/wall-right.png';
import rightSpooky from '../../../assets/images/room/spooky-wall-right.png';
import connectNE from '../../../assets/images/room/wall-connect-top-left.png';
import connectNE2 from '../../../assets/images/room/wall-connect-top-left2.png';
import connectNE2Spooky from '../../../assets/images/room/spooky-wall-connect-top-left.png';
import connectNW from '../../../assets/images/room/wall-connect-top-right.png';
import connectNWSpooky from '../../../assets/images/room/spooky-wall-connect-top-right.png';
import danger from '../../../assets/images/room/danger.gif';

import white from '../../../assets/images/room/white.png';
import phone from '../../../assets/images/room/phone.png';
import phoneRing from '../../../assets/images/room/phone-ring.gif';
import fireplace from '../../../assets/images/room/fireplace.gif';

import block from '../../../assets/images/room/block.png';
import blockWarp from '../../../assets/images/room/block-warp.gif';
import blockSink from '../../../assets/images/room/blockSink.gif';
import iceChunk from '../../../assets/images/room/iceChunk.png';

import switchOn from '../../../assets/images/room/switchOn.gif';
import switchOff from '../../../assets/images/room/switchOff.png';
import elecSwitchOn from '../../../assets/images/room/elecswitch-on.png';
import elecSwitchOff from '../../../assets/images/room/elecswitch-off.png';

import platformOffNS from '../../../assets/images/room/platformOffNS.png';
import platformOnNS from '../../../assets/images/room/platformOnNS.gif';
import platformOffEW from '../../../assets/images/room/platformOffEW.png';
import platformOnEW from '../../../assets/images/room/platformOnEW.gif';

import lockedDoorNorth from '../../../assets/images/room/door-locked-north.png';
import unlockedDoorNorth from '../../../assets/images/room/door-unlocked-north.png';
import openingDoorNorth from '../../../assets/images/room/door-open-north.gif';
import openDoorNorth from '../../../assets/images/room/door-open-north.png';
import closingDoorNorth from '../../../assets/images/room/door-close-north.gif';

import unlockedKey1North from '../../../assets/images/room/door-unlocked-north-keycard1.png';
import openingKey1North from '../../../assets/images/room/door-open-north-keycard1.gif';
import closingKey1North from '../../../assets/images/room/door-close-north-keycard1.gif';

import lockedDoorEast from '../../../assets/images/room/door-locked-east.png';
import unlockedDoorEast from '../../../assets/images/room/door-unlocked-east.png';
import openingDoorEast from '../../../assets/images/room/door-open-east.gif';
import openDoorEast from '../../../assets/images/room/door-open-east.png';
import closingDoorEast from '../../../assets/images/room/door-close-east.gif';

import lockedDoorWest from '../../../assets/images/room/door-locked-west.png';
import unlockedDoorWest from '../../../assets/images/room/door-unlocked-west.png';
import openingDoorWest from '../../../assets/images/room/door-open-west.gif';
import openDoorWest from '../../../assets/images/room/door-open-west.png';
import closingDoorWest from '../../../assets/images/room/door-close-west.gif';

import unlockedKey2West from '../../../assets/images/room/door-closed-west-keycard2.png';
import openingKey2West from '../../../assets/images/room/door-open-west-keycard2.gif';
import closingKey2West from '../../../assets/images/room/door-close-west-keycard2.gif';

const sprites = {
  core: <img src={core} width="1200" height="300"/>,
  eyeball: <img src={eyeball} width="50" height="50"/>,
  eyeballHurt: <img src={eyeballHurt} width="50" height="50"/>,
  tenta: <img src={tenta} width="50" height="50"/>,
  tentaHurt: <img src={tentaHurt} width="50" height="50"/>,
  wire: <img src={wire} width="50" height="50"/>,
  pit: <img src={pit} width="50" height="50"/>,
  ice: <img src={ice} width="50" height="50"/>,
  lava: <img src={lava} width="50" height="50"/>,
  lavaCovered: <img src={lavaCovered} width="50" height="50"/>,
  wall: <img src={wall} width="50" height="50"/>,
  tile: <img src={tile} width="50" height="50"/>,
  tile2: <img src={tile2} width="50" height="50"/>,
  spookyTile: <img src={spookyTile} width="50" height="50"/>,
  spookyTile2: <img src={spookyTile2} width="50" height="50"/>,
  goo: <img src={goo} width="50" height="50"/>,
  beltNorth: <img src={beltNorth} width="50" height="50"/>,
  beltEast: <img src={beltEast} width="50" height="50"/>,
  beltSouth: <img src={beltSouth} width="50" height="50"/>,
  beltWest: <img src={beltWest} width="50" height="50"/>,
  warp: <img src={warp} width="50" height="50"/>,
  warpRed: <img src={warpRed} width="50" height="50"/>,
  warpGreen: <img src={warpGreen} width="50" height="50"/>,
  warpPurple: <img src={warpPurple} width="50" height="50"/>,
  warpBlue: <img src={warpBlue} width="50" height="50"/>,
  warpYellow: <img src={warpYellow} width="50" height="50"/>,
  terminal: <img src={terminal} width="50" height="50"/>,
  terminalOff: <img src={terminalOff} width="50" height="50"/>,
  terminalShock: <img src={terminalShock} width="50" height="50"/>,
  spookyTerminal: <img src={spookyTerminal} width="50" height="50"/>,
  tank1: <img src={tank1} width="60" height="90" />,
  tank2: <img src={tank2} width="63" height="90" />,
  tankE1: <img src={tankE1} width="60" height="90" />,
  tankE2: <img src={tankE2} width="63" height="90" />,
  tankD1: <img src={tankD1} width="60" height="90" />,
  tankD2: <img src={tankD2} width="63" height="90" />,
  shelf: <img src={shelf} width="63" height="90"/>,
  uglyBed1: <img src={uglyBed1} width="70" height="90"/>,
  uglyBed2: <img src={uglyBed2} width="70" height="90"/>,
  dead1: <img src={dead1} width="70" height="90"/>,
  dead2: <img src={dead2} width="70" height="90"/>,
  theMachine: <img src={theMachine} width="500" height="130"/>,
  theMachineOn: <img src={theMachineOn} width="500" height="130"/>,
  machineLeft: <img src={machineLeft} width="50" height="50"/>,
  machineRight: <img src={machineRight} width="50" height="50"/>,
  save: <img src={save} width="50" height="50"/>,
  lightningRight: <img src={lightningRight} width="65" height="70"/>,
  lightningRed: <img src={lightningRed} width="65" height="70"/>,
  explosion: <img src={explosion} width="50" height="50"/>,
  tube: <img src={tube} width="65" height="70"/>,
  save: <img src={save} width="70" height="70"/>,
  bigTube1: <img src={bigTube1} width="80" height="200"/>,
  bigTube2: <img src={bigTube2} width="70" height="200"/>,
  bigTube3: <img src={bigTube3} width="70" height="200"/>,
  brokenTube1: <img src={brokenTube1} width="70" height="200"/>,
  brokenTube2: <img src={brokenTube2} width="70" height="200"/>,
  brokenTube3: <img src={brokenTube3} width="70" height="200"/>,

  corner1: <img src={corner1} width="50" height="50"/>,
  innerCorner1: <img src={innerCorner1} width="50" height="50"/>,
  corner2: <img src={corner2} width="50" height="50"/>,
  innerCorner2: <img src={innerCorner2} width="50" height="50"/>,
  corner3: <img src={corner3} width="50" height="50"/>,
  innerCorner3: <img src={innerCorner3} width="50" height="50"/>,
  innerCorner3Alt: <img src={innerCorner3Alt} width="50" height="50"/>,
  corner4: <img src={corner4} width="50" height="50"/>,
  innerCorner4: <img src={innerCorner4} width="50" height="50"/>,
  innerCorner4Alt: <img src={innerCorner4Alt} width="50" height="50"/>,
  top: <img src={top} width="50" height="50"/>,
  bottom: <img src={top} width="50" height="50"/>,
  left: <img src={left} width="50" height="50"/>,
  innerRight: <img src={innerRight} width="50" height="50"/>,
  innerLeft: <img src={innerLeft} width="50" height="50"/>,
  right: <img src={right} width="50" height="50"/>,
  connectNE: <img src={connectNE} width="50" height="50"/>,
  connectNE2: <img src={connectNE2} width="50" height="50"/>,
  connectNW: <img src={connectNW} width="50" height="50"/>,

  corner1Spooky: <img src={corner1Spooky} width="50" height="50"/>,
  innerCorner1Spooky: <img src={innerCorner1Spooky} width="50" height="50"/>,
  corner2Spooky: <img src={corner2Spooky} width="50" height="50"/>,
  innerCorner2Spooky: <img src={innerCorner2Spooky} width="50" height="50"/>,
  corner3Spooky: <img src={corner3Spooky} width="50" height="50"/>,
  innerCorner3Spooky: <img src={innerCorner3Spooky} width="50" height="50"/>,
  innerCorner3AltSpooky: <img src={innerCorner3AltSpooky} width="50" height="50"/>,
  corner4Spooky: <img src={corner4Spooky} width="50" height="50"/>,
  innerCorner4Spooky: <img src={innerCorner4Spooky} width="50" height="50"/>,
  topSpooky: <img src={topSpooky} width="50" height="50"/>,
  brokenLeftSpooky: <img src={brokenLeft} width="50" height="50"/>,
  brokenRightSpooky: <img src={brokenRight} width="50" height="50"/>,
  bottomSpooky: <img src={topSpooky} width="50" height="50"/>,
  leftSpooky: <img src={leftSpooky} width="50" height="50"/>,
  innerRightSpooky: <img src={innerRightSpooky} width="50" height="50"/>,
  innerLeftSpooky: <img src={innerLeftSpooky} width="50" height="50"/>,
  rightSpooky: <img src={rightSpooky} width="50" height="50"/>,
  connectNESpooky: <img src={connectNE} width="50" height="50"/>,
  connectNE2Spooky: <img src={connectNE2Spooky} width="50" height="50"/>,
  connectNWSpooky: <img src={connectNWSpooky} width="50" height="50"/>,
  innerCorner4AltSpooky: <img src={innerCorner4AltSpooky} width="50" height="50"/>,
  danger: <img src={danger} width="50" height="50"/>,

  white: <img src={white} width="50" height="50"/>,
  phone: <img src={phone} width="70" height="70"/>,
  phoneRing: <img src={phoneRing} width="70" height="70"/>,
  fireplace: <img src={fireplace} width="80" height="60"/>,
 

  block:  <img src={block} width="60" height="60"/>,
  blockWarp:  <img src={blockWarp} width="60" height="60"/>,
  blockSink: <img src={blockSink} width="60" height="60"/>,
  iceChunk: <img src={iceChunk} width="60" height="60"/>,

  switchOff: <img src={switchOff} width="50" height="50"/>,
  switchOn: <img src={switchOn} width="50" height="50"/>,
  elecSwitchOn: <img src={elecSwitchOn} width="75" height="60"/>,
  elecSwitchOff: <img src={elecSwitchOff} width="75" height="60"/>,

  platformOffNS: <img src={platformOffNS} width="50" height="50"/>,
  platformOnNS: <img src={platformOnNS} width="50" height="50"/>,
  platformOffEW: <img src={platformOffEW} width="50" height="50"/>,
  platformOnEW: <img src={platformOnEW} width="50" height="50"/>,

  lockedDoorNorth: <img src={lockedDoorNorth} width="50" height="40"/>,
  unlockedDoorNorth: <img src={unlockedDoorNorth} width="50" height="40"/>,
  openingDoorNorth: <img src={openingDoorNorth} width="50" height="40"/>,
  openDoorNorth: <img src={openDoorNorth} width="50" height="40"/>,
  closingDoorNorth: <img src={closingDoorNorth} width="50" height="40"/>,

  lockedDoorEast: <img src={lockedDoorEast} width="58" height="50"/>,
  unlockedDoorEast: <img src={unlockedDoorEast} width="58" height="50"/>,
  openingDoorEast: <img src={openingDoorEast} width="58" height="50"/>,
  openDoorEast: <img src={openDoorEast} width="58" height="50"/>,
  closingDoorEast: <img src={closingDoorEast} width="58" height="50"/>,

  lockedDoorSouth: <img src={lockedDoorNorth} width="50" height="40"/>,
  unlockedDoorSouth: <img src={unlockedDoorNorth} width="50" height="40"/>,
  openingDoorSouth: <img src={openingDoorNorth} width="50" height="40"/>,
  openDoorSouth: <img src={openDoorNorth} width="50" height="40"/>,
  closingDoorSouth: <img src={closingDoorNorth} width="50" height="40"/>,

  unlockedDoorSouthKey1: <img src={unlockedKey1North} width="50" height="40"/>,
  openingDoorSouthKey1: <img src={openingKey1North} width="50" height="40"/>,
  closingDoorSouthKey1: <img src={closingKey1North} width="50" height="40"/>,

  lockedDoorWest: <img src={lockedDoorWest} width="58" height="50"/>,
  unlockedDoorWest: <img src={unlockedDoorWest} width="58" height="50"/>,
  openingDoorWest: <img src={openingDoorWest} width="58" height="50"/>,
  openDoorWest: <img src={openDoorWest} width="58" height="50"/>,
  closingDoorWest: <img src={closingDoorWest} width="58" height="50"/>,

  unlockedDoorWestKey2: <img src={unlockedKey2West} width="58" height="50"/>,
  openingDoorWestKey2: <img src={openingKey2West} width="58" height="50"/>,
  closingDoorWestKey2: <img src={closingKey2West} width="58" height="50"/>
};

export default sprites;
