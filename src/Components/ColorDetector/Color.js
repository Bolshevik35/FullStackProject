import React from 'react';
import './Color.css'; 


function Color(props){
	let temp = props.percentage * 100;
	temp = temp.toFixed(2);
	return (
		<div className='tc br3 ma2 pa1 shadow-4 bg-near-white bw2 color-list' style={{'color': props.hex}}>
			<p>{props.name} {props.hex} {temp}%</p>
		</div> 
	);
}

export default Color;