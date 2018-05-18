import React from 'react';

const Button = (props) => {
	console.log('button', props);
	return (
		<button onClick={() => props.handlerClick()} className={props.handlerClass}>{props.text}</button>
	);
};

export default Button;