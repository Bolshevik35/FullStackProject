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
	            "value": 150
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
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
		console.log(list);
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
