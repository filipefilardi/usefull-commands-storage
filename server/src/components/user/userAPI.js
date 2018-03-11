const passport = require("passport");

module.exports = app => {
	app.post(
		"/api/register",
		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/register"
		})
	);

	app.post(
		"/api/login",
		passport.authenticate("local-login", { failureRedirect: "/register" }),
		(req, res) => {
			res.send(req.user);
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});


};
