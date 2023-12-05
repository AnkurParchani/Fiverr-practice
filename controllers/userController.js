import User from "../models/userModel.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return req.status(400).send("Invalid request");

    if (req.userId !== String(user._id)) {
      return res.status(403).send("You can delete only your account");
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send("User deleted");
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};
