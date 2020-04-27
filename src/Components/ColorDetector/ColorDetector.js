import React from 'react'; 

const ColorDetector = ({imageUrl}) => {
	return (
		<div className='center ma2'>
			<div className='ma2'>
				<img alt='' src={imageUrl}  className='w-100'/>
			</div>
			<div className='dib br3 pa2 ma2 shadow-4'>
				<p>Color Table </p>
			</div>
		</div>
	);
}

export default ColorDetector;