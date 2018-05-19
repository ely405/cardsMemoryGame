import React from 'react';
import { connect } from 'react-redux';

const ErrorMessage = props => (
	<section className={props.handlerClass}>
		<small>{props.message}</small>
	</section>
);

export default ErrorMessage;