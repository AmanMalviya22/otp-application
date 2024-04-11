const cors = require("cors");
const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const registerUser = require("./controllers/registerUser");
require("dotenv").config();
const otpVerification = require("./controllers/otpVerification");

const app = express();
mongoose
	.connect(process.env.URI)
	.then(() => console.log("Database Connected"))
	.catch((error) => console.log(error));

app.use(express.json({ limit: "5mb" }));
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.listen(process.env.PORT, () => console.log(`server running on port 3000,PORT`));
app.use("/auth", registerUser);
app.use("/login", otpVerification);
