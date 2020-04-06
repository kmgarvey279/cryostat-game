import React from 'react';
import PropTypes from 'prop-types';
import CurrentRoom from '../CurrentRoom/CurrentRoom';
import TextBoxes from '../TextBoxes/TextBoxes';
import GameUITop from '../GameUITop/GameUITop';
import BossUI from '../BossUI/BossUI';
import Map from '../Map/Map';
import GameOver from '../GameOver/GameOver';
import ItemGet from '../ItemGet/ItemGet';
import PopUp from '../PopUp/PopUp';
import Error from '../Error/Error';
import './Game.css';
import Music from '../Music/Music';
import SFX from '../SFX/SFX';

function Game(props){
  if (props.game.gameState === 'paused') {
    return (
      <div className="game">
        <Map maps={props.maps} game={props.game} />
        <GameUITop player={props.player} game={props.game}/>
        <div id='pause'><CurrentRoom boss={props.boss} npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'gameOver') {
    return (
      <div className="game">
      <GameOver
      menu={props.menu}
      player={props.player}
      handleStart={props.handleStart}
      handleLoad={props.handleLoad}
      nullAll={props.nullAll}/>
      </div>
    );
  } else if (props.game.gameState === 'exitBranch') {
    return (
      <div className="empty" id="exit">
        <GameUITop player={props.player} game={props.game}/>
        <div id='level'><CurrentRoom npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'enterBranch') {
    return (
      <div className="game" id="enter">
        <GameUITop player={props.player} game={props.game}/>
        <div id='level'><CurrentRoom npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'dialogue') {
    return (
      <div className="game">
        <GameUITop player={props.player} game={props.game}/>
        <div id='level'><CurrentRoom npcs={props.npcs} game={props.game} currentRoom={props.currentRoom} player={props.player} doors={props.doors}/></div>
        <TextBoxes text={props.text} game={props.game} menu={props.menu}/>
      </div>
    );
  } else if (props.game.gameState === 'building') {
    return (
      <div id="loading">
      </div>
    );
  } else if (props.game.gameState === 'glitch') {
    return (
      <div className="glitch">
        <GameUITop player={props.player} game={props.game}/>
        <div id='level'><CurrentRoom npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'postExitBranch') {
    return (
      <div className="empty">
        <GameUITop player={props.player} game={props.game}/>
        <div id='level'><CurrentRoom npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'error') {
    return (
      <div>
        <Error exitSpecial={props.exitSpecial}/>
      </div>
    );
  } else if (props.game.gameState === 'itemGet') {
    return (
      <div className="game">
        <GameUITop player={props.player} game={props.game}/>
        <div id='level'><CurrentRoom npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
        <ItemGet newItem={props.player.newItem}/>
      </div>
    );
  } else {
    return (
      <div className="game">
        <PopUp popUp={props.popUp} />
        <GameUITop player={props.player} game={props.game}/>
        <BossUI boss={props.boss}/> 
        <div id='level'><CurrentRoom boss={props.boss} npcs={props.npcs} currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  }
}

Game.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  maps: PropTypes.object.isRequired,
  doors: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  sounds: PropTypes.object.isRequired,
  popUp: PropTypes.number,
  boss: PropTypes.object,
  npcs: PropTypes.object,
  handleStart: PropTypes.func,
  nullAll: PropTypes.func,
  exitSpecial: PropTypes.func
};

export default Game;
