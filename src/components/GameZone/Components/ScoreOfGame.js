import React from 'react';
import { connect } from 'react-redux';

import { addScoreAction } from '../../../ducks/GameZone/scoreOfGameReducer';

const ScoreOfGame = props => (
	<div className='col-11 col-md-4'>PUNTAJE {props.score.quantity}
		{(props.score.message) ? <p>{props.score.message}</p> : ''}
	</div>
);

const mapStateToProps = state => ({
	score: state.score,
});

export default connect(mapStateToProps)(ScoreOfGame);