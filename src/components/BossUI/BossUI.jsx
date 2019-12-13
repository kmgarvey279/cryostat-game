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
    let name;
    if(props.boss.name){
        name = <div>
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
    };
    if (props.boss.status === 'normal' || props.boss.status === 'hurt'){
        let health = props.boss.health;
        let barColor;
        if(props.boss.health > 400){
            barColor = 'highHealth';
        } else if (props.boss.health > 200) {
            barColor = 'midHealth';
        } else {
            barColor = 'lowHealth';
        };
            return (
                <div className="boss-ui-wrap">
                    <div className="boss-health-container">
                        <div className="bar-background"></div>
                        <div className="boss-health-bar" id={barColor} style={{width: health}}>
                        </div>
                    </div>
                    {name}
                </div>
            );
    } else {
        return null
    };
}

BossUI.propTypes = {
    boss: PropTypes.object
};

export default BossUI;