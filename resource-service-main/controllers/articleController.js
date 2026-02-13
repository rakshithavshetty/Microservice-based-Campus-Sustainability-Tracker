const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ order: [['title', 'ASC']] });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};