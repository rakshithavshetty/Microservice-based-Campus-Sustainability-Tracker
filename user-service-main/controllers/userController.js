const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Default Route - Health check
exports.userHealthCheck = (req, res) => {
  res.json({ message: '✅ User Service is up and running!' });
};

// ✅ Register New User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User Registered Successfully',
      username: newUser.username,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User Not Found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      username: user.username,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get User by Username
exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: 'User Not Found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { username: req.params.username }
    });

    if (!updated) return res.status(404).json({ message: 'User Not Found' });

    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ['password'] }
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { username: req.params.username }
    });

    if (!deleted) return res.status(404).json({ message: 'User Not Found' });
    res.json({ message: 'User Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
