import React, { Component } from "react";
import axios from "axios";

import './dashboard.css'

class Dashboard extends Component {
	constructor(){
		super();

		this.state = {
			commands: []
		};
	}

	componentDidMount() {
		axios.get('/api/all_commands')
		.then(res => {
			this.setState({
				commands: res.data
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	renderCommands(){
		return (
			this.state.commands.map(row => (
				<div className="commands-item" key={row.command}>
					<div className="command">{row.command}</div>
					<div className="summary">{row.summary}</div>
				</div>
			))
		)
	}

	render() {
		return (
			<div className="commands-container">
				{this.renderCommands()}
			</div>
		);
	}
}

export default Dashboard;