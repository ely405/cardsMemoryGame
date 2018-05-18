import React from 'react';
import { connect } from 'react-redux';

import pokebola from '../../../assets/img/pokebola.png';
import pokemon from '../../../assets/img/pokemon.png';

const ImageToBackOfCard = props => (<img src={props.backOfCard === 1 ? pokebola : pokemon } className='img-fluid'/>);

const mapStateToProps = state => ({
	backOfCard: state.gameStatus.backOfCard,
});

export default connect(mapStateToProps)(ImageToBackOfCard);