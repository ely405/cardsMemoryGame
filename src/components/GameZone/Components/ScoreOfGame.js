import React from 'react';
import { connect } from 'react-redux';

import { addScoreAction } from '../../../ducks/GameZone/scoreOfGameReducer';

const ScoreOfGame = (props) => {
	console.log('props de score', props);
	return (
		<div>PUNTAJE {props.score.quantity}
			{(props.score.message) ? <p>{props.score.message}</p> : ''}
		</div>
	);
};

const mapStateToProps = state => ({
	score: state.score,
});

// const mapDispatchToProps = dispatch => ({
// 	addScore() {
// 		dispatch(addScoreAction());
// 	},
// });

export default connect(mapStateToProps)(ScoreOfGame);