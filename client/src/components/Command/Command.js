import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
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
		switch(event.target.name){
			case "category":
				this.setState({
					category: event.target.value.toLowerCase()
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
			default:
				console.log("error")
		}

	}

	handleSubmit(event) {
		axios.post('/api/new_command', {
			category: this.state.category,
			command: this.state.command,
			summary: this.state.summary
		})
		.then(function (response) {
			this.props.history.push("/")
		}.bind(this))
		.catch(function (error) {
			console.log(error);
		});

		event.preventDefault();
	}

	render() {
		return (
			<div>
				<div className="anchor-command"><Link to={"/"}>back</Link></div>
				<form onSubmit={this.handleSubmit}>	
					<input type="text" value={this.state.value} name="category" onChange={this.handleChange} />
					<input type="text" value={this.state.value} name="command" onChange={this.handleChange} />
					<input type="text" value={this.state.value} name="summary" onChange={this.handleChange} />
					<input type="submit" value="Submit" />
				</form>
			</div>

		);
	}
}

export default withRouter(Command);
