// const { JsonWebTokenError } = require("jsonwebtoken");
const newAuth = require("../model/authmodel");
const bcrypt = require("bcrypt");

//login and signup Controller
const NewSignUp = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  var hash = await bcrypt.hash(password, salt);
  try {
    const auth = await newAuth.create({ email, password: hash });
    return res.status(200).json({ auth });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const Login = async (req, res) => {
  //   const { email, password } = req.body;
  try {
    let auth = await newAuth.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      auth.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }
    res.send({ status: 200, message: "success" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  NewSignUp,
  Login,
};
