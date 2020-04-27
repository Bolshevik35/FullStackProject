import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({inputChange, onSubmit}) => {
	return (
		<div>
			<p className='f3'>
			{'Clarifai will detect colors in your pictures. Give it a try'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-3'>
					<input className='f4 pa2 w-70 center' type='text' onChange={inputChange} />
					<button className='grow w-30 f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
				</div>
			</div>	
		</div>
	);

}

export default ImageLinkForm; 