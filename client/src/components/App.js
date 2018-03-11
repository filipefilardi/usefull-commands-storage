import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Command from "./Command/Command";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/cmd" component={Command} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
