import React from 'react';
import PropTypes from 'prop-types';
import './BossUI.css';
import bossBar from '../../assets/images/items/boss-bar.png';

function BossUI(props){
    let titles = props.boss.titles;
    let barColor;
    if(props.health <= 30) {
      barColor = 'low';
    } else if (props.health <= 50) {
      barColor = 'mid';
    } else {
      barColor = 'high';
    };
    if (props.boss.status === 'alive'){
        if(props.boss.name){
            return (
                <div className="boss-ui-wrap">
                    <div id="boss-name">{props.boss.name}</div>
                    <div id="boss-titles">
                        <ul>
                            {titles.map(function(title) {
                                return (
                                    <li>{title}<br /></li>
                                )
                            })};
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="boss-ui-wrap">
                    <div className="boss-health-bar" id={barColor}>
                        <img id="boss-icon" src={bossBar} width="605" height="60"/>
                        <span className={props.boss.health >= 10 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-10"></span>
                        <span className={props.boss.health >= 20 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-20"></span>
                        <span className={props.boss.health >= 30 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-30"></span>
                        <span className={props.boss.health >= 40 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-40"></span>
                        <span className={props.boss.health >= 50 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-50"></span>
                        <span className={props.boss.health >= 60 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-60"></span>
                        <span className={props.boss.health >= 70 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-70"></span>
                        <span className={props.boss.health >= 80 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-80"></span>
                        <span className={props.boss.health >= 90 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-90"></span>
                        <span className={props.boss.health >= 100 ? 'boss-hp-full' : 'boss-hp-empty'} id="boss-hp-100"></span>
                    </div>
                </div>
            );
        }
    } else {
        return null
    };
}

BossUI.propTypes = {
    boss: PropTypes.object
};

export default BossUI;