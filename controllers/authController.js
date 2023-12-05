import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./../models/userModel.js";

export const register = async (req, res) => {
  try {
    // Hashing the provided password
    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User created");
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

export const login = async (req, res) => {
  try {
    // Getting the user according to the username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("user not found");

    // Checking the password
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(401).send("Invalid password");

    // Generating the token
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET_KEY
    );

    const { password, ...otherInfo } = user._doc;

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(otherInfo);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};
export const logout = async () => {};
