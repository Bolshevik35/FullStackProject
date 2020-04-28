import React from 'react';
import Color from './Color';

const ColorDetector = ({imageUrl, list}) => {
	return (
		<div className='center ma2'>
			<div className='ma2'>
				<img alt='' src={imageUrl}  className='w-100'/>
			</div>
			<div >
				{list.map((element, index) =>
					<Color name={list[index].w3c.name} 
						hex={list[index].w3c.hex} 
						percentage={list[index].value} />)
				}
			</div>
		</div>
	);
}

export default ColorDetector;