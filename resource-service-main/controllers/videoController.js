const Video = require('../models/Video');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({ order: [['title', 'ASC']] });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};