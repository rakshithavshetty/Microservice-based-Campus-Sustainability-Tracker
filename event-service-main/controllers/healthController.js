exports.healthCheck = (req, res) => {
  res.json({ message: '✅ Event Service is up and running!' });
};