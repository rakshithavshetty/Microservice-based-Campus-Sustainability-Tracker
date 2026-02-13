// Health check controller
exports.healthCheck = (req, res) => {
  res.json({ message: '✅ Report Service is up and running!' });
};