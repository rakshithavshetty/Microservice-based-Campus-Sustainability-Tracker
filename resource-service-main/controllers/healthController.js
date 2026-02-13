exports.getHealth = (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Resource Service is running',
    timestamp: new Date().toISOString(),
    service: 'resource-service',
    version: '1.0.0'
  });
};