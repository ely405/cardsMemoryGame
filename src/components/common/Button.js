import React from 'react';

const Button = props => (
	<button onClick={() => props.handlerClick()} className={props.handlerClass} >
		{(props.classIcon) ? <i className={props.classIcon}/> : ''}
		{(props.classText) ? <small className={props.classText}>{props.text}</small> : props.text }
	</button>
);

export default Button;