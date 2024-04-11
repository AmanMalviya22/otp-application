const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		number: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },

	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	}
);
module.exports = mongoose.model("User", userSchema);
