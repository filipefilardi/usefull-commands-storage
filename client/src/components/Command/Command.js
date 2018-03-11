import React, { Component } from "react";
import axios from "axios";

import "./command.css";

class Command extends Component {
	constructor() {
		super();

		this.state = {
			category: '',
			command: '',
			summary: ''
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		switch(event.target.placeholder){
			case "category":
				this.setState({
					category: event.target.value
				});
				break;
			case "command" :
				this.setState({
					command: event.target.value
				});
				break;
			case "summary":
				this.setState({
					summary: event.target.value
				});
				break;
		}

	}

	handleSubmit(event) {
		axios.post('/api/new_command', {
			category: this.state.category,
			command: this.state.command,
			summary: this.state.summary
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>	
				<input type="text" value={this.state.value} placeholder="category" onChange={this.handleChange} />
				<input type="text" value={this.state.value} placeholder="command" onChange={this.handleChange} />
				<input type="text" value={this.state.value} placeholder="summary" onChange={this.handleChange} />
				<input type="submit" value="Submit" />
			</form>

		);
	}
}

export default Command;
