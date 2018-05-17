import React from 'react';
import { connect } from 'react-redux';

import pokebola from '../../../assets/img/pokebola.jpg';
import pokebolaBW from '../../../assets/img/pokebola_bw.jpg';

const ImageToBackOfCard = props => (<img src={props.backOfCard === 1 ? pokebola : pokebolaBW } className='img-fluid'/>);

const mapStateToProps = state => ({
	backOfCard: state.gameStatus.backOfCard,
});

export default connect(mapStateToProps)(ImageToBackOfCard);