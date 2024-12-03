const User = require('../models/User');

exports.addUser = async (req, res, next) => {
  try {
    const { username, email, phone } = req.body;
    const newUser = await User.create({ username, email, phone });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add user." });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve users." });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, email, phone } = req.body;

  try {
    const [updatedCount] = await User.update(
      { username, email, phone },
      { where: { id: userId } }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const updatedUser = await User.findByPk(userId);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user." });
  }
};