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


document.title = "Color Detector";

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
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		};
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	// componentDidMount(){
	// 	fetch('http://localhost:3000/')
	// 		.then(response => response.json())
	// 		.then(console.log)
	// }



	inputChange = (event) => {
		this.setState({input: event.target.value});

	}

	outputColors = (data) => {

		return data.outputs[0].data.colors;
	}

	displayColor = (list) => {
		// console.log(list);
		this.setState({list: list});
	}

	onSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(Clarifai.COLOR_MODEL, this.state.input)
			.then(response => { 
				if (response) {
					fetch('http://localhost:3000/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user,{entries: count}))
						})
					this.displayColor(this.outputColors(response))
		    	}
		    })
		    .catch(err => console.log(err))
	}

	onKeyDetect = (event) =>{
		if(event.key === 'Enter'){
			this.onSubmit();
		}
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
			      		<Rank name={this.state.user.name} entries={this.state.user.entries} />
			      		<ImageLinkForm 
			      			inputChange={this.inputChange} 
			      			onSubmit={this.onSubmit}
			      			onKeyDetect={this.onKeyDetect}/>
			      		<ColorDetector imageUrl={imageUrl} list= {list}/>
		    		</div>
		    		:
		    		(route === 'signin' ?
		      			<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		   				:
		   				<Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		   			)

		    	}
		    </div>
	  );
	}
}

export default App;
