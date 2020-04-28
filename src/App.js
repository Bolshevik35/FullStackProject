import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ColorDetector from './Components/ColorDetector/ColorDetector';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: 'a32327fec8b7465086072c1dd37d1980'
})

const particleVariables = {
	    "particles": {
	        "number": {
	            "value": 1000,
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
			list: []
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

	render(){	
	  return (
	    <div className="App">
	      <Particles className='particles'
	      	    params={particleVariables} />
	      <Navigation />
	      <Logo />
	      <Rank />
	      <ImageLinkForm 
	      	inputChange={this.inputChange} 
	      	onSubmit={this.onSubmit}/>
	      <ColorDetector imageUrl={this.state.imageUrl} list= {this.state.list}/>
	    </div>
	  );
	}
}

export default App;
