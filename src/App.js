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
			imageUrl: ''
		};
	}

	inputChange = (event) => {
		this.setState({input: event.target.value});

	}

	onSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
		    function(response){
		      // do something with response
		      console.log(response.outputs[0].data.colors);
		    },
		    function(err) {
		      // there was an error
    }
  );
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
	      <ColorDetector imageUrl={this.state.imageUrl}/>
	    </div>
	  );
	}
}

export default App;
