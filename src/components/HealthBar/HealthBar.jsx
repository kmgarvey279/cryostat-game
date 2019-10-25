import React from 'react';
import PropTypes from 'prop-types';
import './HealthBar.css';
import playerParticleEast from '../../assets/images/player/playerParticleEast.gif';

function HealthBar(props) {
  let barType;
  if (props.type === 'health') {
    barType = 'health-bar';
  } else {
    barType = 'entanglement-bar';
  };
  let particleEffect = null;
  if(props.type == 'entanglement') {
    particleEffect = <img src={playerParticleEast} width="160px" height="80px"/>;
  }
  return (
    <div className={barType}>
        <span id="particle-effect">{particleEffect}</span>
        <span className={props.magic >= 20 ? 'hp-full' : 'hp-empty'} id="hp-10"></span>
        <span className={props.magic >= 20 ? 'hp-full' : 'hp-empty'} id="hp-20"></span>
        <span className={props.magic >= 30 ? 'hp-full' : 'hp-empty'} id="hp-30"></span>
        <span className={props.magic >= 40 ? 'hp-full' : 'hp-empty'} id="hp-40"></span>
        <span className={props.magic >= 50 ? 'hp-full' : 'hp-empty'} id="hp-50"></span>
        <span className={props.magic >= 60 ? 'hp-full' : 'hp-empty'} id="hp-60"></span>
        <span className={props.magic >= 70 ? 'hp-full' : 'hp-empty'} id="hp-70"></span>
        <span className={props.magic >= 80 ? 'hp-full' : 'hp-empty'} id="hp-80"></span>
        <span className={props.magic >= 90 ? 'hp-full' : 'hp-empty'} id="hp-90"></span>
        <span className={props.magic >= 100 ? 'hp-full' : 'hp-empty'} id="hp-100"></span>
    </div>
  );
}

HealthBar.propTypes = {
  health: PropTypes.number.isRequired,
};

export default HealthBar;