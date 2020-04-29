import React from 'react';
import './Color.css'; 


function Color(props){
	let temp = props.percentage * 100;
	temp = temp.toFixed(2);
	let colorHex = props.hex;
	if(colorHex === '#000000'){
		return (
			<div className='tc br3 ma2 pa2 shadow-4 bg-near-white bw2 color-list' style={{'background-color': props.hex , 'color': '#ffffff'}}>
				<div className='items'>{props.name}</div>
				<div className='items'>{props.hex}</div>
				<div className='items'>{temp}%</div>
			</div> 
		);
	}
	else{
		return (
			<div className='tc br3 ma2 pa2 shadow-4 bg-near-white bw2 color-list' style={{'background-color': colorHex}}>
				<div className='items'>{props.name}</div>
				<div className='items'>{props.hex}</div>
				<div className='items'>{temp}%</div>
			</div> 
		);
	}
}

export default Color;
