import React from 'react'; 
import './Logo.css';
import sfuLogo from './sfuLogo.png';

const Logo = () => {
	return(
	<div className='tl'>
		<div className='dib ma4 mt0 secret br2 shadow-4'>
			<img className="pa3" style={{height: 87, width: 204 }} alt='' src={sfuLogo} />  				
		</div>
	</div>
)}

export default Logo;