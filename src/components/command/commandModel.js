const mongoose = require("mongoose");
const { Schema } = mongoose;

const commandsSchema = new Schema({
	category: String,
	command: String,
	summary:  String
});

mongoose.model("command", commandsSchema);