import React from "react";
import TitleContainer from "../TitleContainer/TitleContainer";
import End from "../End/End";
import Game from "../Game/Game";
import SFX from '../SFX/SFX';
import './App.css';
import Music from '../Music/Music';
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import {bindActionCreators} from 'redux';

//redux modules
import * as blocksModule from '../../redux/modules/blocks';
import * as doorsModule from '../../redux/modules/doors';
import * as enemiesModule from '../../redux/modules/enemies/enemies';
import * as gameModule from '../../redux/modules/game';
import * as roomModule from '../../redux/modules/rooms/room';
import * as playerModule from '../../redux/modules/player/player';
import * as switchesModule from '../../redux/modules/switches';
import * as platformsModule from '../../redux/modules/platforms';
import * as mapsModule from '../../redux/modules/map';
import * as flagsModule from '../../redux/modules/flags';
import * as textModule from '../../redux/modules/text/text';
import * as soundsModule from '../../redux/modules/sounds';
import * as savesModule from '../../redux/modules/save-data';
import * as bossModule from '../../redux/modules/boss/boss';
import * as menuModule from '../../redux/modules/menu';
import * as npcsModule from '../../redux/modules/npcs/npcs';
//resources
import * as playerConsts from '../../redux/modules/player/playerConstants';
import * as enemyConsts from '../../redux/modules/enemies/enemyConstants';
import * as roomConsts  from '../../redux/modules/rooms/roomConstants';
import * as itemConsts from '../../redux/modules/rooms/itemConstants';
import * as textConsts from '../../redux/modules/text/textConstants';
import npcSprites from '../../redux/modules/npcs/npcSprites';
import bossShot from '../../assets/images/items/boss-shot.gif';
import bossBeam from '../../assets/images/items/boss-beam.gif';
import cryostat from '../../assets/images/items/cryostatNS.gif';
import boss from '../../assets/images/enemies/boss1.gif';
import darkBoss from '../../assets/images/enemies/boss1-dark.gif';
import bossSink from '../../assets/images/enemies/bossSink.gif';
//stateless functions
import * as helpers from './helperFunctions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: null,
      load: false
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.generateRoomFromTemplate = this.generateRoomFromTemplate.bind(this);
    this.nullAll = this.nullAll.bind(this);
    this.exitSpecial = this.exitSpecial.bind(this);
  }

//Handle Input
  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.player.magic < prevProps.player.magic) {
      this.regenMP();
    };
  }

  regenMP(){
    let regenTimer = setInterval(() => {
      let currentMP = this.props.player.magic;
      if(this.props.player.cloneLocation === null){
        if(currentMP < 100) {
          let nextTic = currentMP + 1;
          this.props.dispatch(playerModule.updatePlayerMagic(nextTic));
        } else {
          clearInterval(regenTimer);
        };
      } else {
        if(currentMP < 50) {
          let nextTic = currentMP + 1;
          this.props.dispatch(playerModule.updatePlayerMagic(nextTic));
        } else {
          clearInterval(regenTimer);
        };
      }
    }, 200);
  }

  gameLoop(){
    let status = this.props.player.status;
    if (this.props.game.north == true && this.props.player.status == 'normal' && this.props.game.gameState === "active"){
      this.move("north", this.props.player.location);
    } else if (this.props.game.east == true && this.props.player.status == 'normal' && this.props.game.gameState === "active"){
      this.move("east", this.props.player.location);
    } else if (this.props.game.south == true && this.props.player.status == 'normal' && this.props.game.gameState === "active"){
      this.move("south", this.props.player.location);
    } else if (this.props.game.west == true && this.props.player.status == 'normal' && this.props.game.gameState === "active"){
      this.move("west", this.props.player.location);
    } else if (this.props.game.skill == true && this.props.player.status == 'normal' && this.props.game.gameState === "active"){
      this.useSkill();
    };
  }

  onKeyDown(event) {
    //move up
    if(event.keyCode === 87){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleNorth(true));
      };
      //move down
    } else if(event.keyCode === 83){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleSouth(true));
      };
      //move right
    } else if (event.keyCode === 68){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleEast(true));
      };
      //move left
    } else if (event.keyCode === 65){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleWest(true));
      };
    } else if (event.keyCode === 32){
      event.preventDefault();
      if(this.props.game.gameState == 'dialogue') {
        //advance text
        this.advanceLine();
      } else if (this.props.game.gameState === 'itemGet') {
        this.closeItemGet();
      } else if (this.props.game.gameState == 'active' && this.props.player.status =='normal') {
        //talk/check environment
        let contentArr =  this.props.currentRoom[this.props.player.location].content;
        let interactArr = contentArr.find(function(content) {
          return content[0] == 'interact';
        });
        let next = this.props.player.location + helpers.getDifference(this.props.player.direction);
        if (interactArr !== undefined) {
          this.props.dispatch(playerModule.updatePlayerDirection('north'));
          this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.north));
          this.triggerDialogue('interact', interactArr[1]);
        } else if (this.props.currentRoom[next].value === 'NPC') {
          let npcArr = this.props.currentRoom[next].content.find(function(content) {
            return content[0] === 'npc';
          });
          let npcName = npcArr[1];
          let npcText = this.props.npcs[npcName].text;
          this.props.dispatch(playerModule.updatePlayerDirection('north'));
          this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.north));
          this.triggerDialogue('dialogue', npcText);
        } else if (this.props.game.gameState == 'itemGet') {
          this.closeItemGet();
        };
      };
    //change direction/fire north
    } else if (event.keyCode === 38){
      event.preventDefault();
      if(this.props.game.gameState == 'active' && this.props.player.status =='normal'){
        this.props.dispatch(playerModule.updatePlayerDirection('north'));
        this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.north));
        if(this.props.player.currentWeapon !== null) {
          this.props.dispatch(gameModule.toggleFire(true));
          this.attack();
        };
      };
    //change direction/fire east
    } else if (event.keyCode === 39){
      event.preventDefault();
      if(this.props.game.gameState == 'active' && this.props.player.status =='normal'){
        this.props.dispatch(playerModule.updatePlayerDirection('east'));
        this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.east));
        if(this.props.player.currentWeapon !== null) {
          this.props.dispatch(gameModule.toggleFire(true));
          this.attack();
        };
      }
    //change direction/fire south
    } else if (event.keyCode === 40){ 
      event.preventDefault();
      if(this.props.game.gameState == 'active' && this.props.player.status =='normal'){
        this.props.dispatch(playerModule.updatePlayerDirection('south'));
        this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.south));
        if(this.props.player.currentWeapon !== null) {
          this.props.dispatch(gameModule.toggleFire(true));
          this.attack();
        };
      };
    //change direction/fire west
    } else if (event.keyCode === 37){
      event.preventDefault();
      if(this.props.game.gameState == 'active' && this.props.player.status =='normal'){
        this.props.dispatch(playerModule.updatePlayerDirection('west'));
        this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.west));
        if(this.props.player.currentWeapon !== null) {
          this.props.dispatch(gameModule.toggleFire(true));
          this.attack();
        };
      }
    } else if (event.keyCode === 16){
      event.preventDefault();
      this.useSkill();
    } else if (event.keyCode === 88 && this.props.game.gameState == 'active' && this.props.player.status =='normal' && this.props.player.currentSkill !== null) {
      event.preventDefault();
      this.props.dispatch(gameModule.toggleSkill(true));
    //change selected weapon
    } else if (event.keyCode === 81 && this.props.game.gameState == 'active' && this.props.player.weapons.length > 1) {
        event.preventDefault();
        this.props.dispatch(soundsModule.changeEffect('select'));
        let newWeaponId;
        if (this.props.player.weapons.length > 1) {
          if(this.props.player.currentWeapon === 'Taser') {
            this.props.dispatch(playerModule.changeCurrentWeapon('Cryostat'));
          } else {
            this.props.dispatch(playerModule.changeCurrentWeapon('Taser'));
          };
        };
    } else if (event.keyCode === 69 && this.props.game.gameState == 'active' && this.props.player.status =='normal' && this.props.player.skills.length > 1) {
      event.preventDefault();
      this.props.dispatch(soundsModule.changeEffect('select'));
      let newSkillId;
      if (this.props.player.skills.length > 1) {
        if(this.props.player.currentSkill === 'dash') {
          this.props.dispatch(playerModule.changeCurrentSkill('clone'));
        } else {
          this.props.dispatch(playerModule.changeCurrentSkill('dash'));
        };
      };
    //reset current room
    // } else if (event.keyCode === 17 && this.props.game.gameState == 'active') {
    //   this.triggerDialogue('interact', 'resetPrompt')
    //pause/unpause
    } else if (event.keyCode === 13) {
      if (this.props.game.gameState == 'active' && this.props.player.status =='normal' || this.props.game.gameState == 'paused') {
         this.pauseGame();
      } else if (this.props.game.gameState == 'itemGet') {
         this.closeItemGet();
      };
    }
  }

  onKeyUp(event){
    if (event.keyCode == 65) {
      this.props.dispatch(gameModule.toggleWest(false));
    };
    if (event.keyCode == 68) {
      this.props.dispatch(gameModule.toggleEast(false));
    };
    if (event.keyCode == 87) {
      this.props.dispatch(gameModule.toggleNorth(false));
    };
    if (event.keyCode == 83) {
      this.props.dispatch(gameModule.toggleSouth(false));
    };
  }

  loadGame(){
    //load (playerless) room
    if (this.props.game.gameState == 'postExitBranch') {
      this.props.dispatch(soundsModule.changeMusic('machine'));
      this.fadeOut();
    } else {
      //load saved state
      let saveData = this.props.saves[this.props.game.file];
      this.props.dispatch(gameModule.loadGame(saveData.game));
      this.props.dispatch(playerModule.loadPlayer(saveData.player));
      this.props.dispatch(flagsModule.loadFlags(saveData.flags));
      this.props.dispatch(mapsModule.loadMaps(saveData.maps));
      this.props.dispatch(doorsModule.loadDoors(saveData.doors));
      this.setState({
        load: true
      });
      this.startGame();
    };
  }

  startGame(){
    //start game
    if(this.props.game.gameState == 'postExitBranch') {
      if(this.props.game.branch === 3) {
        this.exitSpecial();
      } else {
        this.props.dispatch(gameModule.setRoomId(1));
        this.props.dispatch(gameModule.toggleSpecial(true));
        this.generateSpecialRoom();
        this.props.dispatch(gameModule.changeGameState("enterBranch"));
        setTimeout(() =>
          this.handleChangeGameState('active'),
          3000
        );
      };
    } else {
      this.generateRoomFromTemplate();
    };
    if(this.props.game.roomId == '1' && this.props.flags['bootUp1'].triggered === false) {
      this.generateMapFromTemplate();
      this.props.dispatch(gameModule.changeGameState("enterBranch"));
      setTimeout(() =>
        this.handleChangeGameState('active'),
        3000
      );
    } else if(this.props.game.gameState == 'postSpecialRoom') {
      this.props.dispatch(gameModule.changeGameState("enterBranch"));
      setTimeout(() => {
        this.props.dispatch(playerModule.updatePlayerLocation(109));
        this.props.dispatch(roomModule.updateContent(109, [['player']]));
        this.props.dispatch(roomModule.updateSprite(109, playerConsts.sprites.particle.south));
        let playerAppearOne = setTimeout(() => {
          this.props.dispatch(soundsModule.changeEffect('warp'));
          this.props.dispatch(roomModule.updateSprite(109, playerConsts.sprites.dash.north));},
          1000
        );
        let playerAppearTwo = setTimeout(() => {
          this.props.dispatch(roomModule.updateSprite(109, playerConsts.sprites.stand.north));
          this.handleChangeGameState('active');},
          2000
        );
      }, 3000
      );
    } else {
      this.handleChangeGameState('active');
    };
    if(this.props.game.roomId === 1 && this.props.flags['bootUp1'].triggered === false) {
      setTimeout(() => 
        this.triggerPopUp(1), 
        3500
      );
    };
    setInterval(() =>
      this.gameLoop(),
    200
    );
  }

  //pop ups
  triggerPopUp(number){
    this.setState({
      popUp: number
    });
    setTimeout(() => 
      {this.clearPopUp();
      if(number === 1){
        setTimeout(() =>
          this.triggerPopUp(10),
          2500
        );
      }}, 
      2500
    );
  }

  clearPopUp() {
    this.setState({
      popUp: null
    });
  }

  pauseGame(){
    if (this.props.game.gameState == 'active') {
      this.handleChangeGameState('paused');
    } else if (this.props.game.gameState == 'paused') {
      this.handleChangeGameState('active');
    };
  }

  handleChangeGameState(newGameState){
    this.props.dispatch(gameModule.changeGameState(newGameState));
  }

//create map
  generateMapFromTemplate(){
    let mapsTemplate = roomConsts.maps[1];
    for(let i = 0; i < mapsTemplate.length; i++){
      this.props.dispatch(mapsModule.addMapSquare(i, mapsTemplate[i]));
    };
  }

//Create Rooms
  generateRoomFromTemplate = () => {
    let branch = this.props.game.branch;
    let room = this.props.game.roomId;
    let roomTemplate = roomConsts.rooms[branch][room];
    for(let i = 0; i < roomTemplate.length; i++){
      this.handleAddingSquareToRoom(i+1, roomTemplate[i]);
    };
    if(this.state.load === true) {
      this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand['north']));
      let content = this.props.currentRoom[this.props.player.location].content;
      content.push(['player']);
      this.props.dispatch(roomModule.updateContent(this.props.player.location, content));
      this.setState({
        load: false
      });
    }
    this.setAlerts();
    if(this.props.game.previousRoomId !== null && this.props.game.gameState !== "postSpecialRoom") {
      setTimeout(() =>
      {this.handleChangeGameState("active");
      this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      600
      );
    };
    //set music
    if(this.props.game.roomId == 1 && this.props.game.branch !== 3) {
      this.props.dispatch(soundsModule.changeMusic('intro'));
    } else if(this.props.game.roomId == 4 && this.props.game.branch !== 3) {
      this.props.dispatch(soundsModule.changeMusic('machine'));
    } else if(this.props.game.branch !== 3) {
      this.props.dispatch(soundsModule.changeMusic('bgm1'));
    } else {
      this.props.dispatch(soundsModule.changeMusic('spookyTitle'));
    };
    if(this.props.game.roomId == 4 && this.props.player.items.includes('keyCard2') && this.props.game.branch === 2) {
      this.props.dispatch(roomModule.updateSprite(133, roomConsts.sprites['theMachineOn']));
      this.props.dispatch(roomModule.updateValue(109, '%', roomConsts.sprites['warp']));
    };
    if(this.props.game.roomId === 8 && this.props.game.branch === 3){
      this.props.dispatch(gameModule.toggleLights('off'));
    };
  }

  generateSpecialRoom(){
    let roomTemplate = roomConsts.rooms[0][this.props.game.roomId];
    for(let i = 0; i < roomTemplate.length; i++){
      this.handleAddingSquareToSpecialRoom(i+1, roomTemplate[i]);
    };
    this.setAlerts();
    let roomTransitionTimer = setTimeout(() =>
    {this.handleChangeGameState("active");
    this.props.dispatch(soundsModule.changeMusic('array'));
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      600
    );
    if(this.props.game.roomId === 3){
      setTimeout(() => {
        this.props.dispatch(soundsModule.changeEffect('phone'));
        this.props.dispatch(roomModule.updateSprite(70, roomConsts.sprites['phoneRing']))
        this.props.dispatch(roomModule.updateContent(71, [['interact', 'phone1']]));
      }, 8000);
    }
  }

  handleAddingSquareToSpecialRoom(thisSquareId, squareArr) {
    let squareValue = squareArr[0];
    let squareImage = '';
    let content = [];
    let sprite = '';
    let transition = '';
    let alert = false;
    //set initial player location
    if (squareValue == '1') {
      this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
      sprite = playerConsts.sprites.stand['south'];
      content.push(['player']);
      this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      squareImage = roomConsts.sprites['white'];
    } else if (squareValue == 'T'){
      if(squareArr[1] === 'terminal'){
        sprite = roomConsts.sprites['phone'];
        content.push(['interact', squareArr[2]]);
        squareImage = roomConsts.sprites['white'];
      } else {
        sprite = roomConsts.sprites[squareArr[1]];
        content.push(['interact', squareArr[2]]);
      }
    } else if (squareValue === 'BG'){
      squareValue = 'W';
      sprite = roomConsts.sprites['fireplace'];
    } else if (squareValue === 'W'){
      squareImage = roomConsts.sprites[squareArr[1]];
    } else if (squareValue == 'D') {
      content.push(['door', squareArr[1]]);
      let status = 'open';
      //check if it's the door the player entered from, if so add player and set respawn point
      if (squareArr[2] == this.props.game.previousRoomId && this.props.game.gameState !== 'postSpecialRoom' && this.state.load === false) {
        let difference = helpers.getDifference(helpers.reverseDirection(squareArr[4]));
        this.props.dispatch(gameModule.setRespawnPoint(thisSquareId + difference));
        status = 'open';
        sprite = playerConsts.sprites.stand[helpers.reverseDirection(squareArr[4])];
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      };
      //check if door exists in state, if not, create it
      if (!this.props.doors.hasOwnProperty(squareArr[1])) {
        //id, location, leadsTo, locked/open, direction
        this.props.dispatch(doorsModule.createDoor(squareArr[1], thisSquareId, squareArr[2], status, squareArr[3], squareArr[4]));
      };
      squareImage = roomConsts.sprites['white'];
    } else if (squareValue === '0') {
      squareImage = roomConsts.sprites['white'];
    };
    this.props.dispatch(roomModule.addSquare(thisSquareId, squareValue, content, squareImage, sprite, transition, alert));
  }

  setAlerts(){
    let squareArr = Object.values(this.props.currentRoom);
    //set objects
    let filteredSquareArrT = squareArr.filter(function(square) {
      return square.value == 'T';
    });
    filteredSquareArrT.forEach(square => {
      let text = square.content.find(function(content) {
        return content[0] == 'interact';
      });
      if (text !== undefined) {
        let contentArr = this.props.currentRoom[square.squareId + 1].content;
        contentArr.push(text);
        this.props.dispatch(roomModule.updateContent(square.squareId + 1, contentArr));
        this.props.dispatch(roomModule.toggleAlert(square.squareId + 1, true));
      };
    });
    //set npcs
    let filteredSquareArrN = squareArr.filter(function(square) {
      return square.value == 'NPC';
    });
    filteredSquareArrN.forEach(square => {
      let npcArr = square.content.find(function(content) {
        return content[0] == 'npc';
      });
      if(npcArr !== undefined){
        let contentArr = this.props.currentRoom[square.squareId + 1].content;
        contentArr.push(npcArr[1]);
        this.props.dispatch(roomModule.updateContent(square.squareId + 1, contentArr));
        this.props.dispatch(roomModule.toggleAlert(square.squareId + 1, true));
      };
    });
    //set doors
    let filteredSquareArrD = squareArr.filter(function(square) {
      return square.value == 'D';
    });
    filteredSquareArrD.forEach(square => {
      let doorArr = square.content.find(function(content) {
        return content[0] == 'door';
      });
      let door = this.props.doors[doorArr[1]];
      if (door.direction == 'north') {
        //front
        let contentArr = this.props.currentRoom[square.squareId + 1].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId + 1, contentArr));
        //back
        if(square.squareId - 1 > 0){
          contentArr = this.props.currentRoom[square.squareId - 1].content;
          contentArr.push(['doorTrigger', door.doorId]);
          this.props.dispatch(roomModule.updateContent(square.squareId - 1, contentArr));
        }
      } else if (door.direction == 'east') {
        //front
        let contentArr = this.props.currentRoom[square.squareId - 13].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId - 13, contentArr));
        //back
        if(square.squareId + 13 < 157) {
          contentArr = this.props.currentRoom[square.squareId + 13].content;
          contentArr.push(['doorTrigger', door.doorId]);
          this.props.dispatch(roomModule.updateContent(square.squareId + 13, contentArr));
        }
      } else if (door.direction == 'south') {
        //front
        let contentArr = this.props.currentRoom[square.squareId - 1].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId - 1, contentArr));
        //back
        if(square.squareId + 1 < 157) {
          contentArr = this.props.currentRoom[square.squareId + 1].content;
          contentArr.push(['doorTrigger', door.doorId]);
          this.props.dispatch(roomModule.updateContent(square.squareId + 1, contentArr));
        }
      } else if (door.direction == 'west') {
        //front
        let contentArr = this.props.currentRoom[square.squareId + 13].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId + 13, contentArr));
        //back
        if(square.squareId - 13 > 0){
          contentArr = this.props.currentRoom[square.squareId - 13].content;
          contentArr.push(['doorTrigger', door.doorId]);
          this.props.dispatch(roomModule.updateContent(square.squareId - 13, contentArr));
        }
      };
    });
  }

  nullAll() {
    let timers = this.props.game.timers;
    timers.forEach(timer => {
      clearInterval(timer);
    });
    if(this.props.player.cloneLocation !== null){
      this.merge();
    };
    this.props.dispatch(gameModule.clearTimers());
    this.props.dispatch(gameModule.toggleNorth(false));
    this.props.dispatch(gameModule.toggleEast(false));
    this.props.dispatch(gameModule.toggleWest(false));
    this.props.dispatch(gameModule.toggleSouth(false));
    this.props.dispatch(enemiesModule.nullAllEnemies());
    this.props.dispatch(blocksModule.nullAllBlock());
    this.props.dispatch(switchesModule.nullAllSwitches());
    this.props.dispatch(platformsModule.nullAllPlatforms());
    this.props.dispatch(npcsModule.nullNPCs());
    this.props.dispatch(roomModule.nullRoom());
  }

  handleAddingSquareToRoom(thisSquareId, squareArr) {
    let squareValue = squareArr[0];
    let squareImage;
    let content = [];
    let sprite = '';
    let transition = '';
    let alert = false;
    //set initial player location
    if (squareValue == '1' && this.props.game.previousRoomId == null) {
      this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
      sprite = playerConsts.sprites.stand['south'];
      content.push(['player']);
      this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      squareImage = roomConsts.sprites['tile'];
    //create door
    } else if (squareValue == 'D') {
      content.push(['door', squareArr[1]]);
      let status;
      if(thisSquareId === this.props.player.location){
        status = 'open';
      } else {
        status = 'closed';
      };
      //check if it's the door the player entered from, if so add player and set respawn point
      if (squareArr[2] == this.props.game.previousRoomId && this.props.game.gameState !== 'postSpecialRoom' && this.state.load === false) {
        let difference = helpers.getDifference(helpers.reverseDirection(squareArr[4]));
        this.props.dispatch(gameModule.setRespawnPoint(thisSquareId + difference));
        status = 'open';
        sprite = playerConsts.sprites.stand[helpers.reverseDirection(squareArr[4])];
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      };
      if(this.props.game.gameState === 'postSpecialRoom'){
        this.props.dispatch(gameModule.setRespawnPoint(110));
      };
      //check if door exists in state, if not, create it
      if (!this.props.doors.hasOwnProperty(squareArr[1])) {
        //id, location, leadsTo, locked/open, direction
        this.props.dispatch(doorsModule.createDoor(squareArr[1], thisSquareId, squareArr[2], status, squareArr[3], squareArr[4]));
      };
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites['spookyTile'];
      } else {
        squareImage = roomConsts.sprites['tile'];
      };
    //create lava
    } else if (squareValue == 'L') {
      if (this.props.currentRoom[thisSquareId - 1].value !== 'L' && this.props.currentRoom[thisSquareId - 1].value !== 'F'){
        squareImage = roomConsts.sprites['lava'];
      } else {
        squareImage = roomConsts.sprites['lava2']
      };
    //create eyeball
    } else if (squareValue == 'i') {
      this.props.dispatch(gameModule.setEye('alive'));
    //create pit
    } else if (squareValue == 'P') {
      if (this.props.currentRoom[thisSquareId - 1].value !== 'P' && this.props.currentRoom[thisSquareId - 1].value !== 'F'){
        squareImage = roomConsts.sprites['pit'];
      } else {
        squareImage = roomConsts.sprites['pit2']
      };
    //create wall
    } else if (squareValue == 'W') {
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites[squareArr[1] + 'Spooky'];
      } else {
        squareImage = roomConsts.sprites[squareArr[1]];
      };
    //create item tile
    } else if (squareValue == '$') {
      if (this.props.player.items.includes(squareArr[2]) || this.props.player.weapons.includes(squareArr[2])) {
        squareValue = '0';
      } else {
        content.push([squareArr[1], squareArr[2]]);
      };
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites['spookyTile'];
      } else {
        squareImage = roomConsts.sprites['tile'];
      };
    //create breakable tile
    } else if (squareValue === 'F'){
      squareImage = roomConsts.sprites['fragile'];
    //create conveyer belt
    } else if (squareValue == 'C') {
      squareImage = roomConsts.sprites[squareArr[1] + 'Belt'];
      content.push(['belt', squareArr[1]]);
    //create moving tile
    } else if (squareValue == 'M' || squareValue == 'MB') {
      let contentId = squareArr[1];
      content.push(['platform', contentId]);
      let direction = squareArr[2];
      if (direction == 'north' || direction == 'south'){
        squareImage = squareImage = roomConsts.sprites['platformOffNS'];
      } else {
        squareImage = roomConsts.sprites['platformOffEW'];
      };
      this.props.dispatch(platformsModule.createPlatform(contentId, thisSquareId, thisSquareId, direction, false));
    //create switch
    } else if (squareValue == 'S') {
      let contentId = v4();
      let effectId = squareArr[1];
      let effectType;
      if (squareArr[2] == 'd') {
        effectType = 'door';
      } else if (squareArr[2] == 'e') {
        effectType = 'event';
      } else {
        effectType = 'platform';
      };
      let timer = squareArr[3];
      let switchType;
      if (squareArr[4] == 'p') {
        switchType = 'pressure';
      } else {
        switchType = 'elecSwitch';
      };
      if (switchType == 'pressure') {
        squareImage = roomConsts.sprites['switchOff'];
        content.push(['switch', contentId]);
      } else {
        squareImage = roomConsts.sprites['tile'];
        sprite = roomConsts.sprites['elecSwitchOff'];
        content.push(['elecSwitch', contentId]);
      };
      this.props.dispatch(switchesModule.createSwitch(contentId, thisSquareId, false, effectId, effectType, timer, switchType));
    } else if (squareValue == 'T'){
      //square contains text
      let type = squareArr[1];
      if (type === 'save' && this.props.flags['bootUp1'].triggered == false) {
        squareValue = '0';
        if(this.props.game.branch !== 3) {
          squareImage = roomConsts.sprites['tile'];
        } else {
          squareImage = roomConsts.sprites['spookyTile'];
        }
      } else if (type === 'terminal' || type === 'sign') {
        //create terminal
        squareImage = roomConsts.sprites[type];
        content.push(['interact', squareArr[2]]);
      } else if (type == 'machineRight' || type == 'machineLeft' || type == 'spookyMachineRight' || type == 'spookyMachineLeft' || type === 'terminalOff' || type === 'spookyTerminal' || type === 'mapTerminal') {
        squareImage = roomConsts.sprites[type];
        content.push(['interact', type]);
      } else if (type !== 'extend') {
        //create examinable object
        if(this.props.game.branch !== 3) {
          squareImage = roomConsts.sprites['tile'];
        } else {
          squareImage = roomConsts.sprites['spookyTile'];
        }
        sprite = roomConsts.sprites[type];
        content.push(['interact', type]);
      }
    //void square
    } else if (squareValue == 'V') {
      squareImage = '';
    //create warp square
    } else if (squareValue == '@') {
      squareImage = roomConsts.sprites[squareArr[2]];
      content.push(['warp', squareArr[1]]);
    //create exit portal
    } else if (squareValue == '%off') {
      squareImage = roomConsts.sprites['warp'];
      if(this.props.game.gameState == 'postExitBranch') {
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      }
    } else if (squareValue === '<>'){
      sprite = roomConsts.sprites['crystal'];
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites['spookyTile'];
      } else {
        squareImage = roomConsts.sprites['tile'];
      }
    } else {
      let rng = Math.floor(Math.random() * 2);
      if (this.props.game.branch == 3) {
        if (rng > 0) {
          squareImage = roomConsts.sprites['spookyTile'];
        } else {
          squareImage = roomConsts.sprites['spookyTile2'];
        };
      } else {
        if (rng > 0) {
          squareImage = roomConsts.sprites['tile'];
        } else {
          squareImage = roomConsts.sprites['tile2'];
        };
      }
    }
    //spawn enemy
    if (squareValue == 'E') {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, squareArr[1]);
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      content.push(['enemy', newEnemyId]);
    };
    //spawn NPC
    if (squareValue === 'NPC') {
      this.props.dispatch(npcsModule.createNPC(squareArr[1], thisSquareId, squareArr[2], squareArr[3], squareArr[4]));
      content.push(['npc', squareArr[1]]);
    }
    //spawn block
    if (squareValue == 'B' || squareValue == 'MB') {
      sprite = roomConsts.sprites['block'];
      let contentId = v4();
      content.push(['block', contentId]);
      this.props.dispatch(blocksModule.createBlock(contentId, thisSquareId));
    };
    this.props.dispatch(roomModule.addSquare(thisSquareId, squareValue, content, squareImage, sprite, transition, alert));
  }

//Handle Movement
  move(direction, originalLocation){
    //prevent moving in opposite direction as belt
    let content = this.props.currentRoom[originalLocation].content;
    let beltArr;
    if (content !== undefined) {
      beltArr = this.props.currentRoom[originalLocation].content.find(function(content) {
        return content[0] == 'belt';
      });
    };
    if (beltArr !== undefined && beltArr[1] == helpers.reverseDirection(direction) && this.props.currentRoom[originalLocation].value === 'C') {
      this.props.dispatch(playerModule.updatePlayerStatus('normal'));
    } else if (this.exitCheck(direction, originalLocation) !== 'exit') {
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.props.dispatch(playerModule.updatePlayerDirection(direction));
      this.props.dispatch(roomModule.updateSprite(originalLocation, playerConsts.sprites.stand[direction]));
      //check if move is legal, if not return original location
      let canMove = this.attemptMove(direction, originalLocation);
      //if move is legal and didn't cause any secondary effects...
      if (canMove !== originalLocation) {
        //check for effects of landing on new square
        let squareCheck = this.playerSquareCheck(canMove, direction);
        if (squareCheck == 'moved' || squareCheck == 'slide'){
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(originalLocation, '', '');
          if (squareCheck == 'moved'){
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.walk[direction + '2'], direction + "Enter");
          } else {
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[this.props.player.direction], this.props.player.direction + "Enter");
          };
          let spriteExitTimer = setTimeout(() =>
            {this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[this.props.player.direction], '');
            // if(canMove === 129 && this.props.game.roomId === 3 && this.props.flags[7].triggered === true && this.props.flags[8].triggered === false) {
            //   this.triggerEvent(8, 'A');
            // };
            // if(canMove === 73 && this.props.game.roomId === 4 && this.props.flags[9].triggered === false) {
            //   this.props.dispatch(npcsModule.createNPC('slime', 86, 'east', 'ghost1'));
            //   this.triggerEvent(9, 'A');
            // };
            // if(canMove === 110 && this.props.currentRoom[109].value === '%' && this.props.flags[10].triggered === false) {
            //   this.triggerEvent(10, 'A');
            // };
            // if(canMove === 110 && this.props.game.roomId === 4 && this.props.game.branch === 2 && this.props.flags[11].triggered === false) {
            //   this.props.dispatch(npcsModule.createNPC('slime', 111, 'north', 'ghost1'));
            //   this.triggerEvent(11, 'A');
            // };
            // if(canMove === 110 && this.props.game.roomId === 4 && this.props.game.branch === 2 && this.props.flags[12].triggered === true && this.props.flags[13].triggered === false) {
            //   this.props.dispatch(npcsModule.createNPC('slime', 111, 'north', 'ghost1'));
            //   this.triggerEvent(13, 'A');
            // };
            // if(canMove === 110 && this.props.game.roomId === 4 && this.props.game.branch === 3 && this.props.flags[14].triggered === false) {
            //   // this.triggerEvent(14, 'A');
            //   this.props.dispatch(roomModule.updateSprite(133, roomConsts.sprites['theMachine']));
            //   this.props.dispatch(roomModule.updateValue(109, '%off', roomConsts.sprites['warp']));
            // };
            if(this.props.game.roomId === 8 && this.props.game.branch === 3 && this.props.boss.status === 'none'){
              this.props.dispatch(doorsModule.updateDoorLock('8-A', true));
              this.createBoss();
            };
            if(this.props.game.roomId === 1 && this.props.game.branch === 3 && this.props.flags['clone'].triggered === false){
              this.props.dispatch(flagsModule.triggerFlag('clone'));
              this.props.dispatch(roomModule.updateValue(97, '2', roomConsts.sprites['spookyTile']));
              this.handleUpdateSprite(97, playerConsts.sprites.stand['southGray'], 'spriteFadeIn');
              this.props.dispatch(roomModule.updateContent(97, [['syncText', 'sync4']]));
            }
            if(squareCheck == 'slide') {
              this.move(this.props.player.direction, this.props.player.location);
              this.props.dispatch(playerModule.updatePlayerStatus('sliding'));
            } else {
              this.props.dispatch(playerModule.updatePlayerStatus('normal'));
            }},
            50
          );
        } else if (squareCheck == 'stopped') {
          this.props.dispatch(playerModule.updatePlayerStatus('normal'));
        }
      } else {
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      }
    }
  }

  exitCheck(direction, location){
    if (this.props.currentRoom[location].value == 'D'){
      let content = this.props.currentRoom[location].content.find(function(content) {
        return content[0] == 'door';
      });
      let door = this.props.doors[content[1]];
      if (direction == door.direction && door.leadsTo !== 0) {
        this.changeRoom(door);
        return 'exit';
      }
    }
  };

  dash() {
    this.props.dispatch(playerModule.updatePlayerStatus('dash'));
    this.props.dispatch(soundsModule.changeEffect('teleport'));
    let direction = this.props.player.direction;
    let squareCheck;
    for (let i = 0; i < 4; i++) {
      let originalLocation = this.props.player.location;
      let canMove = this.attemptMove(direction, originalLocation);
      let next;
      squareCheck = this.playerSquareCheck(canMove, direction);
      if (squareCheck == 'slide') {
        this.move(direction, originalLocation);
        break;
      } else if (canMove !== originalLocation && squareCheck == 'moved') {
        //check for effects of landing on new square
        if (this.props.currentRoom[canMove].content == 'enemy') {
          let enemyId = this.props.currentRoom[canMove].contentId;
          this.handleEnemyDamage('dash', direction, this.props.currentRoom[canMove].contentId);
        } else {
          //update player and new square
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(canMove, playerConsts.sprites.dash[direction], direction + 'Enter');
          next = this.attemptMove(direction, canMove);
          let afterImageTimer = setTimeout(() =>
            this.handleUpdateSprite(originalLocation, '', ''),
            200
          );
        }
      } else if (squareCheck === 'warped' || squareCheck === 'knockback') {
        break;
      } else if (squareCheck === 'stopped') {
        //if player can't move, just trigger animation in current square
        this.props.dispatch(roomModule.updateSprite(originalLocation, playerConsts.sprites.dash[direction]));
        break;
      }
    }
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
    let spriteClearTimer = setTimeout(() =>
    {if (squareCheck !== 'fall') {
      this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '')
    };
    if(squareCheck === 'knockback'){
      this.knockBack(helpers.reverseDirection(this.props.player.direction))
    };
    if(this.props.currentRoom[this.props.player.location].value === 'P' || this.props.currentRoom[this.props.player.location].value === 'L'){
      this.fall(this.props.player.location)
    };},
      400
    );
  }

  clone(){
    if(this.props.player.cloneLocation === null) {
      if(this.props.player.magic < 50){
        //sound
      } else {
        let newMagic = this.props.player.magic - 50;
        this.props.dispatch(playerModule.updatePlayerMagic(newMagic))
        this.props.dispatch(soundsModule.changeEffect('teleport'));
        this.props.dispatch(playerModule.updateClone(this.props.player.location, this.props.player.direction));
      };
    } else {
      this.swap();
    };
  }

  swap(){
    this.props.dispatch(soundsModule.changeEffect('warpPad'));
    let playerLocation = this.props.player.location;
    let playerDirection = this.props.player.direction
    let cloneLocation = this.props.player.cloneLocation;
    let cloneDirection = this.props.player.cloneDirection;
    //change inactive clone to player
    this.props.dispatch(playerModule.updatePlayerLocation(cloneLocation));
    this.props.dispatch(playerModule.updatePlayerDirection(cloneDirection));
    this.props.dispatch(roomModule.updateSprite(playerLocation, ''));
    let previousContentArr =  this.props.currentRoom[playerLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'player';
    });
    this.props.dispatch(roomModule.updateContent(playerLocation, filteredContentArr));
    let newContentArr = this.props.currentRoom[cloneLocation].content;
    newContentArr.push(["player"]);
    this.props.dispatch(roomModule.updateContent(cloneLocation, newContentArr));
    //change player into inactive clone
    this.props.dispatch(playerModule.updateClone(playerLocation, playerDirection));
    let selected;
    if(this.props.player.activeClone === 1){
      this.props.dispatch(playerModule.switchActiveClone(2));
    } else {
      this.props.dispatch(playerModule.switchActiveClone(1));
    };
    this.props.dispatch(roomModule.updateSprite(cloneLocation, playerConsts.sprites.stand[cloneDirection]));
  }

  merge(){
    this.props.dispatch(soundsModule.changeEffect('teleport'));
    this.props.dispatch(playerModule.updateClone(null, null));
    this.props.dispatch(playerModule.switchActiveClone(1));
    let newMagic = this.props.player.magic + 50;
    this.props.dispatch(playerModule.updatePlayerMagic(newMagic));
  }
  
  useSkill(){
    if(this.props.player.currentSkill === 'dash'){
      if(this.props.player.magic < 40){
        //sound
      } else {
        let newMagic = this.props.player.magic - 40;
        this.props.dispatch(playerModule.updatePlayerMagic(newMagic))
        this.dash();
      };
    } else {
      this.clone();
    }
  }


  attack() {
    let direction = this.props.player.direction;
    let playerLocation = this.props.player.location;
    let name = this.props.player.currentWeapon;
    let range = itemConsts.weapons[this.props.player.currentWeapon].range;
    let startPoint = this.attemptMove(direction, playerLocation);
    this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
    if (name == 'Taser') {
      this.props.dispatch(soundsModule.changeEffect(''));
      this.props.dispatch(soundsModule.changeEffect('taser'));
    } else {
      this.props.dispatch(soundsModule.changeEffect(''));
      this.props.dispatch(soundsModule.changeEffect('cryo'));
    };
    let newSprite = playerConsts.sprites.attack[this.props.player.direction];
    this.props.dispatch(roomModule.updateSprite(this.props.player.location, newSprite));
    let hasEnemy = this.props.currentRoom[startPoint].content.find(function(content) {
      return content[0] == 'enemy';
    });
    let hasElecSwitch = this.props.currentRoom[startPoint].content.find(function(content) {
      return content[0] == 'elecSwitch';
    });
    if (name == 'Cryostat' && this.props.currentRoom[startPoint].value === 'P') {
      this.coolWater(startPoint);
    };
    if (startPoint !== playerLocation && this.props.currentRoom[startPoint].value !== 'D' && this.props.currentRoom[startPoint].value !== '<>') {
      if (hasEnemy !== undefined) {
        this.handleEnemyDamage(name, direction, hasEnemy[1]);
      } else if ((name == 'Taser' || name == 'Cryostat') && this.props.currentRoom[startPoint].value == 'boss'){
        this.handleBossDamage();
      } else if (name == 'Taser' && hasElecSwitch !== undefined) {
        this.handleSwitch(hasElecSwitch[1]);
      // } else if (name == 'Cryostat' && this.props.currentRoom[startPoint].value === 'L') {
      //   this.coolLava(startPoint);
      } else if (this.props.currentRoom[startPoint].value == 'i') {
          this.props.dispatch(gameModule.setEye('hurt'));
          let setExplosionTimer = setTimeout(() =>
            this.props.dispatch(gameModule.setEye('none')),
            500
          );
      } else {
        let newSprite;
        if (name == 'Taser') {
          newSprite = itemConsts.weapons[this.props.player.currentWeapon].sprites['projectile'];
        } else {
          if (direction == 'north' || direction == 'south') {
            newSprite = itemConsts.weapons[this.props.player.currentWeapon].sprites['projectileNS'];
          } else {
            newSprite = itemConsts.weapons[this.props.player.currentWeapon].sprites['projectileEW'];
          };
        };
        this.props.dispatch(roomModule.updateSprite(startPoint, newSprite));
        let projectileTimer = setTimeout(() =>
          this.handleProjectile(name, direction, startPoint, range, newSprite),
          100
        );
      };
    };
    let coolDownTimer = setTimeout(() => {
      this.props.dispatch(gameModule.toggleFire(false));
      this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      500
    );
  }

  knockBack(knockBackDirection) {
    if(this.props.player.cloneLocation !== null) {
      this.swap();
      this.merge();
      let newHealth = this.props.player.health -= 10;
      this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
      this.playerHealthCheck();
      if (this.props.player.health > 0) {
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      };
    } else {
      this.props.dispatch(playerModule.updatePlayerStatus('knockback'));
      this.props.dispatch(soundsModule.changeEffect('hit'));
      this.props.dispatch(playerModule.updatePlayerDirection(knockBackDirection));
      let direction = this.props.player.direction;
      let newHealth = this.props.player.health -= 10;
      this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
      this.playerHealthCheck();
      if (this.props.player.health > 0) {
        let originalLocation = this.props.player.location;
        //check if player can be knocked back in this direction
        let canMove = this.attemptMove(knockBackDirection, originalLocation);
        if (canMove == originalLocation) {
          let reverse = helpers.reverseDirection(knockBackDirection)
          let canMoveReverse = this.attemptMove(reverse, originalLocation + helpers.getDifference(reverse));
          //search for valid alternative knockback direction
          if (knockBackDirection == 'north' || knockBackDirection == 'south') {
            let canMoveEast = this.attemptMove('east', originalLocation);
            let canMoveWest = this.attemptMove('west', originalLocation);
            if (canMoveEast !== originalLocation) {
              canMove = canMoveEast;
            } else if (canMoveWest !== originalLocation) {
              canMove = canMoveWest;
            } else if (canMoveReverse !== originalLocation) {
              canMove = canMoveReverse;
            };
          } else if (knockBackDirection == 'east' || knockBackDirection == 'west') {
            let canMoveNorth = this.attemptMove('north', originalLocation);
            let canMoveSouth = this.attemptMove('south', originalLocation);
            if (canMoveNorth !== originalLocation) {
              canMove = canMoveNorth;
            } else if (canMoveSouth !== originalLocation) {
              canMove = canMoveSouth;
            } else if (canMoveReverse !== originalLocation) {
              canMove = canMoveReverse;
            };
          };
        }
        //recheck if player can move
        if (canMove !== originalLocation && this.props.currentRoom[canMove].value !== 'L' && this.props.currentRoom[canMove].value !== 'boss') {
          let squareCheck = this.playerSquareCheck(canMove, direction);
          if (squareCheck === 'moved' || squareCheck === 'slide'){
            this.handleUpdatePlayerLocation(originalLocation, canMove);
            this.handleUpdateSprite(originalLocation, '', '');
            this.handleUpdateSprite(canMove, playerConsts.sprites.knockback[direction], knockBackDirection + 'Enter');
              let spriteExitTimer = setTimeout(() =>
                {this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '');
                if(squareCheck == 'slide') {
                  this.move(direction, canMove);
                  this.props.dispatch(playerModule.updatePlayerStatus('sliding'));
                } else {
                  this.props.dispatch(playerModule.updatePlayerStatus('normal'));
                }},
                400
              );
            } else if (squareCheck !== 'fall') {
              this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.knockback[direction]));
            };
          } else {
          this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.knockback[direction]);
          setTimeout(() => {
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '');
            this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
          400);
          };
        };
      };
    }

  handleUpdatePlayerLocation(originalLocation, newLocation) {
    let previousContentArr =  this.props.currentRoom[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'player';
    });
    this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
    let newContentArr = this.props.currentRoom[newLocation].content;
    newContentArr.push(["player"]);
    this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
    this.props.dispatch(playerModule.updatePlayerLocation(newLocation));
    //check to trigger close door animation
    let trigger = previousContentArr.find(function(content) {
      return content[0] == 'doorTrigger';
    });
    let door = newContentArr.find(function(content) {
      return content[0] == 'door';
    });
    //if new spot isn't a door, but previous was a trigger, close door
    if (trigger !== undefined && door == undefined && this.props.game.special === false){
      if (this.props.doors[trigger[1]].status !== 'closed' && this.checkForClone(this.props.doors[trigger[1]]) === false && this.props.game.branch !== 0) {
        this.closeDoor(trigger[1]);
      };
      //trigger first event flag
        if (this.props.flags['bootUp1'].triggered == false) {
          setTimeout(() =>
            this.triggerEvent('bootUp1'),
          1000);
        };
    }
    //check if player was standing on a switch
    let hasSwitch = previousContentArr.find(function(content) {
      return content[0] == 'switch';
    });
    if (hasSwitch !== undefined && originalLocation !== this.props.player.cloneLocation) {
      this.startSwitchCountdown(hasSwitch[1]);
    };
    //check if player was standing on fragile tile
    if (this.props.currentRoom[originalLocation].value === 'F') {
      this.props.dispatch(soundsModule.changeEffect('shatter'));
      this.props.dispatch(roomModule.setTileOverlay(originalLocation, 'fragileBreak'));
      let squareImage;
      if (this.props.currentRoom[originalLocation - 1].value !== 'P'){
        squareImage = roomConsts.sprites['pit'];
      } else {
        squareImage = roomConsts.sprites['pit2'];
      };
      this.props.dispatch(roomModule.updateValue(originalLocation, 'P', squareImage))
      setTimeout(() => 
        this.props.dispatch(roomModule.setTileOverlay(originalLocation, 'none')),
      500);
    };
    //check if player was standing on broken crystal
    if(this.props.currentRoom[originalLocation].value === '<') {
      this.respawnCrystal(originalLocation);
    };
  }

  checkForClone(door){
    let doorLocation = door.location;
    let doorFront;
    let doorBack;
    if(door.direction === 'north' || door.direction === 'south'){
      doorFront = doorLocation + 1;
      doorBack = doorLocation - 1;
    } else if (door.direction === 'east' || door.direction === 'west'){
      doorFront = doorLocation + 13;
      doorBack = doorLocation - 13;
    };
    if(this.props.player.cloneLocation === doorLocation || this.props.player.cloneLocation === doorFront || this.props.player.cloneLocation === doorBack){
      return true;
    } else {
      return false;
    }
  }

  handleUpdateSprite(location, sprite, direction) {
    this.props.dispatch(roomModule.updateSprite(location, sprite));
    this.props.dispatch(roomModule.updateTransition(location, direction));
  }
  
  warp(warpedItem1, currentLocation, newLocation) {
    this.props.dispatch(soundsModule.changeEffect('warpPad'));
    let warpSprite1;
    let postWarpSprite1;
    //prevent player movement during animation
    this.props.dispatch(gameModule.changeGameState('cutscene'));
    //set new object entering warp
    if (warpedItem1 == 'player') {
      let direction = this.props.player.direction;
      warpSprite1 = playerConsts.sprites.dash[direction];
      postWarpSprite1 = playerConsts.sprites.stand[direction];
    } else {
      warpSprite1 = roomConsts.sprites['blockWarp'];
      postWarpSprite1 = roomConsts.sprites['block'];
    };
    //set object on other side of warp
    let warpSprite2;
    let postWarpSprite2;
    let warpedItem2 = this.props.currentRoom[newLocation].content.find(function(content) {
      return content[0] !== "warp";
    });
    if (warpedItem2 !== undefined) {
      if(warpedItem2 == 'player') {
        let direction = this.props.player.direction;
        warpSprite2 = playerConsts.sprites.dash[direction];
        postWarpSprite2 = playerConsts.sprites.stand[direction];
      } else {
        warpSprite2 = roomConsts.sprites['blockWarp'];
        postWarpSprite2 = roomConsts.sprites['block'];
      };
    };
    //switch to warp sprite(s)
    this.handleUpdateSprite(currentLocation, warpSprite1, '');
    if (warpSprite2 !== undefined) {
      this.handleUpdateSprite(newLocation, warpSprite2, '');
    } else {
      //add another warp sprite to new location (if empty)
      let seeingDoubleTimer = setTimeout(() =>
        this.handleUpdateSprite(newLocation, warpSprite1, ''),
      300
      );
    };
    //clear sprite from old location, change sprite in current location to normal
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(currentLocation, '', '');
      this.handleUpdateSprite(newLocation, postWarpSprite1, '');
      if (warpedItem1 == 'player') {
        //switch player location
        this.handleUpdatePlayerLocation(currentLocation, newLocation);
        this.props.dispatch(soundsModule.changeEffect(''));
      } else {
        //clear block from previous location 
        let oldContent = this.props.currentRoom[currentLocation].content;
        let filteredOldContent = oldContent.filter(function(content) {
          return content[1] !== warpedItem1;
        });
        this.props.dispatch(roomModule.updateContent(currentLocation, filteredOldContent));
        //add block to new location
        let newContent = this.props.currentRoom[newLocation].content;
        newContent.push(['block', warpedItem1]);
        this.props.dispatch(roomModule.updateContent(newLocation, newContent));
        this.props.dispatch(blocksModule.updateBlockLocation(warpedItem1, newLocation));
        this.props.dispatch(soundsModule.changeEffect(''));
      };
      //if there is a clone on connected warp
      if(warpedItem1 === 'player' && this.props.player.cloneLocation === newLocation){
        this.merge();
      } else if (this.props.player.cloneLocation === newLocation){
        this.props.dispatch(playerModule.updateClone(currentLocation, this.props.player.cloneDirection));
      };
      //if there is another item on connected warp
      if (postWarpSprite2 !== undefined) {
        this.handleUpdateSprite(currentLocation, postWarpSprite2, '');
        if (warpedItem2[0] == 'player') {
          this.handleUpdatePlayerLocation(newLocation, currentLocation);
          this.props.dispatch(soundsModule.changeEffect(''));
        } else {
          //clear block from previous location 
          let oldContent = this.props.currentRoom[newLocation].content;
          let filteredOldContent = oldContent.filter(function(content) {
            return content[1] !== warpedItem2[1];
          });
          this.props.dispatch(roomModule.updateContent(newLocation, filteredOldContent));
          //add block to new location
          let newContent = this.props.currentRoom[currentLocation].content;
          this.props.dispatch(roomModule.updateContent(currentLocation, filteredOldContent));
          newContent.push(["block", warpedItem2]);
          this.props.dispatch(roomModule.updateContent(currentLocation, newContent));
          this.props.dispatch(blocksModule.updateBlockLocation(warpedItem2, currentLocation));
          this.props.dispatch(soundsModule.changeEffect(''));
          };
      }
      this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      this.props.dispatch(gameModule.changeGameState('active'));},
      400
    );
  }

  fall(pitLocation) {
    this.props.dispatch(playerModule.updatePlayerStatus('falling'));
    this.props.dispatch(soundsModule.changeEffect('hit'));
    this.handleUpdateSprite(this.props.player.location, '');
    this.handleUpdateSprite(pitLocation, playerConsts.sprites.sink);
    this.props.dispatch(playerModule.updatePlayerLocation(pitLocation));
    if(this.props.player.cloneLocation !== null) {
      let spriteClearTimer = setTimeout(() =>
        {this.handleUpdateSprite(pitLocation, '', '');
        this.swap();
        this.merge();
        let newHealth = this.props.player.health -= 10;
        this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
        this.playerHealthCheck();
        if (this.props.player.health > 0) {
          this.props.dispatch(playerModule.updatePlayerStatus('normal'));
        }},
        700
      );
    } else {
      let playerLocation = this.props.player.location;
      //take damage
      let newHealth = this.props.player.health -= 10;
      this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
      this.playerHealthCheck();
      if (this.props.player.health > 0) {
        //clear player from previous square
        let previousContentArr =  this.props.currentRoom[playerLocation].content;
        let filteredContentArr = previousContentArr.filter(function(content) {
          return content[0] !== 'player';
        });
        this.props.dispatch(roomModule.updateContent(playerLocation, filteredContentArr));
        //clear pit and restart player on respawn point
        let spriteClearTimer = setTimeout(() =>
          {this.handleUpdateSprite(pitLocation, '', '');
          this.respawn();},
          1000
        );
      };
    };
  }

  respawn(){
    let respawnPoint = this.props.game.respawnPoint;
    this.props.dispatch(roomModule.updateSprite(respawnPoint, playerConsts.sprites.stand['south']));
    this.props.dispatch(playerModule.updatePlayerLocation(respawnPoint));
    this.playerSquareCheck(respawnPoint);
    let contentArr = this.props.currentRoom[respawnPoint].content;
    contentArr.push(['player']);
    this.props.dispatch(roomModule.updateContent(respawnPoint, contentArr));
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
  }

  playerHealthCheck(){
    if (this.props.player.health <= 0) {
      this.props.dispatch(soundsModule.changeEffect('dead'));
      if(this.props.currentRoom[this.props.player.location].value !== 'P' && this.props.currentRoom[this.props.player.location].value !== 'L'){
        this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.fall));
      }
        setTimeout(() => {
        this.props.dispatch(soundsModule.changeMusic('gameOver'));
        this.handleChangeGameState('gameOver');
      }, 1200);
    };
  }

  //Handle Projectiles
  handleProjectile(name, direction, location, range, sprite) {
    this.projectileLoop(0, name, direction, location, range, sprite);
  }

  projectileMove(direction, originalLocation) {
    //get difference between two spaces
    let difference = helpers.getDifference(direction);
    //and new square id #
    let newLocation = originalLocation + difference;
    //check for pushable block
    let content = this.props.currentRoom[newLocation].content;
    let hasBlock = content.find(function(content) {
      return content[0] == 'block';
    });
    if (hasBlock == undefined
      && this.props.currentRoom[newLocation].value !== '<>'
    && this.props.currentRoom[newLocation].value !== 'D'
    && this.props.currentRoom[newLocation].value !== 'V'
    && this.props.currentRoom[newLocation].value !== 'W'
    && this.props.currentRoom[newLocation].value !== 'T') {
      return newLocation;
    } else {
      return originalLocation;
    };
  }

  projectileLoop(i, name, direction, location, range, sprite) {
      let that = this;
      let canMove = this.projectileMove(direction, location);                                                                                                                                                                                                                                                                                                                                              
      let enemyId;
      this.props.currentRoom[canMove].content.forEach(function(content) {
        if (content.includes('enemy')){
          enemyId = content[1];
        };
      });
      let hasElecSwitch = this.props.currentRoom[canMove].content.find(function(content) {
        return content[0] == 'elecSwitch';
      });
      //cool water
      if (name == 'Cryostat' && this.props.currentRoom[canMove].value === 'P') {
        this.coolWater(canMove);
      };
      //void projectile if it can't progress
      if (location === canMove) {
        this.handleUpdateSprite(location, '', '');
      //damage player
      } else if(this.props.currentRoom[canMove].value === this.props.player.location){
        this.knockBack(direction);
        //damage enemy and void projectile if it hits
      } else if((name == 'Taser' || name == 'Cryostat') && this.props.currentRoom[canMove].value === 'boss'){
        this.handleBossDamage()
      } else if (enemyId !== undefined) {
        this.handleEnemyDamage(name, direction, enemyId);
        this.handleUpdateSprite(location, '', '');
        //check for elec switch
      } else if (name == 'Taser' && hasElecSwitch !== undefined) {
        this.handleSwitch(hasElecSwitch[1]);
        this.handleUpdateSprite(location, '', '');
        //cool lava
      // } else if (name == 'Cryostat' && this.props.currentRoom[canMove].value === 'L') {
      //   this.coolLava(canMove);
      //destroy eyeball
      } else if (this.props.currentRoom[canMove].value == 'i') {
        this.props.dispatch(gameModule.setEye('hurt'));
        let setExplosionTimer = setTimeout(() =>
          this.props.dispatch(gameModule.setEye('none')),
          500
        );
        this.handleUpdateSprite(location, '', '');
      } else {
        //update sprites
        this.handleUpdateSprite(location, '', '');
        this.handleUpdateSprite(canMove, sprite, direction + 'Enter');
        location = canMove;
        setTimeout(function() {
          i++;
          if (i < range) {
            that.projectileLoop(i, name, direction, location, range, sprite);
          }
        }, 200);
      };
      let projectileTimer = setTimeout(() =>
        this.handleUpdateSprite(location, '', ''),
        200
      );
    }

  coolLava(tileNum){
    this.props.dispatch(roomModule.updateValue(tileNum, 'LC', roomConsts.sprites['lava']));
    setTimeout(() => {
      if(this.props.currentRoom[tileNum].value === 'LC'){
        this.props.dispatch(roomModule.updateValue(tileNum, 'L', roomConsts.sprites['lava']));
        if(this.props.player.location === tileNum){
          this.fall(tileNum);
        };
      };
    }, 5000);
  }

  coolWater(tileNum){
    this.props.dispatch(roomModule.setExplosion(tileNum, true));
    this.props.dispatch(roomModule.updateValue(tileNum, 'I', this.props.currentRoom[tileNum].tileImage));
    setTimeout(() => 
      this.props.dispatch(roomModule.setExplosion(tileNum, false)),
    800);
    if(this.props.player.upgradeCryostat === false){
      setTimeout(() => {
        if(this.props.currentRoom[tileNum].value === 'I'){
          this.props.dispatch(roomModule.updateValue(tileNum, 'P', this.props.currentRoom[tileNum].tileImage));
          if(this.props.player.location === tileNum){
            this.fall(tileNum);
          };
        };
      }, 2000);
    };
  }

  handleSwitch(switchId) {
    this.props.dispatch(soundsModule.changeEffect('switchOn'));
    let thisSwitch = this.props.switches[switchId];
    if (thisSwitch.isPushed === false) {
      if (thisSwitch.kind == 'pressure') {
        this.props.dispatch(roomModule.updateValue(thisSwitch.location, 'S', roomConsts.sprites['switchOn']));
      } else {
        this.props.dispatch(roomModule.updateSprite(thisSwitch.location, roomConsts.sprites['elecSwitchOn']));
      };
      this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, true));
      let effectId = this.props.switches[switchId].effectId;
      let effectType = this.props.switches[switchId].effectType;
      if (effectType == 'platform') {
        this.props.dispatch(platformsModule.activatePlatform(effectId, true));
        this.platformStart(effectId);
      } else if (effectType == 'event') {
        if(effectId == 'machine') {
          this.props.dispatch(roomModule.updateSprite(133, roomConsts.sprites['theMachineOn']));
          this.props.dispatch(roomModule.updateValue(109, '%', roomConsts.sprites['warp']));
        } else if (effectId === 'belts'){
          let tiles = [19, 57, 72, 94, 98, 100, 122, 124, 126];
          tiles.forEach(tile => {
            let belt = this.props.currentRoom[tile].content.find(function(content) {
              return content[0] == 'belt';
            });
            let beltDirection = belt[1];
            this.props.dispatch(roomModule.updateValue(tile, '0', roomConsts.sprites[beltDirection + 'Stop']));
          });
        };
      } else {
        this.props.dispatch(doorsModule.updateDoorLock(effectId, false));
      };
    };
  }

  startSwitchCountdown(switchId){
    let thisSwitch = this.props.switches[switchId];
    let switchTimer = setTimeout(() =>
      {this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, false));
      this.props.dispatch(roomModule.updateValue(thisSwitch.location, 'S', roomConsts.sprites['switchOff']));
      this.voidSwitchEffect(thisSwitch);
      this.props.dispatch(soundsModule.changeEffect('switchOff'));},
    thisSwitch.timer
    );
    // if (this.props.game.roomId === 3 && this.props.flags[7].triggered == false) {
    //   setTimeout(() =>
    //     this.triggerEvent(7, 'A'),
    //     1000
    //   );
    // };
  }

  voidSwitchEffect(thisSwitch) {
    if(thisSwitch.location !== this.props.player.location){
      if (thisSwitch.effectType == 'door') {
        this.props.dispatch(doorsModule.updateDoorStatus(thisSwitch.effectId, 'closed'));
        this.props.dispatch(doorsModule.updateDoorLock(thisSwitch.effectId, true));
      } else if (thisSwitch.effectId == 'machine') {
        this.props.dispatch(soundsModule.changeEffect('shutDown'));
        this.props.dispatch(roomModule.updateSprite(133, roomConsts.sprites['theMachine']));
        this.props.dispatch(roomModule.updateValue(109, '%off', roomConsts.sprites['warp']));
      } else if (thisSwitch.effectId === 'belts'){
        let tiles = [19, 57, 72, 94, 98, 100, 122, 124, 126];
        tiles.forEach(tile => {
          let belt = this.props.currentRoom[tile].content.find(function(content) {
            return content[0] == 'belt';
          });
          let beltDirection = belt[1];
          this.props.dispatch(roomModule.updateValue(tile, 'C', roomConsts.sprites[beltDirection + 'Belt']));
          //check for block
          let block = this.props.currentRoom[tile].content.find(function(content) {
            return content[0] == 'block';
          });
          if(block !== undefined){
            let difference = helpers.getDifference(beltDirection);
            this.moveBlock(block[1], beltDirection, tile, tile + difference);
          }
        });
      } else {
        this.props.dispatch(platformsModule.activatePlatform(thisSwitch.effectId, false));
        this.platformReturn(thisSwitch.effectId);
      };
    };
  }

  triggerEvent(event){
    this.props.dispatch(flagsModule.triggerFlag(event));
    this.triggerDialogue('dialogue', event);
  }

  attemptMove(direction, originalLocation) {
    //get difference between two spaces
    let difference = helpers.getDifference(direction);
    //and new square id #
    let newLocation = originalLocation + difference;
    if(newLocation > 0 && newLocation <= 156){
      //check for pushable block
      let content = this.props.currentRoom[newLocation].content;
      let hasBlock = content.find(function(content) {
      return content[0] == 'block';
      });
      let hasElec = this.props.currentRoom[newLocation].content.find(function(content) {
        return content[0] == 'elecSwitch';
      });
      let hasDoor = this.props.currentRoom[newLocation].content.find(function(content) {
        return content[0] == 'door';
      });
      let doorStatus = 'none';
      if(hasDoor !== undefined) {
        doorStatus = this.props.doors[hasDoor[1]].status;
      };
        if (hasBlock !== undefined && originalLocation === this.props.player.location && this.props.game.fire === false){
        let blockMove = this.attemptMove(direction, newLocation);
        if (blockMove !== newLocation) {
          this.moveBlock(hasBlock[1], direction, newLocation, newLocation + difference);
          return newLocation;
        } else {
          return originalLocation
        };
      //check if move is possible
      } else if (hasBlock == undefined
      && hasElec == undefined 
      && doorStatus !== 'closed'
      && this.props.currentRoom[newLocation].value !== 'W'
      && this.props.currentRoom[newLocation].value !== 'NPC'
      && this.props.currentRoom[newLocation].value !== 'T') {
        return newLocation;
      } else {
        return originalLocation;
      };
    } else {
      return originalLocation;
    }
  }

  //check for effects caused by landing on square
  playerSquareCheck = (squareId, direction) => {
    let currentLocation = this.props.player.location;
    let squareToCheck = this.props.currentRoom[squareId];
    //merge with clone
    if(this.props.player.cloneLocation === squareId) {
      this.merge();
    };
    //check for enemy
    let hasEnemy = squareToCheck.content.find(function(content) {
      return content[0] == 'enemy';
    });
    //check for door
    let hasDoor = squareToCheck.content.find(function(content) {
      return content[0] == 'door';
    });
    //check for door trigger
    let hasDoorTrigger = squareToCheck.content.find(function(content) {
      return content[0] == 'doorTrigger';
    });
        //attempt to open door
    if (hasDoorTrigger !== undefined) {
      this.attemptOpen(hasDoorTrigger[1]);
    }
    //take damage
    if(hasEnemy !== undefined){
      if(this.props.enemies[hasEnemy[1]].status === 'frozen' || this.props.player.status === 'dash') {
        this.enemyKnockBack(direction, hasEnemy[1]);
        let canMove = this.attemptMove(direction, this.props.enemies[hasEnemy[1]].location);
        if(canMove !== this.props.enemies[hasEnemy[1]].location){
          return 'moved';
        } else {
          return 'stopped';
        };
      } else {
        let knockBackDirection = helpers.reverseDirection(direction);
        this.knockBack(knockBackDirection);
        return 'knockback';
      }; 
    } else if (squareToCheck.value == '<>'){
      if(this.props.player.status === 'dash'){
        this.breakCrystal(squareId);
      } 
      return 'stopped';
    } else if (squareToCheck.value == 'boss' || squareToCheck.value == 'H' || (squareToCheck.value == 'i' && this.props.game.eye == "alive")|| (squareToCheck.value == '~' && this.props.game.eye == "alive")) {
      if(this.props.player.status !== 'dash'){
        let knockBackDirection = helpers.reverseDirection(direction);
        this.knockBack(knockBackDirection);
      };
      return 'knockback';
    //prevent player from entering closed door
    } else if (hasDoor !== undefined) {
      if (this.props.doors[hasDoor[1]].status == 'open') {
        return 'moved';
      } else {
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      };
    //fall to your doom and respawn 
    } else if (squareToCheck.value == 'P' || squareToCheck.value == 'L'){
      let onPlatform = this.props.currentRoom[this.props.player.location].content.find(function(content) {
        return content[0] == 'platform';
      });
      if(onPlatform !== undefined){
        return 'stopped';
      } else if (this.props.player.status === 'dash'){
        return 'moved';
      } else {
        this.fall(squareId, direction);
        return 'fall';
      }
    //slide on ice
    } else if (squareToCheck.value == 'I' && this.attemptMove(direction, squareId) !== squareId){
      this.props.dispatch(soundsModule.changeEffect('slide'));
      return 'slide';
    //move in direction of c belt
    } else if (squareToCheck.value == 'C'){
      let belt = squareToCheck.content.find(function(content) {
        return content[0] == 'belt';
      });
      let beltDirection = belt[1];
      this.props.dispatch(playerModule.updatePlayerDirection(beltDirection));
      if (this.attemptMove(beltDirection, squareId) !== squareId) {
        return 'slide';
      } else {
        return 'moved';
      };
    //activate switch
    } else if (squareToCheck.value == 'S') {
      let hasPressureSwitch = squareToCheck.content.find(function(content) {
        return content[0] == 'switch';
      });
      if (hasPressureSwitch !== undefined) {
        this.handleSwitch(hasPressureSwitch[1]);
        return 'moved';
      } else {
        return 'stopped';
      };
    //pick up item
    } else if (squareToCheck.value == '$') {
      this.getItem(squareToCheck)
      return 'moved';
    //warp
    } else if (squareToCheck.value == '@') {
      let thisWarp = squareToCheck.content.find(function(content) {
        return content[0] == 'warp';
      });
      this.handleUpdatePlayerLocation(currentLocation, squareId);
      this.handleUpdateSprite(currentLocation, '', '');
      this.warp("player", squareId, thisWarp[1]);
      return 'warped';
    } else if (squareToCheck.value == '%') {
      this.props.dispatch(playerModule.updatePlayerLocation(''));
      this.handleUpdateSprite(currentLocation, '', '');
      this.switchBranch(squareToCheck.squareId);
    } else if (squareToCheck.value === '2') {
      let text = squareToCheck.content.find(function(content) {
        return content[0] == 'syncText';
      });
      this.triggerDialogue('interact', text[1]);
      if(this.props.game.special === true){
        this.props.dispatch(roomModule.updateValue(currentLocation, '0', roomConsts.sprites['white']));
      } else {
        this.props.dispatch(roomModule.updateValue(currentLocation, '0', roomConsts.sprites['spookyTile']));
      };
      return 'moved';
    //move normally
    } else {
      if(squareToCheck.value === 'F'){
        this.props.dispatch(soundsModule.changeEffect('crack'));
      }
      return 'moved';
    };
  }

  attemptOpen(doorId) {
    let door = this.props.doors[doorId];
    if (door.isLocked === true || (door.isLocked === 'keyCard1' && !this.props.player.items.includes(door.isLocked)) || (door.isLocked === 'keyCard2' && !this.props.player.items.includes(door.isLocked)) ) {
      this.props.dispatch(soundsModule.changeEffect('doorLocked'));
      if(door.isLocked === 'keyCard1') {
        this.triggerPopUp(5);
      } else if (door.isLocked === 'keyCard2') {
        this.triggerPopUp(6);
      };
    } else if ( door.status !== 'open'|| (door.isLocked === 'keyCard1' && this.props.player.items.includes('keyCard1')) || (door.isLocked === 'keyCard2' && this.props.player.items.includes('keyCard2')) ) {
      this.props.dispatch(soundsModule.changeEffect('doorOpen'));
      this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'opening'));
      let doorTimer = setTimeout(() =>
        this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'open')),
        600
      );
    };
  }

  breakCrystal(location){
    this.props.dispatch(roomModule.updateSprite(location, roomConsts.sprites['crystalCrack']));
    this.props.dispatch(soundsModule.changeEffect('shatter'));
    this.props.dispatch(roomModule.setShatter(location, 'break'));
    setTimeout(() =>
      {this.handleUpdateSprite(location, '', '');
      if(this.props.game.branch === 3){
        this.props.dispatch(roomModule.updateValue(location, '<', roomConsts.sprites['spookyTile']));
      } else {
        this.props.dispatch(roomModule.updateValue(location, '<', roomConsts.sprites['tile']));
      }
      this.props.dispatch(roomModule.updateSprite(location, ''));},
      600
    );
    setTimeout(() => {
      this.props.dispatch(roomModule.setShatter(location, 'none'));
    }, 1000);
    setTimeout(() => {
      if(this.props.player.location !== location) {
        this.respawnCrystal(location);
      }
    }, 2000);
  }

  respawnCrystal(location){
    this.props.dispatch(roomModule.setShatter(location, 'form'));
    setTimeout(() => {
      this.props.dispatch(roomModule.updateSprite(location, roomConsts.sprites['crystal']));
      if(this.props.game.branch === 3){
        this.props.dispatch(roomModule.updateValue(location, '<>', roomConsts.sprites['spookyTile']));
      } else {
        this.props.dispatch(roomModule.updateValue(location, '<>', roomConsts.sprites['tile']));
      };
      this.props.dispatch(roomModule.setShatter(location, 'none'));
    }, 1000);
  }

  closeDoor(doorId){
    this.props.dispatch(soundsModule.changeEffect('doorClose'));
    this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'closing'));
    if(this.props.player.cloneLocation === this.props.doors[doorId].location){
      this.merge();
    };
    let doorTimer = setTimeout(() =>
      this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'closed')),
      600
    );
  }

  startReset(){
    let timer = setInterval(() => {
      let num = this.state.resetCounter + 1;
      this.setState({
        resetCounter: num
      })
      console.log(this.state.resetCounter)
    },
    4000);
    if (this.state.resetCounter >= 5){
      clearInterval(timer);
      this.setState({
        resetCounter: 0
      });
      this.reset();
    }
  }

  cancelReset(){
    this.setState({
      resetCounter: 0
    })
  }

  reset(){
    this.nullAll();
    this.handleChangeGameState("building");
    this.generateRoomFromTemplate();
  }

  changeRoom(door) {
    if (this.props.game.roomId === 1 || this.props.game.currentRoom === 4 && this.props.game.branch !== 3) {
      this.props.dispatch(soundsModule.changeMusic('bgm1'))
    };
    if(this.props.game.roomId === 2 && this.props.doors['2-D']){
      this.props.dispatch(doorsModule.updateDoorLock('2-D', true));
    };
    let newRoom = door.leadsTo;
    let thisRoom = this.props.game.roomId;
    this.props.dispatch(gameModule.setPreviousRoomId(thisRoom));
    if(this.props.game.branch !== 0){
      let mapArr = Object.values(this.props.maps);
      let mapsRoom = mapArr.find(function(room) {
        return room.roomId == thisRoom;
      });
      this.props.dispatch(mapsModule.changeVisited(mapsRoom.mapsId));
    }
    this.props.dispatch(gameModule.setRoomId(newRoom));
    this.nullAll();
    this.handleChangeGameState("building");
    if(this.props.game.special === true){
      this.generateSpecialRoom();
    } else {
      this.generateRoomFromTemplate();
    };
  }

  switchBranch(location) {
    if(this.props.displayBranch === false){
      this.props.dispatch(gameModule.toggleDisplayBranch(true));
    };
    this.props.dispatch(soundsModule.changeEffect('warp'));
    this.props.dispatch(roomModule.updateSprite(location, playerConsts.sprites.dash.south));
    let afterImageTimer = setTimeout(() => {
      this.handleUpdateSprite(location, playerConsts.sprites.particle['south'], '');
      this.props.dispatch(playerModule.updatePlayerHealth(0))},
      500
    );
    let afterAfterImageTimer = setTimeout(() =>
      {this.handleUpdateSprite(location, '', '');
      this.fadeOut();},
      1000
    );
  }

  fadeOut() {
    let fadeOutTimer = setTimeout(() =>
    {this.props.dispatch(gameModule.changeGameState("exitBranch"));
    this.props.dispatch(soundsModule.changeEffect('wind'));},
      4000
    );
    let exitTimer = setTimeout(() =>
    {this.props.dispatch(gameModule.changeGameState("postExitBranch"));
    this.props.dispatch(soundsModule.changeMusic(''));
    this.props.dispatch(menuModule.changeMenu('title'));
    this.props.history.push('/');},
      10000
    );
  }

  handleSaveGame() {
    let file = this.props.game.file;
    if (this.props.saves[file].fileStatus == 'empty') {
      this.props.dispatch(savesModule.changeStatus(file, 'active'));
    };
    let player = this.props.player;
    let flags = this.props.flags;
    let game = this.props.game;
    let maps = this.props.maps;
    let doors = this.props.doors;
    this.props.dispatch(savesModule.saveGame(file, player, flags, game, maps, doors));
  }

  //text
  getItem(square){
    let emptyTile;
    if(this.props.game.branch === 3){
      emptyTile = 'spookyTile';
    } else {
      emptyTile = 'tile';
    }
    this.props.dispatch(roomModule.updateValue(square.squareId, '0', roomConsts.sprites[emptyTile]));
    let itemArr = square.content.find(function(content) {
      return content[0] == "weapon" || content[0] == "item" || content[0] == "skill";
    });
    if (itemArr[0] == "weapon"){
      if(itemArr[1] === 'Cryostat2'){
        this.props.dispatch(playerModule.upgradeCryostat(true));
      } else {
        let weaponArr = this.props.player.weapons;
        weaponArr.push(itemArr[1]);
        this.props.dispatch(playerModule.changeCurrentWeapon(itemArr[1]));
        this.props.dispatch(playerModule.addWeaponToInventory(weaponArr));
      }
      this.props.dispatch(soundsModule.changeEffect('jingle1'));
      this.props.dispatch(playerModule.updateNewItem(itemArr[1]));
      this.props.dispatch(gameModule.changeGameState("itemGet"));
    } else if (itemArr[0] === 'skill'){
      setTimeout(() =>
        this.powerUp(itemArr[1]),
      500);
    } else {
      if (itemArr[1] == 'health') {
        this.props.dispatch(soundsModule.changeEffect('regen'));
        let newHealth = this.props.player.health + 10;
        this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
      } else {
        let inventoryArr = this.props.player.items;
        inventoryArr.push(itemArr[1]);
        this.props.dispatch(soundsModule.changeEffect('jingle1'));
        this.props.dispatch(playerModule.addItemToInventory(inventoryArr));
        this.props.dispatch(playerModule.updateNewItem(itemArr[1]));
        this.props.dispatch(gameModule.changeGameState("itemGet"));
      };
    };
    let newContent = square.content.filter(function(content) {
      return content[0] !== "weapon" || content[0] !== "item" || content[0] == "skill";
    });
    this.props.dispatch(roomModule.updateContent(square.squareId, newContent));
  }

  closeItemGet(){
    let item = this.props.player.newItem;
    this.props.dispatch(gameModule.changeGameState('active'));
    this.props.dispatch(playerModule.updateNewItem(''));
    if(item === 'Taser'){
      this.triggerPopUp(2);
    } else if (item === 'Cryostat') {
      this.triggerPopUp(3) 
    } else if (item === 'dash') {
      this.exitSpecial();
    } else if (item === 'clone') {
      this.powerDown();
    };
  }

  exitSpecial() {
    this.props.dispatch(gameModule.toggleSpecial(false));
    this.props.dispatch(gameModule.changeGameState('postSpecialRoom'));
    this.props.dispatch(gameModule.setRoomId(4));
    let newBranch; 
    if(this.props.game.branch !== 3) {
      newBranch = this.props.game.branch + 1;
    } else {
      newBranch = 1;
    };
    this.props.dispatch(gameModule.setBranch(newBranch));
    this.props.dispatch(playerModule.updatePlayerHealth(50));
    this.props.dispatch(playerModule.updatePlayerLocation(''));
    this.nullAll();
    this.startGame();
  }

  triggerDialogue(type, textKey){
    this.props.dispatch(textModule.setActiveText(textKey, type)); 
    this.props.dispatch(gameModule.changeGameState('dialogue'));
    if(textKey.includes('terminal') && this.props.text.activeText !== 'terminalOff'){
      this.props.dispatch(soundsModule.changeEffect('bootUp'));
    } else if(textKey.includes('phone')){
      this.props.dispatch(soundsModule.changeEffect('pickUp'));
      if(this.props.game.branch === 2) {
        this.glitchOut();
      };
    } else if(textKey.includes('sync')) {
      this.props.dispatch(soundsModule.changeEffect('merge'));
    } else if(textKey === 'save') {
      this.props.dispatch(soundsModule.changeEffect('ping'));
    } else {
      this.props.dispatch(soundsModule.changeEffect('menu'));
    };
  }

  endDialogue() {
    this.handlePlayerChoice();
    this.props.dispatch(gameModule.changeGameState('active'));
    if (this.props.text.activeText.includes('terminal') && this.props.text.activeText !== 'terminalOff'){
        this.props.dispatch(soundsModule.changeEffect('bootDown'));
    } else if (this.props.text.activeText.includes('phone')){
      this.props.dispatch(soundsModule.changeEffect('pickUp'));
    } else if (this.props.text.activeText.includes('sync')) {
      this.props.dispatch(soundsModule.changeEffect('entangle'));
      let newEntanglement = this.props.player.entanglement + 5;
      this.props.dispatch(playerModule.updateEntanglement(newEntanglement));
      if(this.props.player.entanglement === 15){
        this.powerUp('dash');
      };
      if(this.props.player.entanglement === 20){
        this.powerUp('clone');
      }
    };
    if(this.props.text.activeText === 'bootUp1') {
      setTimeout(() => {
        this.props.dispatch(gameModule.changeFilter('none'));
        this.props.dispatch(roomModule.updateValue(70, 'T', roomConsts.sprites['terminalShock']));
        },
        200
      )
      setTimeout(() => {
        this.props.dispatch(soundsModule.changeEffect('ping'));
        this.props.dispatch(roomModule.updateValue(70, 'T', roomConsts.sprites['terminal']));
        this.props.dispatch(roomModule.updateContent(71, [['interact', 'terminal1']]));
        },
        1000
      )
    };
    // if(this.props.text.activeText === 'A3') {
    //   this.props.dispatch(playerModule.updatePlayerName('Claire'));
    // };
    // if(this.props.text.activeText === 'A4') {
    //   this.props.dispatch(gameModule.changeGameState('cutscene'));
    //   this.props.dispatch(soundsModule.changeMusic('ghost'));
    //   this.props.dispatch(npcsModule.createNPC('ghost', 70, 'north', 'ghost1'));
    //   let moves = [83, 96, 97, 98, 99, 100, 87, 74];
    //   let current = 0;
    //   setTimeout(() => {
    //       let moveTimer = setInterval(() => {
    //         this.props.dispatch(npcsModule.updateNPCLocation(moves[current]));
    //         current += 1;
    //       if(current >= moves.length){
    //         clearInterval(moveTimer);
    //         this.triggerEvent(5, 'A');
    //       }},
    //       200
    //       )
    //   },
    //   800
    //   )
    // };
    // if(this.props.text.activeText === 'A7') {
    //   this.props.dispatch(soundsModule.changeEffect('ping'));
    //   this.props.dispatch(roomModule.updateValue(140, 'T', roomConsts.sprites['terminal']));
    //   this.props.dispatch(roomModule.updateContent(140, [['interact', 'terminal1']]));
    //   this.props.dispatch(npcsModule.updateNPCLocation(128));
    //   this.props.dispatch(npcsModule.updateNPCDirection('south'));
    // };
    // if(this.props.text.activeText === 'A9') {
    //   this.props.dispatch(npcsModule.updateNPCLocation(123));
    // };
    // if(this.props.text.activeText === 'A10' || this.props.text.activeText === 'A13') {
    //   this.props.dispatch(gameModule.changeGameState('cutscene'));
    //   this.props.dispatch(npcsModule.updateNPCLocation(109));
    //   setTimeout(() => {
    //     this.props.dispatch(soundsModule.changeEffect('warp'));
    //     this.props.dispatch(npcsModule.nullNPCs());
    //   }, 500);
    //   setTimeout(() => {
    //     this.props.dispatch(soundsModule.changeEffect(''));
    //     this.props.dispatch(gameModule.changeGameState('active'));
    //   }, 1100);
    // };
    if(this.props.text.activeText === 'phone1') {
      this.props.dispatch(roomModule.updateValue(125, '2', roomConsts.sprites['white']));
      this.handleUpdateSprite(125, playerConsts.sprites.stand['southGray'], 'spriteFadeIn');
      this.props.dispatch(roomModule.updateContent(125, [['syncText', 'sync1']]));
      this.props.dispatch(roomModule.updateValue(43, '2', roomConsts.sprites['white']));
      this.handleUpdateSprite(43, playerConsts.sprites.stand['southGray'], 'spriteFadeIn');
      this.props.dispatch(roomModule.updateContent(43, [['syncText', 'sync2']]));
      this.props.dispatch(roomModule.updateValue(36, '2', roomConsts.sprites['white']));
      this.handleUpdateSprite(36, playerConsts.sprites.stand['southGray'], 'spriteFadeIn');
      this.props.dispatch(roomModule.updateContent(36, [['syncText', 'sync3']]));
      setTimeout(() => {
        this.handleUpdateSprite(125, playerConsts.sprites.stand['southGray'], 'transparent');
        this.handleUpdateSprite(43, playerConsts.sprites.stand['southGray'], 'transparent');
        this.handleUpdateSprite(36, playerConsts.sprites.stand['southGray'], 'transparent');
      }, 3000);
    };
    if(this.props.text.activeText === 'mapTerminal'){
      this.props.dispatch(playerModule.getMap());
      this.triggerPopUp(4);
    }
    this.props.dispatch(textModule.setActiveText(null, null));
    this.props.dispatch(textModule.setLine(0));
    this.props.dispatch(textModule.setParagraph(1));
  }

  powerUp(newSkill) {
    this.props.dispatch(gameModule.changeGameState('cutscene'));
    this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.dash.south, 'powerUp');
    this.props.dispatch(soundsModule.changeEffect('charge'));
    setTimeout(() => {
      this.props.dispatch(soundsModule.changeEffect('warp'));
      this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.blast, 'float');
    }, 1500);
    setTimeout(() => {
      this.props.dispatch(soundsModule.changeEffect('win'));
      let skillArr = this.props.player.skills;
      skillArr.push(newSkill);
      this.props.dispatch(playerModule.updateSkills(skillArr));
      this.props.dispatch(playerModule.changeCurrentSkill(newSkill));
      this.props.dispatch(playerModule.updateNewItem(newSkill));
      this.props.dispatch(gameModule.changeGameState("itemGet"));
    }, 2500);
    this.props.dispatch(playerModule.updatePlayerMagic(100));
  }

  powerDown(){
    this.props.dispatch(gameModule.changeGameState('cutscene'));
    this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.dash.south, 'powerDown');
    setTimeout(() => {
      this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand.south, '');
      this.props.dispatch(gameModule.changeGameState('active'));
    }, 1500);
  }

  blaineIntro(){
    setTimeout(() => {
      this.move('south', this.props.player.location);
      this.props.dispatch(roomModule.updateSprite(70, playerConsts.sprites.blast));
      this.props.dispatch(soundsModule.changeEffect('warp'));
    }, 1500);
    setTimeout(() => {
      this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.stand.north));
      this.props.dispatch(roomModule.toggleAlert(this.props.player.location, true));
    }, 3000); 
    setTimeout(() => {
      this.props.dispatch(roomModule.toggleAlert(this.props.player.location, false));
      this.props.dispatch(roomModule.updateSprite(70, npcSprites.blaine.warp));
      this.props.dispatch(soundsModule.changeMusic('blaine'));
    }, 4500); 
    setTimeout(() => {
      this.switchBranch(this.props.player.location)
    }, 8500); 
  }

  handlePlayerChoice(){
    if (this.props.text.activeText == 'terminal1') {
      this.props.dispatch(soundsModule.changeEffect('changeDoor'));
      if (this.props.text.selectedOption == 2) {
        this.props.dispatch(doorsModule.updateDoorLock('1-A', false));
        if(this.props.currentRoom[111].value !== 'T') {
          let eventTimer = setTimeout(() => {
            this.props.dispatch(roomModule.updateValue(111, 'T', roomConsts.sprites['tile']));
            this.props.dispatch(roomModule.updateContent(111, [['interact', 'save']]));
            this.props.dispatch(roomModule.updateContent(112, [['interact', 'save']]));
            this.props.dispatch(roomModule.toggleAlert(112, true));
            this.props.dispatch(roomModule.updateSprite(111, roomConsts.sprites['save']));
            this.props.dispatch(soundsModule.changeEffect('merge'))},
            1000
          )
        }
      } else {
        this.props.dispatch(doorsModule.updateDoorLock('1-A', true));
      };
    } else if (this.props.text.activeText == 'terminal9a'){
      if (this.props.text.selectedOption == 1) {
        //lock doors
        this.closeDoor('9-A');
        this.props.dispatch(doorsModule.updateDoorLock('9-A', true));
        this.closeDoor('9-B');
        this.props.dispatch(doorsModule.updateDoorLock('9-B', true));
        this.closeDoor('9-C');
        this.props.dispatch(doorsModule.updateDoorLock('9-C', true));
        //trigger alert filter
        this.props.dispatch(gameModule.changeFilter('core'));
        //activate terminal
        setTimeout(() => {
          this.props.dispatch(soundsModule.changeEffect('ping'));
          this.props.dispatch(roomModule.updateValue(84, 'T', roomConsts.sprites['terminal']));
          this.props.dispatch(roomModule.updateContent(85, [['interact', 'terminal9b']]));
        }, 1000);
        //move platforms
        this.platformMove('9-A');
        this.platformMove('9-B');
        //toggle electricity
        this.props.dispatch(roomModule.updateValue(29, 'P', roomConsts.sprites['pit']));
        this.props.dispatch(roomModule.updateValue(120, 'P', roomConsts.sprites['pit']));
        //change core sprite?
        } else {
          //unlock doors
          this.props.dispatch(doorsModule.updateDoorLock('9-A', false));
          this.props.dispatch(doorsModule.updateDoorLock('9-B', false));
          this.props.dispatch(doorsModule.updateDoorLock('9-C', false));
          //return platforms
          this.platformReturn('9-A');
          this.platformReturn('9-B');
          //trigger alert filter
          this.props.dispatch(gameModule.changeFilter(''));
          //deactivate terminal
          this.props.dispatch(soundsModule.changeEffect('shutdown'));
          this.props.dispatch(roomModule.updateValue(84, 'T', roomConsts.sprites['terminalOff']));
          this.props.dispatch(roomModule.updateContent(85, [['interact', 'terminalOff']]));
          //change core sprite?
          this.props.dispatch(roomModule.updateValue(29, '%', roomConsts.sprites['pit']));
          this.props.dispatch(roomModule.updateValue(120, '%', roomConsts.sprites['pit']));
        };
    } else if (this.props.text.activeText == 'terminal9b'){
      if (this.props.text.selectedOption == 1) {
        this.props.dispatch(roomModule.updateSprite(120, roomConsts.sprites['lightningRed']));
      } else {
      }
    } else if (this.props.text.activeText === 'save'){
      if(this.props.text.selectedOption === 2){
        this.handleSaveGame();
      };
    };
  }

  advanceLine() {
    //get current paragraph
    let activeParagraph;
    if (this.props.text.activeTextType == 'dialogue') {
      activeParagraph = textConsts.dialogue[this.props.text.activeText][this.props.text.paragraph][1];
    } else {
      activeParagraph = textConsts.examine[this.props.text.activeText][this.props.text.paragraph];
    };
    if (activeParagraph[0] == 'options') {
      this.props.dispatch(textModule.setOptions(activeParagraph[2]));
    } else if (activeParagraph[0] == 'textInput') {
      this.props.dispatch(textModule.toggleTextInput(true));
    } else {
      let newLine = this.props.text.line + 1;
      //if you've reached the end of the current paragraph...
      if (newLine >= activeParagraph.length || activeParagraph[0] == 'results') {
        this.advanceParagraph();
      } else {
        this.props.dispatch(soundsModule.changeEffect('menu'));
        this.props.dispatch(textModule.setLine(newLine));
      };
    };
  }

  advanceParagraph(){
    //get current text chunk
    let activeTextChunk;
    let newParagraph = this.props.text.paragraph + 1;
    if (this.props.text.activeTextType == 'dialogue') {
      activeTextChunk = textConsts.dialogue[this.props.text.activeText];
    } else {
      activeTextChunk = textConsts.examine[this.props.text.activeText];
    };
    if (newParagraph > Object.keys(activeTextChunk).length) {
      this.endDialogue();
    } else {
      this.props.dispatch(soundsModule.changeEffect('menu'));
      this.props.dispatch(textModule.setParagraph(newParagraph));
      this.props.dispatch(textModule.setLine(0));
    };
  }

  //Platforms
  platformStart(platformId) {
    let roomId = this.props.game.roomId;
    let timerArr = this.props.game.timers;
    let platformTimer = setInterval(() => {
        if(this.props.platforms[platformId] !== undefined) {
          if(this.props.platforms[platformId].isActive === true) {
            this.platformMove(platformId);
          } else {
            clearInterval(platformTimer);
          };
        }},
      600
    );
    timerArr.push(platformTimer);
    this.props.dispatch(gameModule.updateTimers(timerArr));
  }

  platformMove(platformId){
    let platform = this.props.platforms[platformId];
    let originalLocation = platform.location;
    let canMove = this.attemptMove(platform.direction, originalLocation);
    if (canMove == originalLocation || this.props.currentRoom[canMove].value !== "P"){
      let newDirection = helpers.reverseDirection(platform.direction);
      this.props.dispatch(platformsModule.updatePlatformDirection(platform.platformId, newDirection));
    } else {
      this.handleUpdatePlatformLocation(platform.platformId, originalLocation, canMove);
    };
    if (canMove == platform.start){
      let newDirection = helpers.reverseDirection(platform.direction);
      this.props.dispatch(platformsModule.updatePlatformDirection(platform.platformId, newDirection));
    };
  }

  platformReturn(platformId){
    let platform = this.props.platforms[platformId];
    let next;
    if (platform.location !== platform.start){
      if (platform.direction == 'north' || platform.direction == 'south') {
        if (platform.start > platform.location) {
          next = 1;
        } else {
          next = -1;
        };
      } else {
        if (platform.start > platform.location) {
          next = 13;
        } else {
          next = -13;
        };
      };
      let location = platform.location;
      let rapidMoveTimer = setInterval(() =>
        {if (location !== platform.start) {
          let newLocation = location + next;
          this.handleUpdatePlatformLocation(platform.platformId, location, newLocation);
          location = newLocation
        } else {
          clearInterval(rapidMoveTimer);
        }},
        100
      );
    };
  }

  handleUpdatePlatformLocation(platformId, originalLocation, newLocation){
    let platform = this.props.platforms[platformId];
    //set new tile images
    let image;
    if (newLocation == platform.start && platform.isActive == false) {
      if (platform.direction == 'north' || platform.direction == 'south') {
        image = roomConsts.sprites['platformOffNS'];
      } else {
        image = roomConsts.sprites['platformOffEW'];
      };
    } else if (platform.direction == 'north' || platform.direction == 'south') {
      image = roomConsts.sprites['platformOnNS'];
    } else if (platform.direction == 'east' || platform.direction == 'west') {
      image = roomConsts.sprites['platformOnEW']
    };
    let squareImage;
    if (this.props.currentRoom[originalLocation - 1].value !== 'P' && this.props.currentRoom[originalLocation - 1].value !== 'M'){
      squareImage = roomConsts.sprites['pit'];
    } else {
      squareImage = roomConsts.sprites['pit2'];
    };
    this.props.dispatch(roomModule.updateValue(originalLocation, 'P', squareImage));
    this.handleUpdateSprite(originalLocation, '', '');
    this.props.dispatch(roomModule.updateValue(newLocation, 'M', image));
    //remove ALL content from previous content array
    let contentArr = this.props.currentRoom[originalLocation].content;
    this.props.dispatch(roomModule.updateContent(originalLocation, []));
    //move ALL content to new content array
    this.props.dispatch(roomModule.updateContent(newLocation, contentArr));
    this.props.dispatch(platformsModule.updatePlatformLocation(platformId, newLocation));
    if (contentArr.length > 1) {
      this.resolvePlatformContent(newLocation, platform.direction);
    };
  }

  resolvePlatformContent(location, direction) {
    let content = this.props.currentRoom[location].content;
    let contentToUpdate = content.find(function(content){
      return content[0] == 'player';
    });
    if (contentToUpdate == undefined){
      contentToUpdate = content.find(function(content){
        return content[0] == 'block';
      });
    };
    let sprite;
    if (contentToUpdate[0] == 'player') {
      this.props.dispatch(playerModule.updatePlayerLocation(location));
      sprite = playerConsts.sprites.stand[this.props.player.direction];
    } else if (contentToUpdate[0] == 'block') {
      this.props.dispatch(blocksModule.updateBlockLocation(contentToUpdate[1], location));
      sprite = roomConsts.sprites.block;
    };
    this.handleUpdateSprite(location, sprite, direction+"Enter");
  }

  //Handle Blocks
  moveBlock(blockId, direction, originalLocation, newLocation) {
    //move animation
    this.props.dispatch(soundsModule.changeEffect('scrape'));
    this.props.dispatch(roomModule.updateTransition(originalLocation, direction));
    //check properties of new square
    let blockCheck = this.props.currentRoom[newLocation];
    //enemy?
    let hasEnemy = blockCheck.content.find(function(content) {
      return content[0] == 'enemy';
    });
    //player?
    let hasPlayer = blockCheck.content.find(function(content) {
      return content[0] == 'player';
    });
    //update location
    let previousContentArr = this.props.currentRoom[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'block';
    });
    this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
    this.handleUpdateSprite(originalLocation, '', '');
    //check for enemy
    if (hasEnemy !== undefined && this.attemptMove(direction, newLocation) !== newLocation) {
      this.enemyKnockBack(direction, hasEnemy[1]);
    };
    if (hasPlayer != undefined && this.attemptMove(direction, newLocation) !== newLocation) {
      this.knockBack(direction);
    };
    //if new square is a pit
    if (blockCheck.value == 'P') {
      this.blockSink(blockId, newLocation, direction, 'water');
    //if new square is lava
    } else if (blockCheck.value == 'L') {
      this.blockSink(blockId, newLocation, direction, 'lava');
    //if new square is a warp
    } else if (blockCheck.value == '@') {
      //add block to warp entry content array
      let newContentArr = this.props.currentRoom[newLocation].content;
      newContentArr.push(["block", blockId]);
      this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
      //trigger warp
      let thisWarp = this.props.currentRoom[newLocation].content.find(function(content) {
        return content[0] == 'warp';
      });
      this.warp(blockId, newLocation, thisWarp[1]);

    } else {
      //otherwise, move normally
      let newContentArr = this.props.currentRoom[newLocation].content;
      newContentArr.push(["block", blockId]);
      this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
      this.props.dispatch(blocksModule.updateBlockLocation(blockId, newLocation));
      this.props.dispatch(roomModule.updateSprite(newLocation, roomConsts.sprites['block']));
      let nextLocation = this.attemptMove(direction, newLocation);
      if (this.props.currentRoom[newLocation].value == "I" && nextLocation !== newLocation) {
        let blockMoveTimer = setTimeout(() =>
          this.moveBlock(blockId, direction, newLocation, nextLocation),
          100
        );
      };
      //move in direction of c belt
      if (this.props.currentRoom[newLocation].value == "C") {
        let beltArr = this.props.currentRoom[newLocation].content.find(function(content) {
          return content[0] == 'belt';
        });
        direction = beltArr[1];
        nextLocation = this.attemptMove(direction, newLocation);
        if (nextLocation !== newLocation) {
          let blockMoveTimer = setTimeout(() =>
            this.moveBlock(blockId, direction, newLocation, nextLocation),
            100
          );
        };
      };
      //trigger switch
      if (blockCheck.value == 'S') {
        let thisSwitchId = blockCheck.content.find(function(content) {
          return content[0] == 'switch';
        });
        this.handleSwitch(thisSwitchId[1]);
      };
    };
  }

  blockFall(blockId, pitLocation, direction) {
    this.handleUpdateSprite(pitLocation, roomConsts.sprites['block'], direction);
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(pitLocation, '', '');
      this.props.dispatch(blocksModule.nullBlock(blockId));},
      500
    );
  };

  blockSink(blockId, location, direction, type) {
    this.props.dispatch(gameModule.changeGameState('cutscene'));
    if(type === 'lava'){
      this.props.dispatch(roomModule.updateSprite(location, roomConsts.sprites['blockSink']));
      let spriteClearTimer = setTimeout(() => {
        this.props.dispatch(gameModule.changeGameState('active'));
        this.props.dispatch(roomModule.updateSprite(location, ''));
        this.props.dispatch(blocksModule.nullBlock(blockId));
        this.props.dispatch(roomModule.updateValue(location, 'L-sunk', roomConsts.sprites['lavaCovered']))},
        800
      );
    } else {
      this.props.dispatch(roomModule.updateSprite(location, roomConsts.sprites['blockSinkWater']));
      let spriteClearTimer = setTimeout(() => {
        this.props.dispatch(gameModule.changeGameState('active'));
        this.props.dispatch(roomModule.updateSprite(location, ''));
        this.props.dispatch(blocksModule.nullBlock(blockId));
        this.props.dispatch(roomModule.updateValue(location, 'L-sunk', roomConsts.sprites['pitCovered']))},
        800
      );
    }
  };

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyType) {
    let thisEnemy = enemyConsts.enemies[enemyType];
    let enemyId = v4();
    this.props.dispatch(enemiesModule.createEnemy(enemyId, thisEnemy.kind, thisEnemy.sprites, thisEnemy.health, 'normal', locationId, 'south'));
    //stagger enemy movement
    let rng = Math.floor(Math.random() * 5) + 1 * 2000;
    let enemyTimer = setInterval(() =>
      this.enemyMove(enemyId),
      rng
    );
    let timers = this.props.game.timers;
    timers.push(enemyTimer);
    this.props.dispatch(gameModule.updateTimers(timers));
    return enemyId;
  }

  createBoss(){
    this.closeDoor('8-A');
    this.props.dispatch(doorsModule.updateDoorLock('8-A', true));
    this.props.dispatch(gameModule.changeGameState('cutscene'));
    this.props.dispatch(soundsModule.changeMusic('bossIntro'));
    this.props.dispatch(soundsModule.changeEffect('scream'));
    setTimeout(() => {
      let sprite = <img src={darkBoss} width="250" height="220"/>;
      this.props.dispatch(roomModule.updateSprite(98, sprite)); 
      this.props.dispatch(bossModule.updateBossStatus('normal'));
      this.props.dispatch(gameModule.setEye('alive'));},
      4000
    );
    setTimeout(() => {
      let sprite = <img src={boss} width="250" height="220"/>;
      this.props.dispatch(roomModule.updateSprite(98, sprite));},
      7000
    );
    setTimeout(() => {
      this.props.dispatch(gameModule.toggleLights('on'))},
      7200
    );
    setTimeout(() => {
      this.props.dispatch(soundsModule.changeEffect(''));
      this.props.dispatch(soundsModule.changeEffect('whoosh'));
      this.props.dispatch(bossModule.updateBossName('Chalazon'));},
      8500
    );
    setTimeout(() => {
      let titles = this.props.boss.titles;
      titles.push('- Abyssal Cyst -');
      this.props.dispatch(bossModule.updateBossTitles(titles));},
      11000
    );
    setTimeout(() => {
      this.props.dispatch(gameModule.changeGameState('active'));
      this.startBossFight();},
      15000
    );
  }

  startBossFight() {
    this.props.dispatch(bossModule.updateBossName(''));
    this.props.dispatch(bossModule.updateBossTitles([]));
    this.props.dispatch(soundsModule.changeMusic('boss'));
    let bossTimer = setInterval(() =>
      {let rng = Math.floor(Math.random() * 3);
        if(this.props.game.gameState === 'active' && this.props.boss.status === 'normal'){
          if (rng === 1){
            this.bossAttack();
          } else if (rng === 2){
            this.bossFire();
          } else {
            this.bossMove();
          };
        };
      },
      1000
    );
  }

  handleBossDamage(){
    if(this.props.boss.status === 'normal'){
      let bossHealth = this.props.boss.health - 50;
      this.props.dispatch(bossModule.updateBossHealth(bossHealth));
      this.props.dispatch(bossModule.updateBossStatus('hurt'));
      this.props.dispatch(soundsModule.changeEffect('enemyHurt'));
      setTimeout(() => {
        this.props.dispatch(bossModule.updateBossStatus('normal'));
      }, 600);
      if(bossHealth <= 0){
        this.killBoss();
      };
    };
  }

  killBoss(){
    this.props.dispatch(soundsModule.changeMusic(''));
    this.props.dispatch(soundsModule.changeEffect('scream'));
    this.props.dispatch(gameModule.changeGameState('cutscene'));
    let sprite = <img src={bossSink} width="250" height="220"/>;
    this.props.dispatch(roomModule.updateSprite(this.props.boss.tileArr[9], sprite));
    setTimeout(() => {
      this.props.dispatch(roomModule.updateSprite(this.props.boss.tileArr[9], ''));
      this.props.dispatch(bossModule.updateBossStatus('dead'));
      let bossSpaces = this.props.boss.tileArr;
      bossSpaces.forEach(bossSpace => {
        this.props.dispatch(roomModule.updateValue(bossSpace, '0', roomConsts.sprites['spookyTile']));
        this.props.dispatch(roomModule.updateValue(72, 'L', roomConsts.sprites['lava'])); 
        this.props.dispatch(soundsModule.changeEffect('ping'));
      });
      this.props.dispatch(gameModule.changeGameState('active'));
    }, 4000);
  }

  bossFire(){
    this.props.dispatch(bossModule.updateBossAttack(true));
    setTimeout(() => {
    //fire projectile
    this.handleProjectile('Boss', 'north', this.props.boss.tileArr[5], 8, <img src={bossShot} width="60" height="60"/>)
    this.handleProjectile('Boss', 'south', this.props.boss.tileArr[4], 8, <img src={bossShot} width="60" height="60"/>)
    this.handleProjectile('Boss', 'east', this.props.boss.tileArr[6], 8, <img src={bossShot} width="60" height="60"/>)
    this.handleProjectile('Boss', 'west', this.props.boss.tileArr[2], 8, <img src={bossShot} width="60" height="60"/>)
    if(this.props.boss.health <= 400){
        this.handleProjectile('Boss', 'northWest', this.props.boss.tileArr[6], 8, <img src={bossShot} width="60" height="60"/>)
        this.handleProjectile('Boss', 'northEast', this.props.boss.tileArr[2], 8, <img src={bossShot} width="60" height="60"/>)
        this.handleProjectile('Boss', 'southWest', this.props.boss.tileArr[3], 8, <img src={bossShot} width="60" height="60"/>)
        this.handleProjectile('Boss', 'southEast', this.props.boss.tileArr[7], 8, <img src={bossShot} width="60" height="60"/>)
    } 
    this.props.dispatch(bossModule.updateBossAttack(false));
    }, 2000);
  }

  bossAttack(){
    let rng = Math.floor(Math.random() * 3);
    if (rng === 0){
    //summon tentacle
      let target = this.props.player.location;
      if(this.props.boss.health > 400){
      //target single square
        this.props.dispatch(roomModule.setWarning(target, true));
        setTimeout(() => 
          {this.props.dispatch(roomModule.setWarning(target, false));
          this.props.dispatch(roomModule.updateValue(target, '~', roomConsts.sprites['spookyTile']));
          if(this.props.player.location === target){
            this.knockBack(this.getRandomDirection());
          };},
          3000);
        setTimeout(() => 
          {if(this.props.currentRoom[target].value === '~') {
            this.props.dispatch(roomModule.updateValue(target, '0', roomConsts.sprites['spookyTile']));
          }},
          9000);
      } else {
      //target multiple squares
        let targets = [target];
        let surrounding = this.getSurroundingTiles(target);
        surrounding.forEach(tile => {
          if(this.props.currentRoom[tile].value === '0'){
            targets.push(tile);
          };
        });
        targets.forEach(tile => {
          this.props.dispatch(roomModule.setWarning(tile, true));
        });
        setTimeout(() => {        
          targets.forEach(tile => {
            this.props.dispatch(roomModule.setWarning(tile, false));
            this.props.dispatch(roomModule.updateValue(tile, '~', roomConsts.sprites['spookyTile']));
          });
          if(targets.includes(this.props.player.location)){
            this.knockBack(this.getRandomDirection());
          };
        }, 3000);
        setTimeout(() => {
          targets.forEach(tile => {
            if(this.props.currentRoom[tile].value === '~') {
              this.props.dispatch(roomModule.updateValue(tile, '0', roomConsts.sprites['spookyTile']));
            };
          });
        }, 9000);
      };
    } else if (rng === 1 && this.props.boss.attack === false){
      this.props.dispatch(bossModule.updateBossAttack(true));
      //aoe explosion
      let bossArr = this.props.boss.tileArr;
      let explosionTiles = [];
      for(let i=0; i < bossArr.length; i++) {
        if(i % 2 === 0) {
          explosionTiles.push(bossArr[i] - 1, bossArr[i] - 2); 
        } else {
          explosionTiles.push(bossArr[i] + 1, bossArr[i] + 2); 
        };
      };
      explosionTiles.push(
        bossArr[0] - 13,
        bossArr[0] - 14,
        bossArr[0] - 26,
        bossArr[1] - 13,
        bossArr[1] - 26,
        bossArr[1] - 12,
        bossArr[8] + 13,
        bossArr[8] + 26,
        bossArr[8] + 12,
        bossArr[9] + 13,
        bossArr[9] + 26,
        bossArr[9] + 14
      );
      let room = this.props.currentRoom;
      let filteredTiles = explosionTiles.filter(function(tile) {
        if(tile > 0 && tile < 156) {
          return room[tile].value === '0';
        }
      });
      filteredTiles.forEach(tile => {
        this.props.dispatch(roomModule.setWarning(tile, true));
      });
      let shuffledTiles = this.shuffleArray(filteredTiles)
      setTimeout(() => {
        this.props.dispatch(soundsModule.changeEffect('explosion'));
        shuffledTiles.forEach(tile => {
          this.aoeAttack(tile);
        })
        this.props.dispatch(bossModule.updateBossAttack(false));
        }, 1000 );
    } else if (rng === 3 && this.props.boss.attack === false) {
      //extend tenticles across stage
      this.props.dispatch(bossModule.updateBossAttack(true));
      let walls = [];
      let keys = Object.keys(this.props.currentRoom);
      let tiles = this.props.currentRoom;
      keys.forEach(key => {
        let num = parseInt(key);
        if(tiles[key].value === 'W' && num !== 2 && num !== 13 && num !== 145 && num !== 156) {
          walls.push(num);
        };
      });
      rng = Math.floor(Math.random() * walls.length);
      let direction = helpers.getDirection(walls[rng]);
      let next = helpers.getDifference(direction);
      let start = walls[rng] + next;
      this.props.dispatch(roomModule.setWarning(start, true));
      let tentacleArr = [];
      for(let i=0; i < 10; i++) {
        tentacleArr.push(start);
        start = start + next;
      };
      tentacleArr.forEach(tile => {
        this.props.dispatch(roomModule.setWarning(tile, true));
      });
      setTimeout(() => {
        tentacleArr.forEach(tile => {
          this.props.dispatch(roomModule.updateValue(tile, '~', roomConsts.sprites['spookyTile']));
          if(this.props.player.location === tile){
            this.knockBack(this.getRandomDirection());
          };
        }); 
      }, 600);
      setTimeout(() => {
        tentacleArr.forEach(tile => {
          this.props.dispatch(roomModule.setWarning(tile, false));
          this.props.dispatch(roomModule.updateValue(tile, '0', roomConsts.sprites['spookyTile']));
          this.props.dispatch(bossModule.updateBossAttack(false));
        });
      }, 2000);
    };
  }

  aoeAttack(tile) {
      setTimeout(() => {
        this.props.dispatch(roomModule.setExplosion(tile, true));
        if(this.props.player.location === tile) {
          this.knockBack(this.getRandomDirection());
        };},
        200
      );
      setTimeout(() => {
        this.props.dispatch(roomModule.setWarning(tile, false));
        this.props.dispatch(roomModule.setExplosion(tile, false));},
        600
      );
  }

shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  getRandomDirection(){
    let rng = Math.floor(Math.random() * 4);
    if (rng == 0) {
      return 'north';
    } else if (rng == 1) {
      return 'south';
    } else if (rng == 2) {
      return 'east';
    } else if (rng == 3) {
      return 'west';
    };
  }

  getSurroundingTiles(tile) {
    let tiles = [];
    tiles.push(tile - 1);
    tiles.push(tile + 13);
    tiles.push(tile + 1);
    tiles.push(tile - 13);
    return tiles;
  }

  bossMove() {
    let direction = this.getRandomDirection();
    let bossArr = this.props.boss.tileArr;
    let canMove = true;
    if(this.props.boss.attack === false){
      bossArr.forEach(bossSpace => {
        let attemptMove = this.attemptMove(direction, bossSpace);
        if(attemptMove === this.props.player.location){
          this.knockBack(direction);
          canMove = false;
        };
        if(this.props.currentRoom[attemptMove].value === 'H'){
          canMove = false;
        }
      });
      if(canMove === true) {
        bossArr.forEach(bossSpace => {
          this.props.dispatch(roomModule.updateValue(bossSpace, '0', roomConsts.sprites['spookyTile']));
        });
        let newArr = [];
        bossArr.forEach(bossSpace => {
          let newSpace = this.attemptMove(direction, bossSpace);
          this.props.dispatch(roomModule.updateValue(newSpace, 'boss', roomConsts.sprites['spookyTile']));
          newArr.push(newSpace);
        });
        this.props.dispatch(roomModule.updateSprite(bossArr[newArr.length -1], ''));
        this.props.dispatch(bossModule.updateTileArray(newArr));
        this.props.dispatch(roomModule.updateSprite(newArr[newArr.length -1], <img src={boss} width="250" height="220"/>));
      };
    };
  }

  enemyMove(enemyId) {
    if (this.props.game.gameState === 'active' && this.props.enemies[enemyId].status == 'normal') {
      let enemy = this.props.enemies[enemyId];
      let enemyLocation = this.props.enemies[enemyId].location;
      if (enemy.kind === 'Slime') {
        this.moveRandom(enemyId, enemyLocation);
      } else if (enemy.kind === 'Robot') {
        this.moveRandom(enemyId, enemyLocation);
      } else if (enemy.kind === 'Boss') {
        this.movePursue(enemyId, enemyLocation);
      }
    }
  }

  moveRandom(enemyId, currentLocation) {
    let direction;
    //check if player is on neighboring square
    let playerNear = helpers.checkForPlayer(currentLocation, this.props.player.location);
    //otherwise, move at random
    if (playerNear !== false) {
      direction = playerNear;
    } else {
      let rng = Math.floor(Math.random() * 4);
      if (rng == 0) {
        direction = 'north';
      } else if (rng == 1) {
        direction = 'south';
      } else if (rng == 2) {
        direction = 'east';
      } else if (rng == 3) {
        direction = 'west'
      }
    }
    this.executeEnemyMove(enemyId, currentLocation, direction);
  }

  executeEnemyMove(enemyId, currentLocation, direction) {
    let roomId = this.props.game.currentRoom;
    if (this.props.game.gameState == 'active') {
      this.props.dispatch(enemiesModule.updateEnemyDirection(enemyId, direction));
      this.props.dispatch(roomModule.updateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction]));
      //check if move is legal, if not return original location
      let canMove = this.attemptMove(direction, currentLocation);
      let content = this.props.currentRoom[canMove].content;
      let hasEnemy = content.find(function(content) {
        return content[0] == 'enemy';
      });
      let hasPlayer = content.find(function(content) {
        return content[0] == 'player';
      });
      let hasElecSwitch = content.find(function(content) {
        return content[0] == 'elecSwitch';
      });
      if (canMove !== currentLocation
      && hasEnemy == undefined
      && this.props.currentRoom[canMove].value !== 'S'
      && this.props.currentRoom[canMove].value !== 'M'
      && this.props.currentRoom[canMove].value !== 'D'
      && this.props.currentRoom[canMove].value !== 'L'
      && this.props.currentRoom[canMove].value !== 'F'
      && !(this.props.currentRoom[canMove].value == '~' && this.props.game.eye == "alive") 
      && this.props.currentRoom[canMove].value !== 'P'){
        //hurt player, but don't move if they can't be knocked back to another square
        if (hasPlayer !== undefined) {
          this.knockBack(direction);
        } else {
          //update enemy location and new square
          this.handleUpdateEnemyLocation(enemyId, currentLocation, canMove);
          if (this.props.enemies[enemyId].kind == 'Slime' && this.props.currentRoom[currentLocation].value !== 'H' && this.props.currentRoom[currentLocation].value !== 'S') {
            this.createSlime(currentLocation);
          };
          if(this.props.currentRoom[currentLocation].value === 'S' && currentLocation !== this.props.player.cloneLocation) {
            let thisSwitch = this.props.currentRoom[currentLocation].content.find(function(content) {
              return content[0] == 'switch';
            });
            this.startSwitchCountdown(thisSwitch[1]);
          };
          //start walk animation
          if(this.props.enemies[enemyId] !== undefined) {
              this.handleUpdateSprite(currentLocation, '', '');
              this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction], direction + 'Enter');
            }
        }
      }
    }
  }

  createSlime(currentLocation){
    let tile;
    if (this.props.game.branch === 3) {
      tile = 'spookyTile';
    } else {
      tile = 'tile'
    };
    this.props.dispatch(roomModule.updateValue(currentLocation, 'H', roomConsts.sprites[tile]));
    let roomId = this.props.game.roomId;
    let gooTimer = setTimeout(() =>
    //prevent updates after changing room
    {if (this.props.game.roomId == roomId) {
      this.props.dispatch(roomModule.updateValue(currentLocation, '0', roomConsts.sprites[tile]));
    }},
      2500
    );
  }

  handleUpdateEnemyLocation(enemyId, originalLocation, newLocation) {
    let previousContentArr =  this.props.currentRoom[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'enemy';
    });
    this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
    let newContentArr = this.props.currentRoom[newLocation].content;
    newContentArr.push(["enemy", enemyId]);
    this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
    this.props.dispatch(enemiesModule.updateEnemyLocation(enemyId, newLocation));
    if(this.props.currentRoom[newLocation].value === 'P') {
      this.enemyFall(newLocation, enemyId);
    };
  }

  handleEnemyDamage(source, knockBackDirection, enemyId) {
    //if attack == dash
    if (source == 'dash') {
      if (this.props.enemies[enemyId].status == 'frozen') {
        this.killEnemy(enemyId);
      } else {
        this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
        this.enemyHealthCheck(enemyId);
        this.enemyKnockBack(knockBackDirection, enemyId);
      }
    //if attack == taser
    } else if (source == 'Taser'){
      this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'shocked'));
      this.props.dispatch(roomModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites['shock']));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        600
      );
      this.enemyHealthCheck(enemyId);
    //if attack == cryostat
    } else if (source == 'Cryostat'){
      this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'frozen'));
      this.props.dispatch(roomModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites['frozen']));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        20000
      );
      this.enemyHealthCheck(enemyId);
    }
  }

  enemyHealthCheck(enemyId) {
    if (this.props.enemies[enemyId].health <= 0) {
      this.killEnemy(enemyId);
    }
  }

  killEnemy(enemyId){
    let location = this.props.enemies[enemyId].location;
    this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'dead'));
    this.props.dispatch(soundsModule.changeEffect('dead'));
    this.props.dispatch(roomModule.setExplosion(location, true));
    let statusTimer = setTimeout(() =>
      {this.handleUpdateSprite(location, '', '');
      this.props.dispatch(roomModule.updateContent(location, []));
      this.props.dispatch(enemiesModule.nullEnemy(enemyId));
      this.props.dispatch(roomModule.setExplosion(location, false));},
      600
    );
  }

  enemyKnockBack(knockBackDirection, enemyId) {
    let direction = this.props.enemies[enemyId].direction;
    let originalLocation = this.props.enemies[enemyId].location;
    let canMove = this.attemptMove(knockBackDirection, originalLocation);
    if (canMove !== originalLocation && this.props.currentRoom[canMove].value !== 'D') {
      //update enemy and new square
      this.handleUpdateEnemyLocation(enemyId, originalLocation, canMove);
      this.handleUpdateSprite(originalLocation, '', '');
      if(this.props.enemies[enemyId].status === 'frozen') {
        this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites['frozen'], knockBackDirection + 'Enter');
        if(this.props.currentRoom[canMove].value === 'S'){
          let thisSwitch = this.props.currentRoom[canMove].content.find(function(content) {
            return content[0] == 'switch';
          });
          this.handleSwitch(thisSwitch[1]);
        };
      } else {
        this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction], knockBackDirection + 'Enter');
      };
    } else {
      //if enemy can't move back, just trigger animation in current square
      if(this.props.enemies[enemyId].status === 'frozen') {
        this.props.dispatch(roomModule.updateSprite(canMove, this.props.enemies[enemyId].sprites['frozen']));
      } else {
        this.props.dispatch(roomModule.updateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction]));
      }
    }
  }

  enemyFall(pitLocation, enemyId) {
    this.handleUpdateSprite(pitLocation, this.props.enemies[enemyId].sprites.move[this.props.enemies[enemyId].direction], 'fall');
    setTimeout(() =>
      this.killEnemy(enemyId),
      600
    );
  }

  glitchOut() {
    this.props.dispatch(soundsModule.changeEffect('scream'));
    this.props.dispatch(gameModule.changeGameState('building'));
    setTimeout(() => {
      this.props.dispatch(soundsModule.changeMusic(''));
      this.props.dispatch(soundsModule.changeEffect('glitch'));
      this.props.dispatch(gameModule.changeGameState('glitch'));
    }, 6500);
    setTimeout(() =>
      this.props.dispatch(gameModule.changeGameState('error')),
    9500);
  }


  render(){
    return (
      <div id="overWrap">
          <Music sounds={this.props.sounds} game={this.props.game}/>
          <SFX sounds={this.props.sounds}/>
          <Route exact path='/' render={()=><TitleContainer
            handleStart={() => this.startGame()}
            handleLoad={() => this.loadGame()}
            menu={this.props.menu}
            player={this.props.player}
            saves={this.props.saves}
            game={this.props.game}
            sounds={this.props.sounds}/>}/>
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            handleStart={() => this.startGame()}
            handleLoad={() => this.loadGame()}
            nullAll={() => this.nullAll()}
            exitSpecial={() => this.exitSpecial()}
            currentRoom={this.props.currentRoom}
            player={this.props.player}
            game={this.props.game}
            blocks={this.props.blocks}
            doors={this.props.doors}
            menu={this.props.menu}
            maps={this.props.maps}
            text={this.props.text}
            flags={this.props.flags}
            sounds={this.props.sounds}
            popUp={this.state.popUp}
            boss={this.props.boss}
            npcs={this.props.npcs}/>} />
      </div>
    );
  }
}

App.propTypes = {
  currentRoom: PropTypes.object,
  game: PropTypes.object,
  player: PropTypes.object,
  enemies: PropTypes.object,
  blocks: PropTypes.object,
  doors: PropTypes.object,
  menu: PropTypes.object,
  switches: PropTypes.object,
  platforms: PropTypes.object,
  maps: PropTypes.object,
  flags: PropTypes.object,
  text: PropTypes.object,
  sounds: PropTypes.object,
  saves: PropTypes.object,
  boss: PropTypes.object,
  npcs: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    currentRoom: state.currentRoom,
    game: state.game,
    player: state.player,
    enemies: state.enemies,
    blocks: state.blocks,
    doors: state.doors,
    menu: state.menu,
    switches: state.switches,
    platforms: state.platforms,
    maps: state.maps,
    flags: state.flags,
    text: state.text,
    sounds: state.sounds,
    saves: state.saves,
    boss: state.boss,
    npcs: state.npcs
  }
};

function mapDispatchToProps(dispatch) {
  return {
    blocksModule : bindActionCreators(blocksModule, dispatch),
    doorsModule : bindActionCreators(doorsModule, dispatch),
    enemiesModule : bindActionCreators(enemiesModule, dispatch),
    gameModule : bindActionCreators(gameModule, dispatch),
    roomModule : bindActionCreators(roomModule, dispatch),
    playerModule : bindActionCreators(playerModule, dispatch),
    menuModule : bindActionCreators(menuModule, dispatch),
    platformsModule : bindActionCreators(platformsModule, dispatch),
    switchesModule : bindActionCreators(switchesModule, dispatch),
    mapsModule: bindActionCreators(mapsModule, dispatch),
    textModule: bindActionCreators(textModule, dispatch),
    flagsModule: bindActionCreators(flagsModule, dispatch),
    soundsModule: bindActionCreators(soundsModule, dispatch),
    savesModule: bindActionCreators(savesModule, dispatch),
    bossModule: bindActionCreators(bossModule, dispatch),
    npcs: bindActionCreators(npcsModule, dispatch),
  }
};

export default withRouter(connect(mapStateToProps)(App));
