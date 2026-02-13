const ResearchPaper = require('../models/ResearchPaper');

exports.getAllResearchPapers = async (req, res) => {
  try {
    const researchPapers = await ResearchPaper.findAll({ order: [['title', 'ASC']] });
    res.json(researchPapers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};