import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./dashboard.css";

class Dashboard extends Component {
	constructor() {
		super();

		this.state = {
			commands: [],
			filter: "all",
			categories: []
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		axios
			.get("/api/all_commands")
			.then(res => {
				let categories = [];

				for (var i = 0; i < res.data.length; i++) {
					if (categories.indexOf(res.data[i].category) < 0)
						categories.push(res.data[i].category);
				}

				this.setState({
					commands: res.data,
					categories: categories.sort()
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	onChange(event) {
		this.setState({
			filter: event.target.value
		});
	}

	renderSelect() {
		return (
			<select autoFocus className="select" onChange = {this.onChange}>
				<option>all</option>
				{this.state.categories.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	}

	renderCommands() {
		return this.state.commands.map(
			row =>
				this.state.filter === row.category ||
				this.state.filter === "all" ? (
					<div className="commands-item" key={row.command}>
						<div className="command">{row.command}</div>
						<div className="summary">{row.summary}</div>
					</div>
				) : (
					""
				)
		);
	}

	render() {
		return (
			<div className="commands-container">
				{this.renderSelect()}
				<div className="anchor"><Link to={"/cmd"}>create new command</Link></div>
				{this.renderCommands()}
			</div>
		);
	}
}

export default Dashboard;
