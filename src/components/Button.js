import React from 'react';

const Button = props => (
	<button onClick={() => props.handlerClick()} className={props.handlerClass} >{props.text}</button>
);

export default Button;