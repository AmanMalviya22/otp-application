const otp = require("../model/otp");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const otpVerification = async (req, res) => {
	try {
		const number = Number(req.body.number);
		const otpHolder = await otp.find({
			number: number,
		});
		console.log(otpHolder);
		const latestOtp = otpHolder[otpHolder.length - 1].otp;
		if (req.body.otp === latestOtp) {
			const user = new User({ number });
			const token = jwt.sign({ _id: user._id }, process.env.JWT, {
				expiresIn: "7d",
			});
			const result = await user.save();
			const deleteMany = await otp.deleteMany({
				number: req.body.number,
			});
			return res.status(200).send({
				message: "login successfull",
				token: token,
				data: user,
				ok: true,
			});
		} else {
			res.json("wrong otp");
		}
	} catch (err) {
		console.log(err);
	}
};
module.exports = otpVerification;
