import React from 'react';
import { connect } from 'react-redux';

const MessageInfo = props => (
	<section className={props.handlerClass}>
		<small>{props.message}</small>
	</section>
);

export default MessageInfo;