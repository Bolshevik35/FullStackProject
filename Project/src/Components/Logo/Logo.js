import React from 'react'; 
import './Logo.css';
import ai from './AI.png';

const Logo = () => {
	return(
	<div className='ma4 mt0 secret br2 shadow-4' style={{height: 100, width: 100 }}>
		<img className="pa3" style={{paddinTop: '5px'}} alt='' src={ai} />  				
	</div>
)}

export default Logo;