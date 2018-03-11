
const mongoose = require("mongoose");
const Commands = mongoose.model("command");

module.exports = app => {
	app.post("/api/new_command", (req, res) => {
		const {
			category,
			command,
			summary
		} = req.body;

		var commands = {
			category,
			command,
			summary
		};

		Commands.findOneAndUpdate(
			{ command: command },
			commands,
			{ upsert: true },
			err => {
				if (err) {
					res.send(err);
				}
				res.send(commands);
			}
		);
	});

	app.get("/api/all_commands", async (req, res) => {
		const commands = await Commands.find();

		res.send(commands);
	});

	app.get("/api/commands/:category", async (req, res) => {
		const commands = await Commands.find({ category: req.params.category});

		res.send(commands);
	});
};
