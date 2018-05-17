import React from 'react';
import { connect } from 'react-redux';

const ErrorMessage = (props) => {
	console.log('props', props);
	return props.pokeData.message ? <section className='badge-danger position-absolute l-0 col-12'>
		<p>{props.pokeData.message}</p>
	</section> : '';
};

const mapStateToProps = state => ({
	pokeData: state.pokeData,
});
export default connect(mapStateToProps)(ErrorMessage);