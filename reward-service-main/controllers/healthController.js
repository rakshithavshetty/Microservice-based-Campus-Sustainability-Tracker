exports.getHealth = (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Reward Service is running',
    timestamp: new Date().toISOString(),
    service: 'reward-service',
    version: '1.0.0'
  });
};