import React from 'react';
import { connect } from 'react-redux';

import style from './ErrorMessage.scss';

const ErrorMessage = (props) => {
	console.log('props error', props);
	return props.pokeData.message ? <section className={`${style.errorContainer} text-center badge-danger position-absolute l-0 col-12`}>
		<small>{props.pokeData.message}</small>
	</section> : '';
};

const mapStateToProps = state => ({
	pokeData: state.pokeData,
});
export default connect(mapStateToProps)(ErrorMessage);