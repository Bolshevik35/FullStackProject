import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ColorDetector from './Components/ColorDetector/ColorDetector';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: 'a32327fec8b7465086072c1dd37d1980'
})

const particleVariables = {
	    "particles": {
	        "number": {
	            "value": 500,
	            "density": {
	                "enable": true,
	                "value_area": 1500
	            }
	        },
	        "line_linked": {
	            "enable": true,
	            "opacity": 0.08
	        },
	        "move": {
	            "direction": "right",
	            "speed": 0.1
	        },
	        "size": {
	            "value": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 1,
	                "opacity_min": 0.05
	            }
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onclick": {
	                "enable": true,
	                "mode": "push"
	            }
	        },
	        "modes": {
	            "push": {
	                "particles_nb": 1
	            }
	        }
	    },
	    "retina_detect": true
	};

class App extends Component {
	constructor(){
		super();
		this.state = {
			input: '',
			imageUrl: '',
			list: [],
			route: 'signin',
			isSignedIn: false
		};
	}

	inputChange = (event) => {
		this.setState({input: event.target.value});

	}

	outputColors = (data) => data.outputs[0].data.colors;

	displayColor = (list) => {
		// console.log(list);
		this.setState({list: list});
	}

	onSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.COLOR_MODEL, this.state.input)
			.then(response => this.displayColor(this.outputColors(response)))
		    .catch(err => console.log(err))
	}

	onRouteChange = (route) => {
		if (route === 'signin' || route === 'signup'){
			this.setState({isSignedIn: false});
		}
		else if (route === 'home'){
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	render(){
		const { imageUrl, route, list, isSignedIn } = this.state ;
		return (
		    <div className="App">
		    	<Particles className='particles'
		      	    params={particleVariables} />
		      	<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
		      	{route === 'home' ?
		      		<div>
			      		<Logo />
			      		<Rank />
			      		<ImageLinkForm 
			      			inputChange={this.inputChange} 
			      			onSubmit={this.onSubmit}/>
			      		<ColorDetector imageUrl={imageUrl} list= {list}/>
		    		</div>

		    		:
		    		(
		    			route === 'signin' ?
		      				<Signin onRouteChange={this.onRouteChange}/>
		   					:
		   					<Signup onRouteChange={this.onRouteChange}/>
		   			)

		    	}
		    </div>
	  );
	}
}

export default App;
