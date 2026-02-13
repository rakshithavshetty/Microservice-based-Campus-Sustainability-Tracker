const express = require('express');
const router = express.Router();
const researchPaperController = require('../controllers/researchPaperController');

router.get('/', researchPaperController.getAllResearchPapers);

module.exports = router;