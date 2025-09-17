const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ msg: 'User exists' });
    const user = new User({ name, email, password });
    await user.save();
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};
