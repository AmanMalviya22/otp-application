const User = require("../model/User");
const otpGenerator = require("otp-generator");
const Otp = require("../model/otp");

const registerUser = async (req, res) => {
	const number = parseInt(req.body.number);
	console.log(number);
	console.log(typeof number);
	try {
		if (number) {
			const user = await User.findOne({
				number: req.body.number,
			});
			if (user) {
				res.status(400).send("User Already Exists");
			} else {
				const otp = otpGenerator.generate(6, {
					upperCaseAlphabets: false,
					specialChars: false,
					lowerCaseAlphabets: false,
					alphabates: false,
				});
				console.log(otp);
				//const number = req.body.number;
				const OTP = new Otp({ number: number, otp: otp });
				const result = await OTP.save();
				return res.status(200).send("Otp sent successfully");
			}
		} else {
			res.json({ message: "Please Enter a valid number" });
		}
	} catch (err) {
		console.log(err);
	}
};
module.exports = registerUser;
