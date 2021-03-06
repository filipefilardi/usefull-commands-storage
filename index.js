const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/config");

require("./src/components/command/commandModel");

mongoose.connect(config.mongoURI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before expire
		keys: [config.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./src/components/user/userAPI")(app);
require("./src/components/command/commandAPI")(app);

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT);
