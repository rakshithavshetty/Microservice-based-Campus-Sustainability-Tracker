const Reward = require('../models/Reward');

exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.findAll({ order: [['date', 'ASC']] });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};