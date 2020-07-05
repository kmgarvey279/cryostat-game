import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as soundsModule from '../../redux/modules/sounds';
import './CharacterInfo.css';
import taserIcon from '../../assets/images/items/taserIcon.png';
import heart from '../../assets/images/items/health-icon.png';
import heartless from '../../assets/images/items/empty-health.png';
import cryoIcon from '../../assets/images/items/cryoIcon.png';
import collider from '../../assets/images/items/collider.png';
import clone from '../../assets/images/items/clone.png';
import keyCard1 from '../../assets/images/items/key.png';
import keyCard2 from '../../assets/images/items/key2.png';
import playerImage from '../../assets/images/player/playerImage.png';

class CharacterInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            row: 0,
            col: 0
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress, false);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress, false);
    }
    
    handleKeyPress = (event) => {
        if(event.keyCode === 38){
            event.preventDefault();
            this.changeRow(-1);
        } else if(event.keyCode === 40){
            event.preventDefault();
            this.changeRow(1);
        } else if(event.keyCode === 37){
            event.preventDefault();
            this.changeCol(-1);
        } else if(event.keyCode === 39){
            event.preventDefault();
            this.changeCol(1);
        }
    }

    changeRow(direction){
        let newRow = this.state.row + direction;
        this.props.dispatch(soundsModule.changeEffect('select'));
        if(newRow <= 2 && newRow >= 0){
            this.setState({
                row: newRow
              });
        }
    }

    changeCol(direction){
        let newCol = this.state.col + direction;
        this.props.dispatch(soundsModule.changeEffect('select'));
        if(newCol <= 2 && newCol >= 0){
            this.setState({
                col: newCol
              });
        };
    }

    getHeading(){
        let heading = 'No Item Selected';
        if(this.state.row === 0){
            if(this.state.col === 0 && this.props.player.weapons.includes('Taser')){
                heading = 'Taser'
            }else if(this.state.col === 1 && this.props.player.weapons.includes('Cryostat')){
                heading = 'Cryostat'
            }else if(this.state.col === 2 && this.props.player.weapons.includes('Flamethrower')){
                heading = 'Flamethrower'
            }; 
        } else if(this.state.row === 1){
            if(this.state.col === 0 && this.props.player.skills.includes('dash')){
                heading = 'Super Collider'
            }else if(this.state.col === 1 && this.props.player.skills.includes('clone')){
                heading = 'Clone'
            }else if(this.state.col === 2 && this.props.player.skills.includes('heal')){
                heading = 'Heal'
            }; 
        } else {
            if(this.state.col === 0 && this.props.player.items.includes('keyCard1')){
                heading = "Keycard 1"
            }else if(this.state.col === 1 && this.props.player.items.includes('keyCard2')){
                heading = 'Keycard 2'
            }else if(this.state.col === 2 && this.props.player.items.includes('keyCard3')){
                heading = 'Keycard 3'
            };
        };
        return heading;
    }

    getText(){
        let text;
        if(this.state.row === 0){
            if(this.state.col === 0 && this.props.player.weapons.includes('Taser')){
                text = 'A handheld weapon capable of discharging bolts of electricity. In addition to serving as a means of self-defense, it\'s also capable of activating electric switches.'
            }else if(this.state.col === 1 && this.props.player.weapons.includes('Cryostat')){
                text = 'Cryostat'
            }else if(this.state.col === 2 && this.props.player.weapons.includes('Flamethrower')){
                text = 'Flamethrower'
            } 
        } else if(this.state.row === 1){
            if(this.state.col === 0 && this.props.player.skills.includes('dash')){
                text = 'Super Collider'
            }else if(this.state.col === 1 && this.props.player.skills.includes('clone')){
                text = 'Clone'
            }else if(this.state.col === 2 && this.props.player.skills.includes('heal')){
                text = 'Heal'
            } 
        } else {
            if(this.state.col === 0 && this.props.player.items.includes('keyCard1')){
                text = "Keycard 1"
            }else if(this.state.col === 1 && this.props.player.items.includes('keyCard2')){
                text = 'Keycard 2'
            }else if(this.state.col === 2 && this.props.player.items.includes('keyCard3')){
                text = 'Keycard 3'
            } 
        };
        return text;
    }
    
    render(){
        return (
            <div className="character-info">
                <h3>Inventory</h3>
                <div className="player-image-box">
                    <img className="player-image" src={playerImage} width="80" height="80"/>
                </div>
                <ul className="character-list">
                    <li>{this.props.player.name}</li>
                    <li>
                        <ul className="health-list">
                            <li>{this.props.player.health >= 50 ? <img className="health-img" src={heart} width="16" height="16"/> : <img className="health-img" src={heartless} width="16" height="16"/>}</li> 
                            <li>{this.props.player.health >= 40 ? <img className="health-img" src={heart} width="16" height="16"/> : <img className="health-img" src={heartless} width="16" height="16"/>}</li>
                            <li>{this.props.player.health >= 30 ? <img className="health-img" src={heart} width="16" height="16"/> : <img className="health-img" src={heartless} width="16" height="16"/>}</li> 
                            <li>{this.props.player.health >= 20 ? <img className="health-img" src={heart} width="16" height="16"/> : <img className="health-img" src={heartless} width="16" height="16"/>}</li> 
                            <li>{this.props.player.health >= 10 ? <img className="health-img" src={heart} width="16" height="16"/> : <img className="health-img" src={heartless} width="16" height="16"/>}</li> 
                            <li>HP: </li>
                        </ul>
                    </li>
                    <li><span className="bar-label">MP:</span><div className="bar-wrap">
                            <div className="mp-bar" style={{width: this.props.player.magic + '%'}}>
                            </div>
                            <div id="mp-bar-background"></div>
                        </div>
                    </li>
                    <li>Entanglement: {this.props.player.entanglement}%</li>
                    <li>
                        <div className="stuff-heading"><p>Weapons</p></div>
                        <div className="stuff">
                            <ul>
                                <li>
                                    <div className={this.state.row === 0 && this.state.col === 0 ? "cursor" : ''}></div>
                                    {this.props.player.weapons.includes('Taser') ? <div className="item-slot"><img className="item-slot-weapon" src={taserIcon} width="40" height="40"/></div> : <div className="item-slot"></div>}
                                </li>
                                <li>
                                    <div className={this.state.row === 0 && this.state.col === 1 ? "cursor" : ''}></div>
                                    {this.props.player.weapons.includes('Cryostat') ? <div className="item-slot"><img className="item-slot-weapon" src={cryoIcon} width="40" height="40"/></div> : <div className="item-slot"></div>}
                                </li>
                                <li>
                                    <div className={this.state.row === 0 && this.state.col === 2 ? "cursor" : ''}></div>
                                    {this.props.player.weapons.includes('Flamethrower') ? <div className="item-slot"><img className="item-slot-weapon" src={cryoIcon} width="40" height="40"/></div> : <div className="item-slot"></div>}
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="stuff-heading"><p>Skills</p></div>
                        <div className="stuff">
                            <ul>
                                <li>
                                    <div className={this.state.row === 1 && this.state.col === 0 ? "cursor" : ''}></div>
                                    {this.props.player.skills.includes('dash') ? <div className="item-slot"><img className="item-slot-skill" src={collider} width="40" height="40"/></div> : <div className="item-slot"></div>}
                                </li>
                                <li>
                                    <div className={this.state.row === 1 && this.state.col === 1 ? "cursor" : ''}></div>
                                    {this.props.player.skills.includes('clone') ? <div className="item-slot"><img className="item-slot-skill" src={clone} width="40" height="40"/></div> : <div className="item-slot"></div>}
                                </li>
                                <li>
                                    <div className={this.state.row === 1 && this.state.col === 2 ? "cursor" : ''}></div>
                                    {this.props.player.skills.includes('heal') ? <div className="item-slot"><img className="item-slot-skill" src={collider} width="40" height="40"/></div> : <div className="item-slot"></div>}
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="stuff-heading"><p>Key Items</p></div>
                        <div className="stuff">
                            <ul>
                                <li>
                                    <div className={this.state.row === 2 && this.state.col === 0 ? "cursor" : ''}></div>
                                    {this.props.player.items.includes('keyCard1') ? <div className="item-slot"><img id="key-item" src={keyCard1} width="50" height="50"/></div> : <div className="item-slot"></div>}
                                </li>
                                <li>
                                    <div className={this.state.row === 2 && this.state.col === 1 ? "cursor" : ''}></div>
                                    {this.props.player.items.includes('keyCard2') ? <div className="item-slot"><img id="key-item" src={keyCard2} width="50" height="50"/></div> : <div className="item-slot"></div>}
                                </li>
                                <li>
                                    <div className={this.state.row === 2 && this.state.col === 2 ? "cursor" : ''}></div>
                                    {this.props.player.items.includes('keyCard3') ? <div className="item-slot"><img id="key-item" src={keyCard2} width="50" height="50"/></div> : <div className="item-slot"></div>}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div className="item-info">
                    <div className="stuff-info-heading"><p>{this.getHeading()}</p></div>
                    <div className="item-text">{this.getText()}</div>
                </div>
            </div>
        )
    }
}

CharacterInfo.propTypes = {
  player: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
      soundsModule : bindActionCreators(soundsModule, dispatch)
    }
  };

export default connect(mapDispatchToProps)(CharacterInfo);