const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/config");

mongoose.connect(config.mongoURI);

const app = express();
const port = 5000;

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before expire
		keys: [config.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./components/user/userAPI")(app);

app.listen(port);
